import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("/api/check-auth", { withCredentials: true });
        if (!res.data.loggedIn) throw new Error();
        setChecking(false);
      } catch (error) {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  return checking ? null : children;
}

export default RequireAuth;
