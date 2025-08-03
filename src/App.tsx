
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import TestInfoPage from './pages/TestInfoPage';
import AccountPage from './pages/AccountPage';
import ErrorPage from './pages/ErrorPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderDetailPage from './pages/OrderDetailPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import { navigationItems, siteConfig } from './data/navigation';
import { homeLoader, productsLoader, productDetailLoader } from './loaders';
import { CartProvider } from './contexts/CartContextProvider';
import { AuthProvider } from './contexts/AuthContextProvider';
import { OrderProvider } from './contexts/OrderContextProvider';



// Ana layout component'i
function AppLayout() {
  return (
    <>
      <Navbar 
        brandName={siteConfig.brandName}
        navigationItems={navigationItems}
      />
      <Outlet />
    </>
  );
}

// Router yapılandırması
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "/urunler",
        element: <ProductsPage />,
        loader: productsLoader,
      },
      {
        path: "/urunler/:slug",
        element: <ProductDetailPage />,
        loader: productDetailLoader,
      },
      {
        path: "/hakkimizda",
        element: <AboutPage />
      },
      {
        path: "/sss",
        element: <FAQPage />
      },
      {
        path: "/iletisim",
        element: <ContactPage />
      },
      {
        path: "/sepet",
        element: <CartPage />
      },
      {
        path: "/odeme",
        element: <CheckoutPage />
      },
      {
        path: "/siparis-basarili",
        element: <OrderSuccessPage />
      },
      {
        path: "/siparis/:orderId",
        element: <OrderDetailPage />
      },
      {
        path: "/giris",
        element: <LoginPage />
      },
      {
        path: "/uye-ol",
        element: <RegisterPage />
      },
      {
        path: "/email-verification",
        element: <EmailVerificationPage />
      },
      {
        path: "/test",
        element: <TestInfoPage />
      },
      {
        path: "/hesabim",
        element: <AccountPage />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RouterProvider router={router} />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
