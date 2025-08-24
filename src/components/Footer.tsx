import React from 'react';
import { footerData } from '../data/footer';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer-guarantee">
                <div className="stars-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-count">(140.000+)</span>
                </div>
                <h3 className="guarantee-title">LABORATUVAR TESTLİ ÜRÜNLER</h3>
                <h4 className="guarantee-subtitle">AYNI GÜN & ÜCRETSİZ KARGO</h4>
                <h5 className="guarantee-text">MEMNUNİYET GARANTİSİ</h5>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-description">
                <p className="guarantee-description">
                  200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi seveceğinize eminiz. 
                  Eğer herhangi bir sebeple memnun kalmazsan, bizimle iletişime geçtiğinde çözüme kavuşturacağız.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-main">
        <div className="container">
          <div className="row">
            {footerData.sections.map((section) => (
              <div key={section.id} className="col-lg-4 col-md-6 mb-4">
                <div className="footer-section">
                  {section.id === 'company-info' ? (
                    <div className="footer-logo">
                      <img 
                        src="/src/assets/LOGO_Beyaz.png" 
                        alt="OJS NUTRITION" 
                        className="company-logo"
                      />
                    </div>
                  ) : (
                    <h5 className="footer-section-title">{section.title}</h5>
                  )}
                  {section.links && (
                    <ul className="footer-links">
                      {section.links.map((link) => (
                        <li key={link.id}>
                          <a href={link.url} className="footer-link">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      

      
      <div className="footer-copyright">
        <div className="container">
          <div className="text-center">
            <p>Copyright © - Tüm Hakları Saklıdır</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
