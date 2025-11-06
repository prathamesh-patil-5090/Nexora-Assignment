# Nexora E-Commerce Cart API - Postman Guide

This guide provides instructions for testing the Nexora E-Commerce Cart APIs using Postman. The backend is built with Node.js, Express, and Prisma (MongoDB).

## Setup

1. **Start the Backend Server**:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Server runs on `http://localhost:3000` (or check console for port).

2. **Seed Products** (Run once to populate mock data):

   ```bash
   node src/data/seed.js
   ```

   This adds 8 fashion-related products to the database.

3. **Postman Setup**:
   - Import this collection or create requests manually.
   - Base URL: `http://localhost:3000`
   - No authentication required (uses mock user).

## API Endpoints

### 1. Get Products

- **Method**: GET
- **URL**: `/api/products`
- **Query Params** (optional):
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **cURL**:
  ```bash
  curl -X GET "http://localhost:3000/api/products?page=1&limit=5"
  ```
- **Response**:
  ```json
  {
    "page": 1,
    "limit": 10,
    "totalProducts": 8,
    "totalPages": 2,
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": 0.0,
        "unit": "string",
        "image": "string"
      }
    ]
  }
  ```
- **Example**: GET `http://localhost:3000/api/products?page=1&limit=5`

### 2. Add Item to Cart

- **Method**: POST
- **URL**: `/api/cart`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
    "productId": "string",
    "quantity": 1
  }
  ```
- **cURL**:
  ```bash
  curl -X POST "http://localhost:3000/api/cart" \
    -H "Content-Type: application/json" \
    -d '{"productId": "some-product-id", "quantity": 2}'
  ```
- **Response**:
  ```json
  {
    "message": "Item added to cart",
    "cart": {
      "id": "string",
      "userId": "string",
      "items": [
        {
          "productId": "string",
          "quantity": 1
        }
      ],
      "createdAt": "2025-11-06T00:00:00.000Z",
      "updatedAt": "2025-11-06T00:00:00.000Z"
    }
  }
  ```
- **Example**: POST `http://localhost:3000/api/cart` with body `{"productId": "some-id", "quantity": 2}`

### 3. Get Cart4

- **Method**: GET
- **URL**: `/api/cart`
- **cURL**:
  ```bash
  curl -X GET "http://localhost:3000/api/cart"
  ```
- **Response**:
  ```json
  {
    "items": [
      {
        "productId": "string",
        "quantity": 1,
        "name": "string",
        "price": 0.0,
        "unit": "string",
        "image": "string",
        "total": 0.0
      }
    ],
    "total": 0.0
  }
  ```
- **Example**: GET `http://localhost:3000/api/cart`

### 4. Remove Item from Cart

- **Method**: DELETE
- **URL**: `/api/cart/:id` (replace `:id` with productId)
- **cURL**:
  ```bash
  curl -X DELETE "http://localhost:3000/api/cart/some-product-id"
  ```
- **Response**: 200 OK
  ```json
  {
    "message": "Item removed from cart"
  }
  ```
- **Example**: DELETE `http://localhost:3000/api/cart/some-product-id`

### 5. Checkout

- **Method**: POST
- **URL**: `/api/cart/checkout`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
    "cartItems": [
      {
        "productId": "string",
        "quantity": 1
      }
    ]
  }
  ```
- **cURL**:
  ```bash
  curl -X POST "http://localhost:3000/api/cart/checkout" \
    -H "Content-Type: application/json" \
    -d '{"cartItems": [{"productId": "some-product-id", "quantity": 1}]}'
  ```
- **Response**:
  ```json
  {
    "message": "Checkout successful",
    "receipt": {
      "orderId": "string",
      "total": 0.0,
      "timestamp": "2025-11-06T00:00:00.000Z",
      "items": [
        {
          "productId": "string",
          "quantity": 1,
          "price": 0.0,
          "name": "string",
          "unit": "string"
        }
      ]
    }
  }
  ```
- **Example**: POST `http://localhost:3000/api/cart/checkout` with body containing current cart items.

## Notes

- Uses a mock user (`mock@example.com`) for all operations.
- Cart persists in DB per user.
- Checkout clears the cart and creates an order.
- Errors return JSON with `message` or `error` fields.
- For production, add auth and validation.

## Sample Workflow (cURL or Postman)

1. GET products to see available items.
2. POST to cart to add items.
3. GET cart to view current cart.
4. DELETE if needed to remove items.
5. POST checkout to complete order.

If issues, check server logs or health endpoint: GET `http://localhost:3000/health`.
