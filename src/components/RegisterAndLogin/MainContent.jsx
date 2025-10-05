import "react-phone-input-2/lib/style.css";
import "./MainContent.css";
export default function MainContent({ title, description, children  , onClose }) {
  return (
    <div className="overlay"
      onClick={onClose}
    >
      <section id="register-and-login"
        onClick={(e) => e.stopPropagation()} >
        <button  onClick={onClose} className="close-btn">×</button>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </section>
    </div>
  );
}
