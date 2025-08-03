import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logoImage from '../assets/LOGO_Siyah.png';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, sendVerificationEmail, user } = useAuth();
  
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [countdown, setCountdown] = useState(0);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleTokenVerification = useCallback(async (token: string) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await verifyEmail(token);
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch {
      setMessage('Doğrulama işlemi sırasında bir hata oluştu.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  }, [verifyEmail, navigate]);

  useEffect(() => {
    if (token) {
      handleTokenVerification(token);
    }
  }, [token, handleTokenVerification]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleManualVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setMessage('Doğrulama kodunu giriniz.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await verifyEmail(verificationCode);
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch {
      setMessage('Doğrulama işlemi sırasında bir hata oluştu.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const emailToUse = email || user?.email;
      if (!emailToUse) {
        setMessage('E-posta adresi bulunamadı.');
        setMessageType('error');
        return;
      }

      const result = await sendVerificationEmail(emailToUse);
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        setCountdown(60); // 60 saniye bekleme süresi
      }
    } catch {
      setMessage('Kod gönderilirken bir hata oluştu.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center py-5">
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
                  <h2 className="fw-bold text-dark mb-2">E-posta Doğrulama</h2>
                  <p className="text-muted">
                    E-posta adresinizi doğrulamak için aşağıdaki kodu giriniz
                  </p>
                </div>

                {/* Mesaj */}
                {message && (
                  <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} mb-4`}>
                    {message}
                  </div>
                )}

                {/* Doğrulama Formu */}
                <form onSubmit={handleManualVerification}>
                  <div className="mb-4">
                    <label htmlFor="verificationCode" className="form-label fw-medium">
                      Doğrulama Kodu
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg text-center"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                    <small className="text-muted">
                      6 haneli doğrulama kodunu giriniz
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Doğrulanıyor...
                      </>
                    ) : (
                      'Doğrula'
                    )}
                  </button>
                </form>

                {/* Yeni Kod Gönder */}
                <div className="text-center mb-4">
                  <span className="text-muted">Kod gelmedi mi? </span>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0"
                    onClick={handleResendCode}
                    disabled={countdown > 0 || isLoading}
                  >
                    {countdown > 0 ? `${countdown} saniye sonra tekrar gönder` : 'Yeni kod gönder'}
                  </button>
                </div>

                {/* Geri Dön */}
                <div className="text-center">
                  <Link to="/giris" className="text-decoration-none">
                    <i className="bi bi-arrow-left me-2"></i>
                    Giriş sayfasına dön
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage; 