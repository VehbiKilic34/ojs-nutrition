
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { siteConfig } from './data/navigation';
import { CartProvider } from './contexts/CartContextProvider';
import { AuthProvider } from './contexts/AuthContextProvider';
import { OrderProvider } from './contexts/OrderContextProvider';
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { homeLoader, allProductsLoader, productDetailLoader } from './loaders';

// Layout component that includes Navbar
const Layout = () => {
  return (
    <div>
      <Navbar brandName={siteConfig.brandName} />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "urunler",
        element: <AllProductsPage />,
        loader: allProductsLoader,
      },
      {
        path: "tum-urunler",
        element: <AllProductsPage />,
        loader: allProductsLoader,
      },
      {
        path: "kategori/:categorySlug",
        element: <CategoryPage />,
      },
      {
        path: "urun/:slug",
        element: <ProductDetailPage />,
        loader: productDetailLoader,
      },
    ],
  },
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
