# 🛍️ Nexora Shop - E-Commerce Application

A modern, full-stack e-commerce shopping application built with React, Node.js, Express, and MongoDB. Features a clean, responsive UI with dark mode support and a seamless shopping experience.

## 📸 Screenshots

### Products Page

![Products Page](./screenshots/products.png)
_Browse through our collection of products with an intuitive and modern interface_

### Shopping Cart

![Shopping Cart](./screenshots/cart.png)
_Manage your cart items with easy quantity adjustments and real-time total calculations_

### Order Success

![Order Success](./screenshots/order-success.png)
_Confirmation page with detailed order information and receipt_

## 🎬 Video Demo & Explanation

📹 **[Watch the full project walkthrough and explanation on YouTube](https://youtu.be/1aOiDByPyqc)**

Get a complete overview of the Nexora Shop project including:

- Project setup and installation guide
- Live demo of all features (product browsing, cart management, checkout)
- Code walkthrough and architecture explanation
- Tech stack deep dive

## ✨ Features

- 🛒 **Product Catalog** - Browse products with detailed information
- 🎨 **Modern UI/UX** - Clean, responsive design with dark mode support
- 🛍️ **Shopping Cart** - Add, remove, and update product quantities
- 💳 **Checkout System** - Seamless order placement
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Eye-friendly dark theme
- ⚡ **Real-time Updates** - Instant cart and total calculations
- 🔒 **Secure Backend** - JWT authentication and secure API endpoints

## 🚀 Tech Stack

### Frontend

- **React 19** - Latest React for building UI components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Toastify** - Beautiful toast notifications
- **ESLint** - Code linting and quality

### Backend

- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **Prisma** - Modern ORM for database operations
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **Zod** - Schema validation

## 📁 Project Structure

```
Nexora-Assignment/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Cart.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/               # Express backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   │   ├── cart.controller.js
│   │   │   └── product.controller.js
│   │   ├── routes/        # API routes
│   │   │   ├── cart.routes.js
│   │   │   └── product.routes.js
│   │   ├── middlewares/   # Custom middlewares
│   │   └── data/          # Seed data
│   ├── prisma/           # Prisma schema
│   │   └── schema.prisma
│   ├── db.js             # Database connection
│   └── index.js          # Server entry point
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/prathamesh-patil-5090/Nexora-Assignment.git
cd Nexora-Assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB connection string
# DATABASE_URL="mongodb://localhost:27017/nexora"
# JWT_SECRET="your-secret-key"
# APP_STAGE="dev"

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database (optional)
npm run seed

# Start the server
npm run dev
```

The backend server will start on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 🔧 Environment Variables

### Backend (.env)

```env
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret-key"
APP_STAGE="dev"
PORT=3000
```

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `POST /api/cart/checkout` - Checkout and create order

## 🎨 UI Features

- **Refined Quantity Selector** - Improved +/- buttons with better styling and hover effects
- **Product Cards** - Modern card design with product images and details
- **Shopping Cart** - Clean cart interface with item management
- **Checkout Modal** - Streamlined checkout process
- **Receipt Modal** - Detailed order confirmation
- **Toast Notifications** - User-friendly feedback messages
- **Responsive Grid** - Adaptive layout for all screen sizes

## 📦 Database Schema

### User

- Full name, email, password
- Phone and address
- Associated carts and orders

### Product

- Name, description
- Price and unit
- Product image

### Cart

- User association
- Cart items (product ID, quantity)

### Order

- User association
- Order items with details
- Total amount and timestamps

## 🚀 Deployment

### Backend

- Deploy to platforms like Render, Railway, or Heroku
- Ensure MongoDB connection string is set in environment variables

### Frontend

- Build the production bundle: `npm run build`
- Deploy to Vercel, Netlify, or similar platforms

## 👨‍💻 Developer

**Prathamesh Patil**

- GitHub: [@prathamesh-patil-5090](https://github.com/prathamesh-patil-5090)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Product images from various sources
- Icons and UI inspiration from modern e-commerce platforms
- Community support and open-source libraries

---

Made with ❤️ by Prathamesh Patil
