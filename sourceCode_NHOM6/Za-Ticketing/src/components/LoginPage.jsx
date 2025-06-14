import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Input, Button, Text, Spinner, Box, useSnackbar } from "zmp-ui";
import axios from "axios";
import logo from "../static/ZaTicLogo.jpg";

// đảm bảo axios luôn gửi cookie auth
axios.defaults.withCredentials = true;

export default function LoginPage() {
  const snackbar = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      if (res.data && res.data.user) {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          snackbar.openSnackbar({
            text: "Chào mừng admin",
            type: "success",
            duration: 3000,
          });
          navigate("/admin");
        } else {
          snackbar.openSnackbar({
            text: "Đăng nhập thành công",
            type: "success",
            duration: 3000,
          });
          navigate("/");
        }
      } else {
        snackbar.openSnackbar({
          text: "Đăng nhập không thành công",
          type: "error",
          duration: 2000,
        });
      }
    } catch (err) {
      snackbar.openSnackbar({
        text: "Sai thông tin đăng nhập",
        type: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="bg-black text-white px-0">
      <Box className="w-full bg-green-500 text-black h-16 flex items-end px-4 pb-2">
        <span className="text-base font-bold">Đăng nhập</span>
      </Box>
      <div className="max-w-sm mx-auto px-6 pt-10">
        <Box className="mb-8 text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-auto mx-auto my-4 rounded-xl shadow-lg"
          />
        </Box>
        <div className="space-y-4">
          <Input
            type="email"
            label=" "
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label=" "
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {errMsg && <Text className="text-red-500">{errMsg}</Text>} */}

          <Button
            onClick={handleLogin}
            className="bg-green-500 w-full text-white rounded-full"
          >
            {loading ? <Spinner color="white" size="sm" /> : "Đăng nhập"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/register")}
            className="w-full rounded-full"
          >
            Chưa có tài khoản? Đăng ký
          </Button>

          <Button
            variant="tertiary"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    </Page>
  );
}
