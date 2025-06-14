import { useState, useEffect } from "react";
import {
  Page,
  Input,
  Button,
  Icon,
  Radio,
  Box,
  useSnackbar,
  Text,
} from "zmp-ui";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../hooks/useAuthGuard";
import axios from "axios";
import Logo from "../static/ZaTicLogo.jpg";

axios.defaults.withCredentials = true;

function Profile() {
  useAuthGuard();
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFullName(storedUser.full_name || "");
      setPhone(storedUser.phone || "");
      setEmail(storedUser.email || "");
      setDob(storedUser.dob || "");
      setGender(storedUser.gender || "male");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      snackbar.openSnackbar({
        text: "Đăng xuất thành công!",
        type: "success",
        duration: 2000,
      });
      navigate("/login");
    } catch (err) {
      snackbar.openSnackbar({
        text: "Lỗi khi đăng xuất!",
        type: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Page className="bg-black min-h-screen text-white p-5">
      <Box className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-3 bg-green-400 flex shadow-sm">
        <Text.Title className="text-2xl font-bold text-black">
          Cá nhân
        </Text.Title>
      </Box>

      <div className="flex flex-col items-center mb-8 mt-20">
        <img
          src={Logo}
          alt="avatar"
          className="w-24 h-24 rounded-full shadow-lg"
        />
        <p className="text-sm text-center text-gray-300 mt-4 px-4">
          Cung cấp thông tin chính xác giúp bạn mua vé & xác minh dễ dàng hơn
        </p>
      </div>

      <div className="space-y-5">
        <Input
          label="Họ và tên"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        <Input
          label="Số điện thoại"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          className="bg-white text-black rounded-lg"
          clearable
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        <Input
          label="Ngày sinh"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-300">Giới tính</label>
          <Radio.Group value={gender} onChange={setGender} className="space-x-6">
            <Radio value="male" className="text-white">Nam</Radio>
            <Radio value="female" className="text-white">Nữ</Radio>
            <Radio value="other" className="text-white">Khác</Radio>
          </Radio.Group>
        </div>
      </div>

      <Button
        className="mt-10 w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-lg"
        onClick={() => navigate("/")}
      >
        Hoàn thành
      </Button>

      <Button
        className="mt-4 w-full bg-red-500 text-white font-medium rounded-full"
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </Page>
  );
}

export default Profile;
