import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

/**
 * Footer component with links and contact info
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold">ShopHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality products at great prices. We deliver
              excellence in every order.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/?category=electronics"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=jewelery"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=men's clothing"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=women's clothing"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/cart"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Checkout
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Shipping & Returns
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">FAQ</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Commerce St, Shop City</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} ShopHub. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span className="cursor-pointer transition-colors hover:text-primary">
                Privacy Policy
              </span>
              <span className="cursor-pointer transition-colors hover:text-primary">
                Terms of Service
              </span>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Created by{' '}
            <a
              href="https://serkanbayraktar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Serkanby
            </a>
            {' | '}
            <a
              href="https://github.com/Serkanbyx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
