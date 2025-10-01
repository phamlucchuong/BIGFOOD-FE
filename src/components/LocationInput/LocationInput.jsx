
export default function LocationInput({ insideHeader }) {
  return (
    <div
      className={`transition-all duration-300 ml-[250px] ${
        insideHeader
          ? "w-full"
          : "mt-10"
      }`}
    >
      <input
        type="text"
        placeholder="Nhập địa chỉ của bạn"
        className="border border-gray-700 rounded-lg px-5 py-3 w-[450px] focus:outline outline-blue-500"
      />
    </div>
  );
}
