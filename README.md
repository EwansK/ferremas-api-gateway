# Ferremas API Gateway

API Gateway service for the Ferremas e-commerce platform.

## Development

```bash
npm install
npm start
```

## Docker

```bash
docker build -t ferremas-api-gateway .
docker run -p 4000:4000 ferremas-api-gateway
```

## Environment Variables

- `PRODUCT_SERVICE_URL` - Product service endpoint
- `USER_SERVICE_URL` - User service endpoint  
- `ADMIN_SERVICE_URL` - Admin service endpoint

## Routes

- `/api/products` - Proxy to Product Service
- `/api/users` - Proxy to User Service
- `/api/admin` - Proxy to Admin Service