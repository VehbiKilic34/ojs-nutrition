import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logoImage from '../assets/LOGO_Siyah.png';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // URL'den tab parametresini al, yoksa 'login' varsayılan
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'login';
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerFormData, setRegisterFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await login(loginFormData.email, loginFormData.password);
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch {
      setMessage('Giriş yapılırken bir hata oluştu!');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await register({
        firstName: registerFormData.firstName,
        lastName: registerFormData.lastName,
        email: registerFormData.email,
        password: registerFormData.password,
        confirmPassword: registerFormData.confirmPassword,
        acceptTerms: registerFormData.agreeTerms
      });
      
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        // Kayıt başarılıysa e-posta doğrulama sayfasına yönlendir
        setTimeout(() => {
          navigate(`/email-verification?email=${encodeURIComponent(registerFormData.email)}`);
        }, 1500);
      }
    } catch {
      setMessage('Kayıt yapılırken bir hata oluştu!');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card auth-card shadow-lg border-0">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <Link to="/" className="text-decoration-none">
                    <img 
                      src={logoImage} 
                      alt="OJS Nutrition" 
                      height="50" 
                      className="mb-3"
                    />
                  </Link>
                  <h2 className="fw-bold text-dark mb-2">Hesap</h2>
                  <p className="text-muted">Giriş yapın veya hesap oluşturun</p>
                </div>

                {/* Mesaj */}
                {message && (
                  <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} mb-4`}>
                    {message}
                  </div>
                )}

                {/* Tab Navigation */}
                <div className="nav nav-pills nav-fill mb-4" role="tablist">
                  <button
                    className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => switchTab('login')}
                    type="button"
                  >
                    Giriş Yap
                  </button>
                  <button
                    className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => switchTab('register')}
                    type="button"
                  >
                    Üye Ol
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={loginFormData.email}
                      onChange={handleLoginInputChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-medium">
                      Şifre
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      value={loginFormData.password}
                      onChange={handleLoginInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={loginFormData.rememberMe}
                        onChange={handleLoginInputChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Beni hatırla
                      </label>
                    </div>
                    <Link to="/sifremi-unuttum" className="text-decoration-none text-primary">
                      Şifremi unuttum
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Giriş yapılıyor...
                      </>
                    ) : (
                      'Giriş Yap'
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">Hesabınız yok mu? </span>
                    <button 
                      type="button"
                      className="text-decoration-none fw-medium border-0 bg-transparent text-primary"
                      onClick={() => switchTab('register')}
                    >
                      Üye olun
                    </button>
                  </div>
                </form>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label fw-medium">
                        Ad
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="firstName"
                        name="firstName"
                        value={registerFormData.firstName}
                        onChange={handleRegisterInputChange}
                        placeholder="Adınız"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label fw-medium">
                        Soyad
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="lastName"
                        name="lastName"
                        value={registerFormData.lastName}
                        onChange={handleRegisterInputChange}
                        placeholder="Soyadınız"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label fw-medium">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="registerEmail"
                      name="email"
                      value={registerFormData.email}
                      onChange={handleRegisterInputChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label fw-medium">
                      Şifre
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="registerPassword"
                      name="password"
                      value={registerFormData.password}
                      onChange={handleRegisterInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">
                      Şifre Tekrar
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={registerFormData.confirmPassword}
                      onChange={handleRegisterInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={registerFormData.agreeTerms}
                        onChange={handleRegisterInputChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        <a href="#" className="text-decoration-none">Kullanım şartları</a> ve{' '}
                        <a href="#" className="text-decoration-none">Gizlilik politikası</a>'nı kabul ediyorum
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Kayıt yapılıyor...
                      </>
                    ) : (
                      'Üye Ol'
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">Zaten hesabınız var mı? </span>
                    <button 
                      type="button"
                      className="text-decoration-none fw-medium border-0 bg-transparent text-primary"
                      onClick={() => switchTab('login')}
                    >
                      Giriş yapın
                    </button>
                  </div>
                </form>
              )}

                {/* Social Login - Sadece login tab'ında göster */}
                {activeTab === 'login' && (
                  <div className="mt-4">
                    <div className="text-center mb-3">
                      <span className="text-muted">veya</span>
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-secondary btn-lg social-btn">
                        <i className="fab fa-google me-2"></i>
                        Google ile giriş yap
                      </button>
                      <button className="btn btn-outline-secondary btn-lg social-btn">
                        <i className="fab fa-facebook me-2"></i>
                        Facebook ile giriş yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 