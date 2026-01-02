export default function SizeCard({ sizeName, price, isDefault, setSelectedSize }) {
  return (
    <label className="flex justify-between items-center border rounded-lg p-2 cursor-pointer">
      <div className="flex items-center">
        <input
          type="radio"
          name="size"
          value={sizeName}
          checked={isDefault}
          onChange={() => setSelectedSize(sizeName)}
          className="text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2 text-sm">{sizeName}</span>
      </div>
      <span className="text-sm text-gray-500">{price}đ</span>
    </label>
  );
}
