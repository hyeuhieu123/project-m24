// src/components/Footer.js
import React from "react";
import footer from "../assets/footer.png"; // Import hình ảnh background
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer
      className="bg-white 	"
      style={{
        backgroundImage: `url(${footer})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto flex items-center flex-col py-6">
        <div className="bg-opacity-50 p-4 rounded-lg w-full flex space-x-20 justify-center">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold ">STUDY4</h1>
            <p>@ 2021</p>
            <div className=" flex space-x-2">
              <FaFacebookSquare className="text-gray-600" />
              <FaInstagram className="text-gray-600" />
              <FaTwitter className="text-gray-600" />
              <FaLinkedin className="text-gray-600" />
            </div>
          </div>
          <div className="flex flex-col">
            <i className="font-bold my-2">Khoá học online</i>
            <i>IELTS General Reading</i>
            <i>IELTS General Writing</i>
            <i>Complete TOEIC</i>
            <i>IELTS Fundamentals</i>
            <i>IELTS Intensive Listening</i>
            <i>IELTS Intensive Reading</i>
            <i>IELTS Intensive Speaking</i>
          </div>
          <div className="flex flex-col">
            <i className="font-bold my-2">Tài nguyên</i>
            <i>Thư viện đề thi</i>
            <i>Blog</i>
            <i>Kho tài liệu</i>
            <i>Nhóm học tập</i>
          </div>
          <div className="flex flex-col">
            <i className="font-bold my-2">Hỗ trợ</i>
            <i>Hướng dẫn sử dụng</i>
            <i>Hướng dẫn mua hàng</i>
            <i>Phản hồi khiếu nại</i>
            <i>Chăm sóc khách hàng</i>
          </div>
          <div className="flex flex-col">
            <i className="font-bold my-2">STUDY4</i>
            <i>Về chúng tôi</i>
            <i>Liên hệ</i>
            <i>Điều khoản bảo mật</i>
            <i>Điều khoản sử dụng</i>
            <i>Điều khoản và Điều Kiện Giao Dịch</i>
          </div>
        </div>
      </div>
      <div className="px-20 m-3 flex flex-col">
        <i className="font-bold my-2 ">Thông tin doanh nghiệp </i>
        <i>Công ty TNHH Công Nghệ A Plus</i>
        <i>
          Giấy chứng nhận Đăng ký doanh nghiệp số: 0109675459 do Sở Kế hoạch và
          Đầu tư thành phố Hà Nội cấp ngày 17/06/2021.
        </i>
        <i>Điện thoại liên hệ/Hotline: 096 369 5525</i>
        <i>Email: study4.team@gmail.com.</i>
        <i>
          Địa chỉ trụ sở: Số 15, Ngõ 208 Giải Phóng, Phường Phương Liệt, Quận
          Thanh Xuân, Thành phố Hà Nội, Việt Nam
        </i>
      </div>
      <div className="mt-4 text-black flex justify-center">
        <p>@ 2021 - Bản quyền của Công ty TNHH Công Nghệ A Plus.</p>
      </div>
    </footer>
  );
};

export default Footer;
