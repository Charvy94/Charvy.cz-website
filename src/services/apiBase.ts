const envApiUrl = import.meta.env.VITE_API_URL?.trim();
const runtimeOrigin = typeof window !== 'undefined' ? window.location?.origin : '';

const fallbackApiUrl = runtimeOrigin ? `${runtimeOrigin}/api` : '/api';

const normalizeHost = (host: string) => host.replace(/^www\./i, '');

const resolveApiBaseUrl = () => {
  if (!envApiUrl) {
    return fallbackApiUrl;
  }

  if (!runtimeOrigin) {
    return envApiUrl;
  }

  try {
    const envUrl = new URL(envApiUrl);
    const runtimeUrl = new URL(runtimeOrigin);
    const envHost = normalizeHost(envUrl.host);
    const runtimeHost = normalizeHost(runtimeUrl.host);

    if (envHost === runtimeHost) {
      const apiPath = envUrl.pathname && envUrl.pathname !== '/' ? envUrl.pathname : '/api';
      return `${runtimeUrl.origin}${apiPath}`;
    }
  } catch {
    return envApiUrl;
  }

  return envApiUrl;
};

export const API_BASE_URL = resolveApiBaseUrl().replace(/\/$/, '');
