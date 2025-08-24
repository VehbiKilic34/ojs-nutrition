
import Navbar from './components/Navbar';
import { navigationItems, siteConfig } from './data/navigation';
import { CartProvider } from './contexts/CartContextProvider';
import { AuthProvider } from './contexts/AuthContextProvider';
import { OrderProvider } from './contexts/OrderContextProvider';
import bannerImage from './assets/OJS nutrition slider banner.png';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <div>
            <Navbar 
              brandName={siteConfig.brandName}
              navigationItems={navigationItems}
            />
            <div className="banner-container" style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginTop: '0px',
              position: 'relative',
              top: '0px',
              left: '0px',
              zIndex: '1',
              paddingTop: '0px'
            }}>
              <img 
                src={bannerImage} 
                alt="OJS Nutrition Banner" 
                style={{ 
                  width: '100%',
                  maxWidth: '1920px',
                  height: 'auto',
                  opacity: 1,
                  objectFit: 'cover',
                  display: 'block',
                  marginTop: '0px',
                  paddingTop: '0px'
                }} 
              />
            </div>
            <HomePage />
          </div>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
