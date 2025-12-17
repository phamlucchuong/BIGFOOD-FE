import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LocationInput from "../../../components/common/inputs/LocationInput";
import SearchModal from "../../../components/modals/common/SearchModal";
import AuthModalManager from "../../../components/modals/auth/AuthModalManager";
import { Outlet } from "react-router-dom";

export default function StickyLayout() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="main-layout">
      {/* Header/Navbar */}
      <Header
        isSticky={true}
        onLoginClick={() => setShowAuthModal(true)}
        onToggleSearch={() => setShowSearchModal(true)}
      />

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
