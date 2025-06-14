import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { useEffect, useState } from "react";

import HomePage from "../pages/index";
import Profile from "../pages/profiles";
import Ticket from "../pages/ticket";
import EventDetail from "../components/EventDetail"; 
import BuyTicketPage from "./BuyTicketPage";
import AddEvent from "./AddEvent";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import AdminPage from "../components/AdminPage";
import HotEventsPage from '../components/HotEventsPage';
import ForYouPage from '../components/ForYouPage';

const Layout = () => {
  const [theme, setTheme] = useState("light"); 

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const info = await getSystemInfo();
        if (info?.zaloTheme) {
          setTheme(info.zaloTheme);
        }
      } catch (error) {
        console.error("Error getting system info:", error);
      }
    };

    fetchSystemInfo();
  }, []);

  return (
    <App theme={theme}>
      <SnackbarProvider placement="top">
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profiles" element={<Profile />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/event-detail" element={<EventDetail />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/buy-ticket" element={<BuyTicketPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/hot-events" element={<HotEventsPage />} />
            <Route path="/for-you" element={<ForYouPage />} />

          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;
