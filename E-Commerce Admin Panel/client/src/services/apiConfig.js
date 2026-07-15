const getApiBaseUrl = () => {
  const { hostname, protocol } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  if (hostname.endsWith('.github.dev')) {
    const base = hostname.split('.app.github.dev')[0];
    const lastDashIndex = base.lastIndexOf('-');
    if (lastDashIndex !== -1) {
      const nameWithoutPort = base.substring(0, lastDashIndex);
      return `https://${nameWithoutPort}-5000.app.github.dev`;
    }
  }
  // Fallback to local network IP or whatever host is serving the app, on port 5000
  return `${protocol}//${hostname}:5000`;
};

export const API_BASE_URL = getApiBaseUrl();
