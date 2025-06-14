// import useAdminGuard from "../hooks/useAdminGuard";
import { useState, useEffect, use } from "react";
import { Page, Box, Spinner, Text, useSnackbar, Sheet, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
  // const { loading } = useAdminGuard();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [hotEvents, setHotEvents] = useState([]);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [hotRes] = await Promise.all([
          axios.get("http://localhost:3001/api/hot-events"),
        ]);
        setHotEvents(hotRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  // if (loading) {
  //   return (
  //     <Page className="bg-white text-black px-4">
  //       <Box className="pt-10 flex justify-center">
  //         <Spinner visible />
  //       </Box>
  //     </Page>
  //   );
  // }

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/logout",
        {},
        { withCredentials: true }
      );
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

  const handleDeleteEvent = async (selectedEventId) => {
    try {
      await axios.delete(`http://localhost:3001/api/events/${selectedEventId}`);
      snackbar.openSnackbar({
        text: "Xóa sự kiện thành công!",
        type: "success",
        duration: 2000,
      });
      setHotEvents((prev) =>
        prev.filter((e) => e.event_id !== selectedEventId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa sự kiện:", error);
      snackbar.openSnackbar({
        text: "Lỗi khi xóa sự kiện!",
        type: "error",
        duration: 2000,
      });
    } finally {
      setShowSheet(false);
      setSelectedEventId(null);
    }
  };

  return (
    <Page className="bg-white text-black px-4 pb-[100px]">
      <Box className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-3 bg-green-400 flex justify-items-starts shadow-sm">
        <Text.Title className="text-2xl font-bold text-black">
          Quản lý sự kiện
        </Text.Title>
      </Box>

      <Box className="flex flex-col gap-4 mt-20">
        <Text.Title size="normal" className="mb-4 px-2">
          Danh sách sự kiện đang có
        </Text.Title>

        {hotEvents.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            Chưa có sự kiện nào
          </Text>
        ) : (
          hotEvents.map((event) => (
            <Box
              key={event.event_id}
              className="flex items-center gap-4 bg-white rounded-xl shadow-md overflow-hidden 
              cursor-pointer hover:shadow-lg transition-shadow p-3"
            >
              <img
                src={event.banner_url}
                alt={event.event_name}
                className="w-[100px] h-[80px] object-cover rounded-lg flex-shrink-0"
              />
              <Box className="flex flex-col flex-1 min-w-0">
                <Text.Title
                  size="small"
                  className="truncate font-semibold text-black"
                >
                  {event.event_name}
                </Text.Title>
                <Text className="text-gray-500 text-sm mt-1 truncate flex items-center gap-2">
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
                  {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="text-gray-500 text-sm truncate flex items-center gap-2">
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
                  {event.event_time}
                </Text>
              </Box>
              <button
                onClick={() => {
                  setSelectedEventId(event.event_id);
                  setShowSheet(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-md"
              >
                Xóa
              </button>
            </Box>
          ))
        )}
      </Box>

      <Box className="fixed bottom-4 left-0 right-0 px-4 flex justify-center gap-4 z-50">
        <button
          onClick={() => navigate("/add-event")}
          className="w-[200px] bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition"
        >
          Thêm sự kiện
        </button>

        <button
          onClick={handleLogout}
          className="w-[200px] bg-red-500 hover:bg-red-600 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition"
        >
          Đăng xuất
        </button>
      </Box>

      <Sheet
        visible={showSheet}
        onClose={() => setShowSheet(false)}
        title="Xác nhận xóa sự kiện"
      >
        <Box className="flex flex-col gap-4 mt-4">
          <Box className="flex flex-col justify-center items-center mb-10">
            <Text.Title className="text-center mb-6">
              Bạn có chắc chắn muốn xóa sự kiện này?
            </Text.Title>
            <p className="text-red-500 font-semibold text-base">
              Lưu ý: Khi đã xóa sẽ không thể hoàn tác.
            </p>
          </Box>

          <Button
            className="text-base mx-2"
            type="danger"
            onClick={() => handleDeleteEvent(selectedEventId)}
          >
            Xóa
          </Button>
          <Button
            className="text-base mx-2"
            type="neutral"
            variant="secondary"
            onClick={() => setShowSheet(false)}
          >
            Hủy
          </Button>
        </Box>
      </Sheet>
    </Page>
  );
}
