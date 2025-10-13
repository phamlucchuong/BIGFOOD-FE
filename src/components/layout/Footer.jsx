import footer_img from "../../assets/images/footer-img.png"
import facebook from "../../assets/images/facebook.png"
import instagram from "../../assets/images/instagram.png"
import youtube from "../../assets/images/youtube.png"
import qr_code from "../../assets/images/qr_code.png"


export default function Footer() {
    return (
        <div className="mt-[100px] px-[200px] pb-[50px] pt-7" style={{borderTop: '1px solid #d1d5db'}}>
            <div><span className="text-blue-500 text-5xl">beFood</span></div>

            <div className="flex justify-between font-bold text-md text-gray-700 leading-[2.5rem] mt-5 pt-7" 
                style={{borderTop: '1px solid #d1d5db'}}>
                <ul>
                    <li>Về befood</li>
                    <li>Tin tức</li>
                    <li>Đăng ký làm nhà hàng</li>
                    <li>Trở thành tài xế beFood</li>
                </ul>

                <ul>
                    <li>Hotline: 0377948504</li>
                    <li>Email: lucchuongg@gmail.com</li>
                    <li>Câu hỏi thường gặp</li>
                </ul>

                <ul>
                    <li className="text-md text-gray-800">Kết nối với chúng tôi</li>
                    <li>
                        <div className="flex gap-3 items-center">
                            <a
                                href="https://www.facebook.com/21ucchuong"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <img src={facebook} alt="Facebook" className="w-7 h-7 object-cover" />
                            </a>

                            <a
                                href="https://www.instagram.com/1ucchuong/?hl=en"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <img src={instagram} alt="Instagram" className="w-7 h-7 object-cover" />
                            </a>

                            <a
                                href="https://www.youtube.com/watch?v=NclbvXqvnyA&list=PLPt6-BtUI22oD3xfWy9VI9klNNxqAnTjb"
                                aria-label="YouTube"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <img src={youtube} alt="YouTube" className="w-7 h-7 object-cover" />
                            </a>
                        </div>
                    </li>
                </ul>


                <ul className="flex items-start gap-6">
                    <li className="w-[145px] h-[145px]">
                        <img src={qr_code} alt="qr_code" />
                    </li>
                    <li>Quét mã này để tải ứng dụng</li>
                </ul>
            </div>

            <div className="flex justify-between mt-3 pt-7 border-t border-gray-300">
                <div className="text-[13px] text-gray-500 leading-[1.2rem] mr-[100px]">
                    <h3 className="text-xl font-700 text-black mb-3">CÔNG TY CỔ PHẦN BE GROUP</h3>
                    <p>Giấy chứng nhận ĐKDN: 123456789. Cấp lần đầu 21/12/2004. Cơ quan cấp: do Sở Kế hoạch và Đầu tư Thành Phố Hà Nội.</p>
                    <p>Đăng ký thay đổi lần 9: 21/12/2025. Cơ quan cấp: Sở Kế Hoạch và Đầu tư Thành Phố Hồ Chí Minh.</p>
                    <p>Giấy phép kinh doanh vận tải bằng xe ô tô cấp lần đầu: số 1234, ngày 1/1/1111; cấp lần thứ 5: số 5678, ngày 2/2/2222 bởi Sở Giao Thông Vận Tải Thành Phố Hồ Chí Minh.</p>
                    <p>Địa chỉ trụ sở chính: Tầng 16, Tòa nhà SaiGon Tower, 29 Lê Duẩn, Phường Sài Gòn, Thành Phố Hô Chí Minh, Việt Nam.</p>
                    <p>Đại diện công ty: Ông Phạm Lục Chương. Chức vụ: Dev Java Backend.</p>
                </div>
                <div>
                    <img src={footer_img} alt="Đã đăng ký Bộ công thương" />
                </div>
            </div>
        </div>
    );
}