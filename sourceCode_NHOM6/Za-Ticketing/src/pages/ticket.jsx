import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Page,
  Text,
  Button,
  Modal,
  Header,
  Tabs,
  BottomNavigation,
  useSnackbar,
  Sheet,
} from "zmp-ui";
import axios from "axios";
import useAuthGuard from "../hooks/useAuthGuard";
axios.defaults.withCredentials = true;

function Ticket() {
  useAuthGuard();
  const snackbar = useSnackbar();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState("valid");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeBottomTab, setActiveBottomTab] = useState("ticket");
  const navigate = useNavigate();
  const [showCancelSheet, setShowCancelSheet] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/bookings", {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setErrorMessage("Không thể lấy dữ liệu vé");
    } finally {
      setLoading(false);
    }
  };

  const confirmCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setShowCancelSheet(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      // setActiveTab("cancelled");
      await axios.put(
        `http://localhost:3001/api/bookings/cancel/${bookingId}`,
        null,
        { withCredentials: true }
      );

      snackbar.openSnackbar({
        text: "Đã hủy vé",
        type: "success",
        duration: 2000,
      });

      await fetchBookings();
    } catch (err) {
      console.error(err);
      snackbar.openSnackbar({
        text: "Hủy vé không thành công",
        type: "error",
        duration: 2000,
      });
    }
  };

  const EmptyState = ({ message }) => (
    <Box className="flex flex-col items-center justify-center py-12 space-y-4">
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/no-voucher-3d-icon-download-in-png-blend-fbx-gltf-file-formats--coupon-ticket-not-available-tickets-sold-out-empty-states-pack-mobile-interface-icons-6995796.png?f=webp"
        alt="empty ticket state"
        className="w-40 h-40 object-contain"
      />
      <Text size="large" className="text-center font-medium">
        {message}
      </Text>
      <Button
        type="primary"
        className="rounded-full px-6"
        onClick={() => navigate("/")}
      >
        Mua vé ngay
      </Button>
    </Box>
  );

  const filteredBookings = bookings.filter((ticket) =>
    activeTab === "valid"
      ? ticket.status !== "cancelled"
      : ticket.status === "cancelled"
  );

  return (
    <Page className="bg-white mb-12">
      <Box className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-3 bg-green-400 flex justify-items-starts shadow-sm">
        <Text.Title className="text-2xl font-bold text-black">
          Vé của tôi
        </Text.Title>
      </Box>

      <Box className="pt-16 px-4">
        <Tabs value={activeTab} onChange={setActiveTab} className="mb-4 w-full">
          <Tabs.Tab key="valid" value="valid" label="Vé đã mua" />
          <Tabs.Tab key="cancelled" value="cancelled" label="Vé đã hủy" />
        </Tabs>

        {loading ? (
          <Text>Đang tải...</Text>
        ) : errorMessage ? (
          <Text className="text-red-500">{errorMessage}</Text>
        ) : filteredBookings.length === 0 ? (
          <EmptyState
            message={
              activeTab === "valid"
                ? "Bạn chưa mua vé nào"
                : "Bạn chưa hủy vé nào"
            }
          />
        ) : (
          filteredBookings.map((ticket) => (
            <Box
              key={ticket.booking_id}
              className="bg-white p-5 mt-6 border rounded-2xl shadow-md"
            >
              <Text.Title className="font-bold text-xl text-green-600 pb-2">
                {ticket.event_name}
              </Text.Title>

              <Box className="space-y-2 text-gray-600 text-[15px]">
                <Text className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  <strong>Ngày:</strong>{" "}
                  {new Date(ticket.event_date).toLocaleDateString()}
                </Text>
                <Text className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <strong>Địa điểm:</strong> {ticket.event_location}
                </Text>
                <Text className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                  </svg>
                  <strong>Số lượng:</strong> {ticket.quantity}
                </Text>
                <Text className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <strong>Ngày đặt:</strong>{" "}
                  {new Date(ticket.booking_date).toLocaleDateString()}
                </Text>
              </Box>

              {activeTab === "valid" ? (
                <Box className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    className="bg-gray-200 text-black rounded-full flex justify-center"
                    onClick={() => confirmCancelBooking(ticket)}
                  >
                    Hủy vé
                  </Button>
                  <Button
                    className="bg-green-500 text-white rounded-full flex justify-center"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowQR(true);
                    }}
                  >
                    Xem vé điện tử
                  </Button>
                </Box>
              ) : (
                <Text className="mt-3 text-sm text-red-500 font-semibold">
                  Đã hủy
                </Text>
              )}
            </Box>
          ))
        )}
      </Box>

      {/* modal vé QR code */}
      <Modal
        visible={showQR}
        onClose={() => {
          setShowQR(false);
          setSelectedTicket(null);
        }}
        title="Vé điện tử"
        description={selectedTicket?.event_name}
      >
        <Box className="flex flex-col items-center py-6">
          {selectedTicket && (
            <>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  JSON.stringify({
                    booking_id: selectedTicket.booking_id,
                    event_name: selectedTicket.event_name,
                    event_date: selectedTicket.event_date,
                    event_location: selectedTicket.event_location,
                  })
                )}&size=220x220`}
                alt="QR Code"
                className="rounded-xl border"
              />
              <Text className="mt-4 text-center text-sm text-gray-500">
                Quét mã để xem QR vé khi tham gia sự kiện
              </Text>
            </>
          )}
        </Box>
      </Modal>

      <BottomNavigation
        fixed
        activeKey={activeBottomTab}
        onChange={(key) => {
          setActiveBottomTab(key);
          if (key === "home") navigate("/");
          if (key === "ticket") navigate("/ticket");
          if (key === "profile") navigate("/profiles");
        }}
      >
        <BottomNavigation.Item
          key="home"
          label="Trang chủ"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          }
          activeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          }
        />
        <BottomNavigation.Item
          key="ticket"
          label="Vé của tôi"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
          }
          activeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
          }
        />
        <BottomNavigation.Item
          key="profile"
          label="Cá nhân"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          }
          activeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          }
        />
      </BottomNavigation>

      <Sheet
        visible={showCancelSheet}
        onClose={() => setShowCancelSheet(false)}
        title="Xác nhận hủy vé"
        closable
      >
        <Box className="p-4 flex flex-col">
          {bookingToCancel && (
            <Text className="text-xl text-gray-700 font-bold pb-5">
              {bookingToCancel.event_name}
            </Text>
          )}

          <p className="text-red-500 text-center font-bold text-base pb-5">
            Lưu ý: Khi đã hủy vé sẽ không thể hoàn tác.
          </p>

          <Button
            className="mb-4 text-base"
            type="danger"
            onClick={async () => {
              if (bookingToCancel) {
                await handleCancelBooking(bookingToCancel.booking_id);
                setShowCancelSheet(false);
                setBookingToCancel(null);
              }
            }}
          >
            Xác nhận hủy
          </Button>

          <Button
            className="text-base"
            type="neutral"
            variant="secondary"
            onClick={() => setShowCancelSheet(false)}
          >
            Huỷ bỏ
          </Button>
        </Box>
      </Sheet>
    </Page>
  );
}

export default Ticket;
