import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import logoImage from '../assets/LOGO_Siyah.png';
import './Navbar.css';

interface NavbarProps {
  brandName: string;
  navigationItems: Array<{
    id: string;
    label: string;
    path: string;
    isActive?: boolean;
    children?: Array<{
      id: string;
      label: string;
      path: string;
      isActive?: boolean;
    }>;
  }>;
}

const Navbar = ({ 
  brandName, 
  navigationItems 
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePath, setActivePath] = useState('/');
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    
    // Body scroll'u engelle/etkinleştir
    if (!isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Arama işlemi burada yapılacak
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    
    // Body scroll'u etkinleştir
    document.body.classList.remove('menu-open');
  };

  const handleNavClick = (path: string) => {
    setActivePath(path);
    closeMenus();
  };

  // Component unmount olduğunda body scroll'u etkinleştir
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  // Sepet ürün sayısını hesapla
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Üst Header - Logo ve Arama */}
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center py-3">
            {/* Sandviç Menü Butonu - Sadece Mobil */}
            <div className="col-3 d-lg-none">
              <button 
                className={`navbar-toggler border-0 ${isMenuOpen ? 'open' : ''}`}
                type="button" 
                onClick={toggleMenu}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
                aria-controls="navbarNav"
              >
                <div className="hamburger-icon">
                  <span className="line line1"></span>
                  <span className="line line2"></span>
                  <span className="line line3"></span>
                </div>
              </button>
            </div>
            
            {/* Logo - Mobilde Ortada, Desktop'ta Solda */}
            <div className="col-6 col-lg-3 d-flex justify-content-center justify-content-lg-start">
              <div className="d-flex align-items-center text-decoration-none cursor-pointer">
                <img 
                  src={logoImage} 
                  alt={brandName}
                  height="45"
                  className="img-fluid"
                  style={{ maxHeight: '45px', width: 'auto' }}
                />
              </div>
            </div>

            {/* Arama Kutusu - Desktop */}
            <div className="col-lg-6 d-none d-lg-block">
              <form onSubmit={handleSearch} className="position-relative">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Aradığınız ürünü yazınız"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRadius: '0', borderRight: 'none' }}
                  />
                  <button 
                    className="btn btn-secondary" 
                    type="submit"
                    style={{ borderRadius: '0' }}
                  >
                    ARA
                  </button>
                </div>
              </form>
            </div>

            {/* Sağ Menü - Desktop'ta Hesap ve Sepet */}
            <div className="col-3 col-lg-3 d-none d-lg-block">
              <div className="d-flex justify-content-end align-items-center">
                {/* HESAP Butonu */}
                <div className="dropdown me-3">
                  <button 
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user me-2"></i>HESAP
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {user ? (
                      <>
                        <li><h6 className="dropdown-header">Hoş geldin, {user.firstName}</h6></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profilim</a></li>
                        <li><a className="dropdown-item" href="#"><i className="fas fa-box me-2"></i>Siparişlerim</a></li>
                        <li><a className="dropdown-item" href="#"><i className="fas fa-heart me-2"></i>Favorilerim</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={logout}><i className="fas fa-sign-out-alt me-2"></i>Çıkış Yap</button></li>
                      </>
                    ) : (
                      <>
                        <li><a className="dropdown-item" href="#"><i className="fas fa-sign-in-alt me-2"></i>Giriş Yap</a></li>
                        <li><a className="dropdown-item" href="#"><i className="fas fa-user-plus me-2"></i>Üye Ol</a></li>
                      </>
                    )}
                  </ul>
                </div>

                {/* SEPET Butonu */}
                <div className="position-relative">
                  <button className="btn btn-secondary position-relative">
                    <i className="fas fa-shopping-cart me-2"></i>SEPET
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Boş alan - Mobilde sağ taraf */}
            <div className="col-3 d-lg-none"></div>
          </div>
        </div>
      </div>

      {/* Ana Navigation - Beyaz Arka Plan */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Desktop'ta sandviç butonu gizli */}
          <button 
            className="navbar-toggler border-0 d-lg-none d-none"
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="navbarNav"
          >
            <div className="hamburger-icon">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </button>

          {/* Arama Kutusu - Mobil */}
          <div className="d-lg-none w-100 mb-3">
            <form onSubmit={handleSearch} className="position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Aradığınız ürünü yazınız"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: '0', borderRight: 'none' }}
                />
                <button 
                  className="btn btn-secondary" 
                  type="submit"
                  style={{ borderRadius: '0' }}
                >
                  ARA
                </button>
              </div>
            </form>
          </div>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navigationItems.map((item) => {
                const isActive = activePath === item.path;
                
                return (
                  <li key={item.id} className="nav-item">
                    <a 
                      className={`nav-link px-3 py-2 ${isActive ? 'active fw-bold' : ''}`}
                      href={item.path}
                      onClick={() => handleNavClick(item.path)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              
              {/* Mobil Menüde Hesap ve Sepet */}
              <div className="d-lg-none">
                <li className="nav-item">
                  <hr className="dropdown-divider my-2" style={{ borderColor: 'rgba(0,0,0,0.2)' }} />
                </li>
                
                {/* HESAP Butonu - Mobil */}
                <li className="nav-item">
                  <div className="dropdown">
                    <button 
                      className="btn btn-link nav-link text-dark w-100 text-start px-3 py-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user me-2"></i>HESAP
                    </button>
                    <ul className="dropdown-menu dropdown-menu-start w-100">
                      {user ? (
                        <>
                          <li><h6 className="dropdown-header">Hoş geldin, {user.firstName}</h6></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profilim</a></li>
                          <li><a className="dropdown-item" href="#"><i className="fas fa-box me-2"></i>Siparişlerim</a></li>
                          <li><a className="dropdown-item" href="#"><i className="fas fa-heart me-2"></i>Favorilerim</a></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><button className="dropdown-item" onClick={logout}><i className="fas fa-sign-out-alt me-2"></i>Çıkış Yap</button></li>
                        </>
                      ) : (
                        <>
                          <li><a className="dropdown-item" href="#"><i className="fas fa-sign-in-alt me-2"></i>Giriş Yap</a></li>
                          <li><a className="dropdown-item" href="#"><i className="fas fa-user-plus me-2"></i>Üye Ol</a></li>
                        </>
                      )}
                    </ul>
                  </div>
                </li>
                
                {/* SEPET Butonu - Mobil */}
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-dark w-100 text-start px-3 py-2 position-relative">
                    <i className="fas fa-shopping-cart me-2"></i>SEPET
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-50 end-0 translate-middle-y badge rounded-pill bg-danger me-3">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Bilgi Çubuğu - Açık Gri */}
      <div className="info-bar bg-light">
        <div className="container">
          <div className="row py-2">
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <i className="fas fa-box me-2 text-primary"></i>
              <span className="small">AYNI GÜN KARGO - 16:00'DAN ÖNCEKİ SİPARİŞLERDE</span>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <i className="fas fa-smile me-2 text-success"></i>
              <span className="small">ÜCRETSİZ KARGO - 100 TL ÜZERİ SİPARİŞLERDE</span>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <i className="fas fa-shield-alt me-2 text-warning"></i>
              <span className="small">GÜVENLİ ALIŞVERİŞ - 1.000.000+ MUTLU MÜŞTERİ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Arama - Sadece menü açıkken görünür */}
      {isSearchOpen && (
        <div className="d-md-none bg-light p-3 border-top">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Aradığınız ürünü yazınız"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '0', borderRight: 'none' }}
              />
              <button 
                className="btn btn-secondary" 
                type="submit"
                style={{ borderRadius: '0' }}
              >
                ARA
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Overlay - Mobile menü açıkken arka planı karart */}
      {(isMenuOpen || isSearchOpen) && (
        <div 
          className="d-lg-none position-fixed w-100 h-100 bg-dark bg-opacity-50"
          style={{ top: 0, left: 0, zIndex: 1000 }}
          onClick={closeMenus}
        />
      )}
    </>
  );
};

export default Navbar; 