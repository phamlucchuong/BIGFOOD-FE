import "@fortawesome/fontawesome-free/css/all.min.css";
import { Bike, ClipboardList, Clock, CreditCard, MapPin } from "lucide-react";

export default function Order() {
    const orderCharges = [
        { label: "Tạm tính (1 phần)", value: "25.000đ" },
        { label: "Phí áp dụng", value: "21.000đ" },
    ];

    const routeStops = [
        {
            name: "Gà Nướng Di Ba – Cơm Lam & Bánh Bao – Đinh Phong Phú",
            address: "1 Đinh Phong Phú, Phường Tăng Nhơn Phú B, Thành Phố Thủ Đức",
            note: "Nhà hàng",
        },
        {
            name: "Điểm Đón Trả – Trường Đại Học Giao Thông Vận Tải – Phân Hiệu TP. Hồ Chí Minh",
            address: "450 Lê Văn Việt, P. Tăng Nhơn Phú A, TP. Thủ Đức, Hồ Chí Minh",
            note: "Điểm giao",
        },
    ];

    return (
        <div className="min-h-screen bg-[#e8edf2] px-4 py-10">
            <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                            🍗
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                09/11/2025 • 21:56
                            </p>
                            <p className="text-xs text-gray-400">Mã đơn hàng: 62032503</p>
                            <h1 className="mt-2 text-lg font-semibold text-gray-900">
                                Gà Nướng Di Ba – Cơm Lam & Bánh Bao – Đinh Phong Phú
                            </h1>
                            <p className="text-sm text-gray-500">1 phần • 46.000đ</p>
                        </div>
                    </div>
                    <button className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Đang xác nhận
                    </button>
                </div>

                <div className="mt-6 bg-[#dce9ff] px-6 py-3 text-sm font-semibold text-slate-700">
                    Đang xác nhận đơn hàng
                </div>

                <div className="mt-6 grid gap-10 lg:grid-cols-[2fr_1.2fr]">
                    <section>
                        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white/80 p-6">
                            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=200&q=60"
                                        alt="Bánh bao sữa tươi chiên"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-1 items-center justify-between text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Bánh bao sữa tươi chiên
                                        </p>
                                        <p className="mt-1 text-gray-500">25.000đ</p>
                                    </div>
                                    <span className="text-gray-600">1x</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                <div className="flex items-center gap-2 font-medium">
                                    <ClipboardList className="h-4 w-4 text-sky-500" />
                                    Trạng thái giao hàng
                                </div>
                                <p className="mt-2 text-slate-500">
                                    Đơn hàng đang chờ nhà hàng xác nhận và chuẩn bị.
                                </p>
                            </div>
                        </div>

                    </section>

                    <section className="space-y-4 rounded-2xl border border-slate-100 bg-white/60 p-6">
                        <div className="space-y-3 text-sm text-slate-600">
                            {orderCharges.map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span>{item.label}</span>
                                    <span className="font-semibold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <div className="flex items-center justify-between font-semibold text-slate-800">
                                <span>Trả qua tiền mặt</span>
                                <span>46.000đ</span>
                            </div>
                            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                                <CreditCard className="h-4 w-4 text-sky-500" />
                                Chuẩn bị tiền mặt đủ 46.000đ.
                            </div>
                        </div>
                        <div className="mt-6 rounded-2xl border border-slate-100 bg-white/80 p-6">
                            <div className="grid gap-4 rounded-2xl bg-slate-50/80 px-6 py-4 text-sm text-slate-600 sm:grid-cols-2">
                                <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 text-center font-semibold text-slate-700">
                                    <div>1.9 km</div>
                                    <div className="text-xs font-medium text-slate-500">Quãng đường</div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 text-center font-semibold text-slate-700">
                                    <div>22:08 – 22:18</div>
                                    <div className="text-xs font-medium text-slate-500">Dự kiến giao hàng</div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-5">
                                {routeStops.map((stop, index) => (
                                    <div key={stop.name} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                                                <MapPin className="h-4 w-4" />
                                            </div>
                                            {index !== routeStops.length - 1 && (
                                                <div className="h-full w-px bg-slate-200" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800">
                                                {stop.name}
                                            </p>
                                            <p className="text-sm text-slate-500">{stop.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
