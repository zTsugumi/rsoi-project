//SERVER ROUTES
export const URL_GW =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:3001/api/v1'
    : 'http://localhost/api/v1';

export const URL_ROOM =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:3003/api/v1'
    : 'http://localhost/api/v1';

export const URL_CONV =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:3003/api/v1'
    : 'http://localhost/api/v1';
