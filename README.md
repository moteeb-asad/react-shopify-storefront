# Shopify React Store - Vite + TypeScript

A modern headless e-commerce store built with Shopify Storefront API, React, TypeScript, and Vite.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Shopify Storefront API** - Headless commerce backend
- **React Router DOM** - Client-side routing
- **React Context** - State management
- **Bootstrap 5** - CSS framework
- **React Toastify** - Toast notifications

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Shopify store with Storefront API access

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-shopify-storefront
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```bash
   VITE_SHOPIFY_DOMAIN=your-shopify-domain.myshopify.com
   VITE_SHOPIFY_API=your-storefront-access-token
   ```

   Replace `your-shopify-domain` with your actual Shopify domain and `your-storefront-access-token` with your Storefront API access token.

## 🚦 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint
- **`npm run test`** - Run tests (Vitest)

## 🏗️ Project Structure

```
src/
├── assets/           # Static assets (images, CSS)
├── components/       # Reusable React components
├── context/          # React Context providers
├── pages/           # Page components
├── types/           # TypeScript type definitions
├── App.tsx          # Main App component
└── main.tsx         # Application entry point
```

## 🔧 Configuration

### Vite Configuration

The project uses path aliases for cleaner imports:

- `@/*` - src/
- `@assets/*` - src/assets/
- `@components/*` - src/components/
- `@pages/*` - src/pages/
- `@context/*` - src/context/
- `@types/*` - src/types/

### TypeScript Configuration

Strict TypeScript configuration with modern ES features and proper type checking.

## 🛍️ Features

- **Product Catalog** - Browse products from your Shopify store
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout Integration** - Seamless Shopify checkout
- **Responsive Design** - Mobile-first responsive UI
- **Type Safety** - Full TypeScript coverage
- **Modern Development** - Hot reload with Vite

## 📚 API Integration

This project uses the Shopify Storefront API to:

- Fetch products and collections
- Manage shopping cart
- Handle checkout process
- Apply discount codes

## 🔨 Development

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:3000`

3. **Make changes**
   The app will hot-reload automatically when you save files.

## 🏭 Production Build

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure your environment variables are set correctly
3. Verify your Shopify Storefront API permissions
4. Create an issue in the repository

---

Built with ❤️ using React, TypeScript, and Vite
