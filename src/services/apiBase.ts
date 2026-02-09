const envApiUrl = import.meta.env.VITE_API_URL;
const runtimeOrigin = typeof window !== 'undefined' ? window.location?.origin : '';

const fallbackApiUrl = runtimeOrigin ? `${runtimeOrigin}/api` : '/api';

export const API_BASE_URL = (envApiUrl && envApiUrl.trim().length > 0
  ? envApiUrl
  : fallbackApiUrl
).replace(/\/$/, '');
