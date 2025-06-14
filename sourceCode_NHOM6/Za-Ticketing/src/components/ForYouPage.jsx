import { useState, useEffect } from "react";
import { Page, Header, Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForYouPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3001/api/events");
        setEvents(res.data.slice(2, 10));
      } catch (err) {
        setError("Lỗi khi tải sự kiện dành cho bạn");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleClickEvent = (event) => {
    navigate("/event-detail", { state: { eventId: event.event_id } });
  };

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-screen">
        <Text className="text-base font-bold">Đang tải dữ liệu...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center h-screen flex-col">
        <Text className="text-base font-bold text-red-500 mb-4">{error}</Text>
        <Text
          onClick={() => window.location.reload()}
          className="text-blue-500 underline cursor-pointer"
        >
          Tải lại
        </Text>
      </Box>
    );
  }

  return (
    <Page className="bg-white">
      <Header title="🎁 Dành cho bạn" back={() => navigate("/")} />
      <Box className="p-4 pt-20 space-y-4">
        {events.length === 0 ? (
          <Text className="text-center text-gray-500">
            Không có sự kiện nào.
          </Text>
        ) : (
          events.map((event) => (
            <Box
              key={event.event_id}
              onClick={() => handleClickEvent(event)}
              className="flex bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] p-3 gap-3"
            >
              <img
                src={event.banner_url}
                alt={event.event_name}
                className="w-[100px] h-[100px] object-cover rounded-md flex-shrink-0"
              />
              <Box className="flex flex-col justify-between overflow-hidden w-full">
                <Text.Title
                  size="small"
                  className="font-bold line-clamp-2 text-base mb-1 leading-tight"
                >
                  {event.event_name}
                </Text.Title>
                <Text className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  {new Date(event.event_date).toLocaleDateString()}
                </Text>
                {event.event_time && (
                  <Text className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {event.event_time}
                  </Text>
                )}
                <Text className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
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
                  {event.event_location}
                </Text>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Page>
  );
};

export default ForYouPage;
