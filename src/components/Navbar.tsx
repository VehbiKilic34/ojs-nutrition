import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import type { NavItem } from '../data/navigation';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import logoImage from '../assets/LOGO_Siyah.png';

interface NavbarProps {
  brandName: string;
  navigationItems: NavItem[];
}

const Navbar = ({ 
  brandName, 
  navigationItems 
}: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false); // Hesap menüsü görünürlüğü
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Arama:', searchQuery);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

  const toggleAccountMenu = () => {
    console.log('Hesap menüsü tıklandı, mevcut durum:', showAccountMenu);
    setShowAccountMenu(!showAccountMenu);
  };

  // Menü dışına tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    };

    if (showAccountMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountMenu]);



  return (
    <>
      {/* Üst Header - Logo ve Arama */}
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center py-2">
            {/* Logo */}
                         <div className="col-lg-3 col-md-4 col-6">
               <div 
                 className="d-flex align-items-center text-decoration-none cursor-pointer" 
                 onClick={handleLogoClick}
                 style={{ cursor: 'pointer' }}
               >
                 <img 
                   src={logoImage} 
                   alt={brandName}
                   height="45"
                   className="me-2 img-fluid"
                   style={{ maxHeight: '45px', width: 'auto' }}
                 />
               </div>
             </div>

            {/* Arama Kutusu - Desktop */}
            <div className="col-lg-6 col-md-4 d-none d-md-block">
              <form onSubmit={handleSearch} className="position-relative">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    className="btn" 
                    type="submit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Sağ Taraf - Sepet ve Kullanıcı */}
            <div className="col-lg-3 col-md-4 col-6">
              <div className="d-flex justify-content-end align-items-center gap-2 gap-md-3">
                {/* Mobile Arama Butonu */}
                <button 
                  className="btn btn-outline-secondary d-md-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mobileSearch"
                  aria-expanded="false"
                  aria-controls="mobileSearch"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>

                {/* Sepet */}
                <Link 
                  to="/sepet" 
                  className="btn btn-outline-secondary position-relative tooltip-container"
                  data-tooltip="Sepet"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Hesap Kutucuğu */}
                <div className="position-relative" ref={accountMenuRef}>
                  <button 
                    className="btn btn-outline-secondary tooltip-container"
                    onClick={toggleAccountMenu}
                    type="button"
                    data-tooltip={isAuthenticated ? "Hesabım" : "Giriş Yap"}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                  
                  {/* Hesap Menüsü */}
                  {showAccountMenu && (
                    <div className="dropdown-menu show position-absolute top-100 end-0 mt-2">
                      {isAuthenticated ? (
                        <>
                                                     <Link to="/hesabim" className="dropdown-item" onClick={() => setShowAccountMenu(false)}>
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                               <circle cx="12" cy="7" r="4"></circle>
                             </svg>
                             Hesabım
                           </Link>
                          <div className="dropdown-divider"></div>
                          <button 
                            className="dropdown-item text-danger" 
                            onClick={handleLogout}
                            type="button"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16,17 21,12 16,7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Çıkış Yap
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/giris" className="dropdown-item" onClick={() => setShowAccountMenu(false)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                              <polyline points="10,17 15,12 10,7"></polyline>
                              <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                            Giriş Yap
                          </Link>
                          <Link to="/uye-ol" className="dropdown-item" onClick={() => setShowAccountMenu(false)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="8.5" cy="7" r="4"></circle>
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            Kayıt Ol
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Arama Kutusu */}
            <div className="col-12 d-md-none">
              <div className="collapse" id="mobileSearch">
                <form onSubmit={handleSearch} className="mt-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      className="btn" 
                      type="submit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Header - Navigasyon */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.id} className="nav-item">
                    <Link 
                      className={`nav-link px-3 fw-medium ${isActive ? 'active' : ''}`} 
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
