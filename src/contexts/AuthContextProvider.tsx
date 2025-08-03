import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  sendVerificationEmail: (email: string) => Promise<{ success: boolean; message: string }>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Kullanıcı verisi parse edilemedi:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simüle edilmiş API çağrısı - gerçek uygulamada backend'e istek atılacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test kullanıcısı (gerçek uygulamada backend'den gelecek)
      if (email === 'test@example.com' && password === '123456') {
        const userData: User = {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'Kullanıcı',
          phone: '+90 555 123 4567',
          isEmailVerified: true
        };
        
        const token = 'mock-jwt-token-' + Date.now();
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        return { success: true, message: 'Giriş başarılı!' };
      } else {
        return { success: false, message: 'E-posta veya şifre hatalı!' };
      }
    } catch {
      return { success: false, message: 'Giriş yapılırken bir hata oluştu!' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Şifre kontrolü
      if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Şifreler eşleşmiyor!' };
      }
      
      // E-posta format kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return { success: false, message: 'Geçerli bir e-posta adresi giriniz!' };
      }
      
      // Şifre güvenlik kontrolü
      if (userData.password.length < 6) {
        return { success: false, message: 'Şifre en az 6 karakter olmalıdır!' };
      }
      
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // E-posta doğrulama kodu gönderimi simülasyonu
      console.log(`${userData.email} adresine doğrulama kodu gönderildi`);
      
      return { 
        success: true, 
        message: 'Kayıt başarılı! E-posta adresinize doğrulama kodu gönderildi.' 
      };
    } catch {
      return { success: false, message: 'Kayıt yapılırken bir hata oluştu!' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simüle edilmiş e-posta doğrulama
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test token'ı (gerçek uygulamada backend'den gelecek)
      if (token === 'test-verification-token' || token.length > 10) {
        if (user) {
          const updatedUser = { ...user, isEmailVerified: true };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        return { 
          success: true, 
          message: 'E-posta adresiniz başarıyla doğrulandı!' 
        };
      } else {
        return { 
          success: false, 
          message: 'Geçersiz doğrulama kodu!' 
        };
      }
    } catch {
      return { 
        success: false, 
        message: 'Doğrulama işlemi sırasında bir hata oluştu!' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simüle edilmiş e-posta gönderimi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`${email} adresine doğrulama kodu gönderildi`);
      
      return { 
        success: true, 
        message: 'Doğrulama kodu e-posta adresinize gönderildi!' 
      };
    } catch {
      return { 
        success: false, 
        message: 'E-posta gönderilirken bir hata oluştu!' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    verifyEmail,
    sendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 