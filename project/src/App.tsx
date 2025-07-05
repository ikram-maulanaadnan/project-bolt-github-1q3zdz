import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import AdminApp from './components/admin/AdminApp';
import LandingPage from './components/LandingPage';
import PaymentStatus from './components/PaymentStatus'; // <-- Impor komponen baru
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            {/* Rute untuk Halaman Utama */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Rute untuk Panel Admin */}
            <Route path="/admin" element={<AdminApp />} />

            {/* Rute untuk Halaman Status Pembayaran */}
            <Route path="/payment-status" element={<PaymentStatus />} />
            
            {/* Jika ada yang mengakses halaman lain, arahkan kembali ke halaman utama */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;