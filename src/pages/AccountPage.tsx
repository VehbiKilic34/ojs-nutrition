import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import type { Order } from '../contexts/OrderContext';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar: string;
}



const AccountPage = () => {
  const { orders } = useOrder();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Örnek kullanıcı verisi
  const [user, setUser] = useState<User>({
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    phone: '+90 555 123 4567',
    address: {
      street: 'Atatürk Caddesi No: 123',
      city: 'İstanbul',
      state: 'Kadıköy',
      zipCode: '34700',
      country: 'Türkiye'
    },
    avatar: '/images/avatar-placeholder.jpg'
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUser(prev => {
        const updatedUser = { ...prev };
        if (parent === 'address') {
          updatedUser.address = { ...updatedUser.address, [child]: value };
        }
        return updatedUser;
      });
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simüle edilmiş kaydetme işlemi
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      console.log('Profil güncellendi:', user);
    }, 2000);
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { class: 'bg-warning', text: 'Beklemede' },
      processing: { class: 'bg-info', text: 'İşleniyor' },
      shipped: { class: 'bg-primary', text: 'Kargoda' },
      delivered: { class: 'bg-success', text: 'Teslim Edildi' },
      cancelled: { class: 'bg-danger', text: 'İptal Edildi' }
    };
    
    const config = statusConfig[status];
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  return (
    <div className="account-page py-5">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm border-0">
                             <div className="card-body p-4">
                 <div className="text-center mb-4">
                   <h5 className="fw-bold mb-1">{user.firstName} {user.lastName}</h5>
                   <p className="text-muted small mb-0">{user.email}</p>
                 </div>

                <nav className="nav flex-column">
                  <button
                    className={`nav-link text-start ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                    type="button"
                  >
                    <i className="bi bi-person me-2"></i>
                    Profil Bilgileri
                  </button>
                  <button
                    className={`nav-link text-start ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                    type="button"
                  >
                    <i className="bi bi-box me-2"></i>
                    Sipariş Geçmişi
                  </button>
                  <button
                    className={`nav-link text-start ${activeTab === 'address' ? 'active' : ''}`}
                    onClick={() => setActiveTab('address')}
                    type="button"
                  >
                    <i className="bi bi-geo-alt me-2"></i>
                    Adres Bilgileri
                  </button>
                  <button
                    className={`nav-link text-start ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                    type="button"
                  >
                    <i className="bi bi-shield-lock me-2"></i>
                    Güvenlik
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9" style={{ minHeight: '600px' }}>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Profil Bilgileri</h4>
                  <button
                    className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className={`bi ${isEditing ? 'bi-check' : 'bi-pencil'} me-2`}></i>
                    )}
                    {isEditing ? 'Kaydet' : 'Düzenle'}
                  </button>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ad</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Soyad</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">E-posta</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Telefon</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0">
                  <h4 className="mb-0">Sipariş Geçmişi</h4>
                </div>
                <div className="card-body p-0">
                  {orders.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-box display-1 text-muted"></i>
                      <p className="mt-3 text-muted">Henüz siparişiniz bulunmuyor.</p>
                      <Link to="/products" className="btn btn-primary">
                        Alışverişe Başla
                      </Link>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Sipariş No</th>
                            <th>Tarih</th>
                            <th>Durum</th>
                            <th>Toplam</th>
                            <th>İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td>
                                <strong>{order.id}</strong>
                              </td>
                              <td>{formatDate(order.date)}</td>
                              <td>{getStatusBadge(order.status)}</td>
                              <td>
                                <strong>{order.total.toFixed(2)} ₺</strong>
                              </td>
                              <td>
                                <Link to={`/siparis/${order.id}`} className="btn btn-sm btn-outline-primary">
                                  Detayları Gör
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Adres Bilgileri</h4>
                  <button
                    className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className={`bi ${isEditing ? 'bi-check' : 'bi-pencil'} me-2`}></i>
                    )}
                    {isEditing ? 'Kaydet' : 'Düzenle'}
                  </button>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Sokak Adresi</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.street"
                        value={user.address.street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Şehir</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.city"
                        value={user.address.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">İlçe</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.state"
                        value={user.address.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Posta Kodu</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.zipCode"
                        value={user.address.zipCode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ülke</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address.country"
                        value={user.address.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0">
                  <h4 className="mb-0">Güvenlik Ayarları</h4>
                </div>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className="bi bi-lock me-2"></i>
                            Şifre Değiştir
                          </h6>
                          <p className="card-text text-muted small">
                            Hesabınızın güvenliği için şifrenizi düzenli olarak değiştirin.
                          </p>
                          <button className="btn btn-outline-primary btn-sm">
                            Şifre Değiştir
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className="bi bi-phone me-2"></i>
                            İki Faktörlü Doğrulama
                          </h6>
                          <p className="card-text text-muted small">
                            Hesabınızı daha güvenli hale getirmek için 2FA'yı etkinleştirin.
                          </p>
                          <button className="btn btn-outline-primary btn-sm">
                            Etkinleştir
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className="bi bi-bell me-2"></i>
                            Bildirim Ayarları
                          </h6>
                          <p className="card-text text-muted small">
                            E-posta ve SMS bildirimlerini yönetin.
                          </p>
                          <button className="btn btn-outline-primary btn-sm">
                            Ayarları Düzenle
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className="bi bi-trash me-2"></i>
                            Hesabı Sil
                          </h6>
                          <p className="card-text text-muted small">
                            Hesabınızı kalıcı olarak silmek için tıklayın.
                          </p>
                          <button className="btn btn-outline-danger btn-sm">
                            Hesabı Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 