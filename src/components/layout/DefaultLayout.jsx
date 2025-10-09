import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LocationInput from "../common/inputs/LocationInput"
import SearchModal from "../modals/auth/SearchModal";
import AuthModalManager from "../modals/auth/AuthModalManager";


export default function DefaultLayout({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150); // scroll quá 150px thì sticky
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="main-layout">
      {/* Header/Navbar */}
      <Header isSticky={isSticky} onLoginClick={() => setShowAuthModal(true)} onToggleSearch={() => setShowSearchModal(true)} />

      {!isSticky && <LocationInput />}

      {showSearchModal && (
        <SearchModal onClose={() => { setShowSearchModal(false)}} />
      )}

      {showAuthModal && <AuthModalManager onClose={() => setShowAuthModal(false)} />}

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}