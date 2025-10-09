export default function TextButton({ name, onClick, className = '' }) {
    return (
        <div className="flex justify-center">
            <button className={`text-button ${className}`} onClick={onClick}>
                {name}
            </button>
        </div>
    );
}