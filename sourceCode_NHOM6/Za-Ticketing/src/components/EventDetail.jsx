import { useState, useEffect } from "react";
import { Page, Header, Box, Text, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = location?.state?.eventId;

  const [event, setEvent] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) {
      setError("Không tìm thấy Event");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const eventRes = await axios.get(
          `http://localhost:3001/api/events/${eventId}`
        );
        setEvent(eventRes.data);

        const ticketRes = await axios.get(
          `http://localhost:3001/api/tickets?eventId=${eventId}`
        );
        const price = ticketRes.data?.[0]?.price_vnd || 0;
        setTicketPrice(price);
      } catch (err) {
        setError("Lỗi tải chi tiết sự kiện");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-screen">
        <Text className="text-base font-bold">
          Đang tải chi tiết sự kiện...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-screen flex-col">
        <Text className="text-base font-bold text-red-500 mb-4">{error}</Text>
        <Button onClick={() => navigate("/")}>Quay lại</Button>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box className="flex items-center justify-center h-screen flex-col">
        <Text className="text-base font-bold mb-4">Không tìm thấy sự kiện</Text>
        <Button onClick={() => navigate("/")}>Quay lại</Button>
      </Box>
    );
  }

  return (
    <Page className="bg-white">
      <Header title="Chi tiết sự kiện" back={() => navigate("/")} />
      <Box className="p-4 pt-20">
        <img
          src={event.banner_url}
          alt={event.event_name}
          className="rounded-xl shadow-xl w-full h-[300px] object-cover mb-4"
        />

        <Text.Title size="large" className="text-center mb-4">
          {event.event_name}
        </Text.Title>

        <Text className="text-base text-gray-500 mb-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />{" "}
          </svg>
          <strong>Ngày:</strong>{" "}
          {new Date(event.event_date).toLocaleDateString()}
        </Text>

        {event.event_time && (
          <Text className="text-base text-gray-500 mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />{" "}
            </svg>
            <strong>Thời gian:</strong> {event.event_time}
          </Text>
        )}

        <Text className="text-base text-gray-500 mb-2 flex items-center gap-2">
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
              d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
            />
          </svg>
          <strong>Địa điểm:</strong> {event.event_location}
        </Text>

        <Text className="text-base text-gray-500 mb-4 mt-8">
          {event.event_description}
        </Text>

        <Button
          fullWidth
          className="bg-green-500 text-white text-base"
          onClick={() =>
            navigate("/buy-ticket", { state: { eventId: event.event_id } })
          }
        >
          Mua vé ngay
        </Button>
      </Box>
    </Page>
  );
};

export default EventDetail;
