import "react-phone-input-2/lib/style.css";

export default function ModalWrapper({ title, description, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay đen mờ */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose} // 👉 bấm vào nền cũng tắt popup
            />

            {/* Nội dung popup */}
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-[600px] z-10">
                <button
                    className="absolute top-[-15px] right-[-15px] bg-white w-9 h-9 rounded-[50%] text-black hover:text-gray-500 shadow"
                    onClick={onClose}
                >
                    <i className="fa-solid fa-xmark text-sm"></i>
                </button>

                <h2 className="text-2xl">{title}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
                {children}
            </div>
        </div>
    );
}
