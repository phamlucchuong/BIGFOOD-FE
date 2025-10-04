

export default function TextLabel({name, onclick}) {
    return (
        <div className="px-4 py-2 border border-gray-300 rounded-3xl cursor-pointer" onClick={onclick}>
            <span>{name}</span>
        </div>
    );
}