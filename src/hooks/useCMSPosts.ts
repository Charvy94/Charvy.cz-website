import { useState, useEffect } from 'react';
import { BlogPost, CMSConfig } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

export function useCMSPosts(config: CMSConfig) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!config.enabled || !config.apiUrl) {
      setPosts([]);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = '';
        if (config.type === 'wordpress') {
          url = `${config.apiUrl}/wp-json/wp/v2/posts?_embed`;
        } else if (config.type === 'joomla') {
          url = `${config.apiUrl}/api/index.php/v1/content/articles`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch posts');

        const data = await response.json();
        const transformedPosts = transformPosts(data, config.type);
        setPosts(transformedPosts);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        toast({
          title: 'Error fetching posts',
          description: message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [config, toast]);

  return { posts, loading, error };
}

function transformPosts(data: any[], type: 'wordpress' | 'joomla'): BlogPost[] {
  if (type === 'wordpress') {
    return data.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      date: post.date,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map((tag: any) => tag.name) || [],
      slug: post.slug,
    }));
  } else {
    // Joomla transformation
    return data.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.fulltext || post.introtext,
      excerpt: post.introtext,
      date: post.created,
      author: post.created_by_alias || 'Unknown',
      featuredImage: post.images?.image_fulltext,
      categories: post.catid ? [post.category_title] : [],
      tags: post.tags?.tags?.map((tag: any) => tag.title) || [],
      slug: post.alias,
    }));
  }
}
