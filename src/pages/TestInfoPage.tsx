import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TestInfoPage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-dark mb-3">Test Kullanıcı Bilgileri</h2>
                <p className="text-muted">
                  Giriş yapmak için aşağıdaki test kullanıcı bilgilerini kullanabilirsiniz.
                </p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-light border-0 mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        <i className="bi bi-person-check me-2"></i>
                        Test Kullanıcısı
                      </h5>
                      <div className="mb-2">
                        <strong>E-posta:</strong> test@example.com
                      </div>
                      <div className="mb-2">
                        <strong>Şifre:</strong> 123456
                      </div>
                      <div className="mb-3">
                        <strong>Durum:</strong> 
                        <span className="badge bg-success ms-2">E-posta Doğrulanmış</span>
                      </div>
                      <Link to="/giris" className="btn btn-primary btn-sm">
                        Giriş Yap
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card bg-light border-0 mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-warning">
                        <i className="bi bi-person-plus me-2"></i>
                        Yeni Kayıt
                      </h5>
                      <p className="card-text">
                        Yeni bir hesap oluşturmak için kayıt ol sayfasını kullanabilirsiniz.
                        Kayıt olduktan sonra e-posta doğrulama süreci başlayacaktır.
                      </p>
                      <Link to="/uye-ol" className="btn btn-warning btn-sm">
                        Kayıt Ol
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {isAuthenticated && user && (
                <div className="alert alert-success mt-4">
                  <h6 className="alert-heading">
                    <i className="bi bi-check-circle me-2"></i>
                    Giriş Yapıldı!
                  </h6>
                  <p className="mb-0">
                    Hoş geldiniz, <strong>{user.firstName} {user.lastName}</strong>! 
                    E-posta adresiniz: <strong>{user.email}</strong>
                  </p>
                </div>
              )}

              <div className="mt-4">
                <h5 className="text-dark mb-3">Özellikler:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <div>
                      <strong>Giriş Yapma:</strong> E-posta ve şifre ile giriş yapabilirsiniz
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <div>
                      <strong>Kayıt Olma:</strong> Yeni hesap oluşturabilirsiniz
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <div>
                      <strong>E-posta Doğrulama:</strong> Kayıt sonrası e-posta doğrulama süreci
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <div>
                      <strong>Oturum Yönetimi:</strong> Giriş durumu localStorage'da saklanır
                    </div>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <div>
                      <strong>Çıkış Yapma:</strong> Güvenli çıkış yapabilirsiniz
                    </div>
                  </li>
                </ul>
              </div>

              <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-house me-2"></i>
                  Ana Sayfaya Dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInfoPage; 