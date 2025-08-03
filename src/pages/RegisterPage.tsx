import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logoImage from '../assets/LOGO_Siyah.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: formData.acceptTerms,
        acceptMarketing: formData.acceptMarketing
      });
      
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        // Kayıt başarılıysa e-posta doğrulama sayfasına yönlendir
        setTimeout(() => {
          navigate(`/email-verification?email=${encodeURIComponent(formData.email)}`);
        }, 1500);
      }
    } catch {
      setMessage('Kayıt yapılırken bir hata oluştu!');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
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
                  <h2 className="fw-bold text-dark mb-2">Üye Olun</h2>
                  <p className="text-muted">Hesabınızı oluşturun ve alışverişe başlayın</p>
                </div>

                {/* Mesaj */}
                {message && (
                  <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} mb-4`}>
                    {message}
                  </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label fw-medium">
                        Ad *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Adınız"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label fw-medium">
                        Soyad *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Soyadınız"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-medium">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-medium">
                      Şifre *
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                    <small className="text-muted">
                      En az 8 karakter, büyük harf, küçük harf ve rakam içermelidir
                    </small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">
                      Şifre Tekrarı *
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="acceptTerms">
                        <Link to="/kullanim-kosullari" className="text-decoration-none">
                          Kullanım Koşulları
                        </Link> ve{' '}
                        <Link to="/gizlilik-politikasi" className="text-decoration-none">
                          Gizlilik Politikası
                        </Link>'nı kabul ediyorum *
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="acceptMarketing"
                        name="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="acceptMarketing">
                        Kampanya ve indirimlerden haberdar olmak istiyorum
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
                    <Link to="/giris" className="text-decoration-none fw-medium">
                      Giriş yapın
                    </Link>
                  </div>
                </form>

                {/* Social Register */}
                <div className="mt-4">
                  <div className="text-center mb-3">
                    <span className="text-muted">veya</span>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-secondary btn-lg social-btn">
                      <i className="fab fa-google me-2"></i>
                      Google ile üye ol
                    </button>
                    <button className="btn btn-outline-secondary btn-lg social-btn">
                      <i className="fab fa-facebook me-2"></i>
                      Facebook ile üye ol
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 