# Just Kitchen & Bath 🏠

A modern, responsive e-commerce website for kitchen and bathroom fixtures and fittings. Built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB.

## 🌟 Features

### 🛍️ E-commerce Functionality

- **Product Catalog**: Browse kitchen and bathroom products with detailed information
- **Category Navigation**: Dynamic category-based navigation with dropdown menus
- **Product Filtering**: Filter products by category, tags, and search terms
- **Product Details**: Detailed product pages with image galleries and specifications
- **Color Options**: Multiple color variants for each product
- **Responsive Design**: Mobile-first design that works on all devices

### 🎨 User Experience

- **Modern UI**: Clean, professional design with smooth animations
- **Hero Sections**: Engaging hero sections for different product categories
- **Partnership Showcase**: Display of brand partnerships and collaborations
- **Featured Products**: Highlighted product sections
- **Smooth Navigation**: Intuitive navigation with hover effects and transitions
- **Back to Top**: Convenient scroll-to-top functionality

### 🔧 Technical Features

- **Next.js 15**: Latest version with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS 4**: Modern styling with utility classes
- **MongoDB**: NoSQL database for product and category data
- **SWR**: Data fetching with caching and revalidation
- **Responsive Images**: Optimized image loading with Next.js Image component
- **SEO Optimized**: Meta tags and structured data for search engines

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/just-kitchen.git
   cd just-kitchen
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
just-kitchen/
├── public/                 # Static assets
│   ├── featured/          # Featured product images
│   ├── partners/          # Partner brand logos
│   ├── product/           # Product images by category
│   └── socialMedia/       # Social media icons
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── category/ # Category API endpoints
│   │   │   └── product/  # Product API endpoints
│   │   ├── products/     # Product pages
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── product/      # Product-specific components
│   │   └── ...           # Other UI components
│   ├── lib/              # Utility functions
│   └── models/           # MongoDB schemas
└── package.json
```

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Icons**: Icon library
- **SWR**: Data fetching and caching

### Backend

- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📊 Database Schema

### Product Model

```typescript
interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  features: string[];
  colorOptions: {
    name: string;
    hex: string;
    images: string[];
    code: string;
  }[];
  material: string;
  type: string;
  category: string;
  tags: string;
  createdAt: Date;
}
```

## 🎯 Key Components

### Navigation

- **Navbar**: Main navigation with category dropdowns
- **Category Grid**: Visual category browsing
- **Product Filters**: Advanced filtering and sorting

### Product Display

- **Product Grid**: Responsive product grid layout
- **Product Card**: Individual product display
- **Product Image Gallery**: Multi-image product views
- **Product Info**: Detailed product specifications

### User Interface

- **Hero Sections**: Engaging landing sections
- **Featured Products**: Highlighted product showcases
- **Partnerships**: Brand partnership display
- **Footer**: Site footer with links and information

## 🔌 API Endpoints

### Products

- `GET /api/product` - Fetch products with filtering
- `POST /api/product` - Create new product
- `GET /api/product/[slug]` - Get specific product

### Categories

- `GET /api/category` - Fetch product categories and tags

## 🎨 Styling

The project uses Tailwind CSS 4 with a custom color palette:

- Primary: `#a52a2a` (Brown)
- Secondary: `#811200` (Dark Brown)
- Background: `#f7f7fa` (Light Gray)

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- Mobile: Default styles
- Tablet: `md:` prefix
- Desktop: `lg:` and `xl:` prefixes

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the database solution
- All contributors and partners

## 📞 Support

For support, email support@justkitchenbath.com or create an issue in this repository.

---

**Just Kitchen & Bath** - Live inspired. Curate with Purpose. 🏠✨
