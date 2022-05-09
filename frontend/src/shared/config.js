//SERVER ROUTES
export const URL_AUTH =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:3001/api/v1'
    : 'http://localhost/api/v1';

export const URL_CONV =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:3002/api/v1'
    : 'http://localhost/api/v1';
