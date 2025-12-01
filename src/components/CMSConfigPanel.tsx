import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CMSConfig, CMSType } from '@/types/blog';

interface CMSConfigPanelProps {
  config: CMSConfig;
  onConfigChange: (config: CMSConfig) => void;
}

export function CMSConfigPanel({ config, onConfigChange }: CMSConfigPanelProps) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    localStorage.setItem('cms-config', JSON.stringify(localConfig));
    onConfigChange(localConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CMS Integration Settings</CardTitle>
        <CardDescription>
          Connect your WordPress or Joomla site to display blog posts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cms-type">CMS Type</Label>
          <Select
            value={localConfig.type}
            onValueChange={(value: CMSType) =>
              setLocalConfig({ ...localConfig, type: value })
            }
          >
            <SelectTrigger id="cms-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wordpress">WordPress</SelectItem>
              <SelectItem value="joomla">Joomla</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="api-url">API URL</Label>
          <Input
            id="api-url"
            type="url"
            placeholder={
              localConfig.type === 'wordpress'
                ? 'https://your-site.com'
                : 'https://your-joomla-site.com'
            }
            value={localConfig.apiUrl}
            onChange={(e) =>
              setLocalConfig({ ...localConfig, apiUrl: e.target.value })
            }
          />
          <p className="text-sm text-muted-foreground">
            {localConfig.type === 'wordpress'
              ? 'Enter your WordPress site URL (without /wp-json)'
              : 'Enter your Joomla site URL (without /api)'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enabled"
            checked={localConfig.enabled}
            onChange={(e) =>
              setLocalConfig({ ...localConfig, enabled: e.target.checked })
            }
            className="rounded border-input"
          />
          <Label htmlFor="enabled">Enable CMS Integration</Label>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  );
}
