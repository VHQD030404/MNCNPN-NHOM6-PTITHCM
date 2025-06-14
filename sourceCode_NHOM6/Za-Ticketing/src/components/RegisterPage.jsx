import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Input, Button, Radio, Header, Box, useSnackbar } from "zmp-ui";
import axios from "axios";
import logo from "../static/ZaTicLogo.jpg";

export default function RegisterPage() {
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    fullName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
    dob: false,
  });

  const handleRegister = async () => {
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/; 
    const isGmail = email.endsWith("@gmail.com");

    const newErrors = {
      fullName: !fullName,
      phone: !phone || !phoneRegex.test(phone),
      email: !email || !isGmail,
      password: !password || password.length < 6,
      confirmPassword: confirmPassword !== password,
      dob: !dob,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      if (newErrors.fullName || newErrors.dob) {
        snackbar.openSnackbar({
          text: "Vui lòng điền đầy đủ thông tin!",
          type: "error",
          duration: 2000,
        });
      } else if (newErrors.email) {
        snackbar.openSnackbar({
          text: "Email phải là địa chỉ Gmail hợp lệ!",
          type: "error",
          duration: 2000,
        });
      } else if (newErrors.phone) {
        snackbar.openSnackbar({
          text: "Số điện thoại không hợp lệ!",
          type: "error",
          duration: 2000,
        });
      } else if (newErrors.password) {
        snackbar.openSnackbar({
          text: "Mật khẩu phải có ít nhất 6 ký tự!",
          type: "error",
          duration: 2000,
        });
      } else if (newErrors.confirmPassword) {
        snackbar.openSnackbar({
          text: "Mật khẩu xác nhận không khớp!",
          type: "error",
          duration: 2000,
        });
      }
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/register", {
        full_name: fullName,
        phone,
        email,
        password,
        gender,
        dob,
      });

      snackbar.openSnackbar({
        text: "Đăng ký thành công!",
        type: "success",
        duration: 2000,
      });

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        snackbar.openSnackbar({
          text: "Tên người dùng hoặc email đã tồn tại!",
          type: "error",
          duration: 2000,
        });
        setErrors((prev) => ({ ...prev, email: true, fullName: true }));
      } else {
        snackbar.openSnackbar({
          text: "Đăng ký không thành công!",
          type: "error",
          duration: 2000,
        });
      }
    }
  };

  return (
    <Page className="p-6 bg-black text-white">
      <Header title="Đăng ký" className="bg-green-500" />
      <Box className="mt-16">
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-auto mx-auto my-4 rounded-xl shadow-lg"
        />
      </Box>
      <div className="space-y-4">
        <Input
          placeholder="Nhập họ tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={errors.fullName ? "border border-red-500 rounded-md" : ""}
        />
        <Input
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? "border border-red-500 rounded-md" : ""}
        />
        <Input
          type="email"
          placeholder="Nhập địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "border border-red-500 rounded-md" : ""}
        />
        <Input
          type="password"
          placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "border border-red-500 rounded-md" : ""}
        />
        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={
            errors.confirmPassword ? "border border-red-500 rounded-md" : ""
          }
        />
        <Input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={errors.dob ? "border border-red-500 rounded-md" : ""}
        />
        <Radio.Group value={gender} onChange={setGender}>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
          <Radio value="other">Khác</Radio>
        </Radio.Group>
        <Button
          onClick={handleRegister}
          className="bg-green-500 w-full text-white rounded-full"
        >
          Đăng ký
        </Button>
      </div>
    </Page>
  );
}
