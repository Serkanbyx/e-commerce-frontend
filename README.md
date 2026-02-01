# ShopHub - E-commerce Frontend

A modern, responsive e-commerce frontend application built with React, TypeScript, and Vite.

![ShopHub Preview](https://via.placeholder.com/800x400?text=ShopHub+E-commerce)

## Features

- **Product Listing** - Browse products with grid/list views
- **Advanced Filtering** - Filter by category, price range, and search
- **Sorting Options** - Sort by price, rating, or name
- **Pagination** - Navigate through product pages
- **Product Details** - View detailed product information
- **Shopping Cart** - Add, remove, and update quantities
- **Checkout** - Complete purchase with form validation
- **Responsive Design** - Works on all device sizes
- **State Persistence** - Cart saved to localStorage

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui inspired components
- **Icons**: Lucide React
- **API**: FakeStore API

## Project Structure

```
src/
├── components/
│   ├── cart/           # Cart components
│   ├── checkout/       # Checkout form
│   ├── layout/         # Header, Footer, Layout
│   ├── product/        # Product card, grid, filters
│   └── ui/             # Reusable UI components
├── lib/
│   ├── utils.ts        # Utility functions
│   └── validations.ts  # Zod schemas
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   └── CheckoutPage.tsx
├── store/
│   ├── slices/
│   │   ├── cartSlice.ts
│   │   └── productSlice.ts
│   ├── hooks.ts
│   └── store.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/shophub-ecommerce.git
cd shophub-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API

This project uses the [FakeStore API](https://fakestoreapi.com/) for product data.

**Endpoints used:**
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /products/categories` - Fetch categories

## Deployment

### Netlify

This project is configured for easy deployment to Netlify.

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Features Breakdown

### Product Listing
- Grid layout with responsive columns
- Loading skeletons for better UX
- Empty state handling

### Filtering & Sorting
- Category filter
- Price range filter (debounced)
- Search functionality
- Multiple sort options

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Persistent storage (localStorage)
- Real-time total calculation

### Checkout
- Multi-section form
- Real-time validation with Zod
- Card number formatting
- Order confirmation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing mock data
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
