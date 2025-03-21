interface Config {
  rewrites?: any;
  redirects?: any;
  headers?: any;
  cleanUrls?: any;
  trailingSlash?: any;
  routes?: any;
}

export function validateConfig(config: Config) {
  const { rewrites, redirects, headers, cleanUrls, trailingSlash, routes } = config;

  if ((rewrites || redirects || headers || cleanUrls || trailingSlash) && routes) {
    throw new Error("If `rewrites`, `redirects`, `headers`, `cleanUrls`, or `trailingSlash` are used, then `routes` cannot be present.");
  }
}
