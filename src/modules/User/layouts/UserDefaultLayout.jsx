import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LocationInput from "../../../components/common/inputs/LocationInput";
import SearchModal from "../../../components/modals/common/SearchModal";
import AuthModalManager from "../../../components/modals/auth/AuthModalManager";
import { Outlet } from "react-router-dom";

export default function UserDefaultLayout() {
  const [isSticky, setIsSticky] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const throttleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (throttleRef.current) return;
      
      throttleRef.current = true;
      requestAnimationFrame(() => {
        setIsSticky(window.scrollY > 100);
        throttleRef.current = false;
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="main-layout">
      {/* Header/Navbar */}
      <Header
        isSticky={isSticky}
        onLoginClick={() => setShowAuthModal(true)}
        onToggleSearch={() => setShowSearchModal(true)}
      />

      <div 
        className="location-input-wrapper mb-48"
        style={{
          maxHeight: isSticky ? '0' : '180px',
          opacity: isSticky ? 0 : 1,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <LocationInput />
      </div>

      {showSearchModal && (
        <SearchModal
          onClose={() => {
            setShowSearchModal(false);
          }}
        />
      )}

      {showAuthModal && (
        <AuthModalManager onClose={() => setShowAuthModal(false)} />
      )}

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
