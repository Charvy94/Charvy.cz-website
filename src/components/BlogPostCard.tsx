import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
      {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-48 object-cover rounded-t-lg"
          />
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription>
          {formatDate(post.date)} • {post.author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="text-muted-foreground line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        {(post.categories.length > 0 || post.tags.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
