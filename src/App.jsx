import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import MainLayout from './layouts/MainLayout'
import PageLoader, { ScrollToTop } from './components/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const Account = lazy(() => import('./pages/Account'))
const About = lazy(() => import('./pages/About'))
const Farm = lazy(() => import('./pages/Farm'))
const Contact = lazy(() => import('./pages/Contact'))
const Categories = lazy(() => import('./pages/Categories'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

function SiteRoutes() {
  return (
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/account" element={<Account />} />
      <Route path="/about" element={<About />} />
      <Route path="/farm" element={<Farm />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {SiteRoutes()}
                <Route
                  path="/admin"
                  element={
                    <div className="min-h-screen bg-cream-100/60">
                      <Admin />
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </WishlistProvider>
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  )
}
