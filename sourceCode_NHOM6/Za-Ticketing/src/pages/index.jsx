import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Page, Text, Swiper, BottomNavigation, Input } from "zmp-ui";
import bg from "../static/solid_white.jpg";
import axios from "axios";
axios.defaults.withCredentials = true;

function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hotEvents, setHotEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (searchVal) => {
    setSearchKeyword(searchVal);
    if (!searchVal) {
      setFilteredEvents([]);
      return;
    }
    const filtered = upcomingEvents.filter((event) =>
      event.event_name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, hotRes] = await Promise.all([
          axios.get("http://localhost:3001/api/events"),
          axios.get("http://localhost:3001/api/hot-events"),
        ]);

        setUpcomingEvents(upcomingRes.data);
        setHotEvents(hotRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    navigate("/event-detail", { state: { eventId: event.event_id } });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "home") navigate("/");
    if (key === "ticket") navigate("/ticket");
    if (key === "profile") navigate("/profiles");
  };

  return (
    <Page
      className="pt-7 min-h-screen bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box p={4}>
        <Box>
          <Text
            size="large"
            className="font-bold text-4xl"
            style={{ color: "#000" }}
          >
            ZA{" "}
          </Text>
          <Text
            size="large"
            className="font-bold text-4xl"
            style={{ color: "#50dc84" }}
          >
            TICKETING
          </Text>
        </Box>
      </Box>

      {/* search bar */}
      <Box className="px-4">
        <Box className="relative flex items-center bg-white border border-gray-300 rounded-full px-4 shadow-sm">
          <span className="text-xl mr-3">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
          <Input
            placeholder="Bạn tìm gì hôm nay?"
            clearable
            className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>
      </Box>

      {searchKeyword && (
        <Box className="px-4 mt-4 flex flex-col gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Box
                key={event.event_id}
                onClick={() => handleEventClick(event)}
                className="flex items-center gap-4 p-2 bg-white dark:bg-neutral-900 rounded-lg shadow cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={event.banner_url}
                  alt={event.event_name}
                  className="w-20 h-20 object-cover rounded shrink-0"
                />
                <Box className="flex flex-col overflow-hidden">
                  <Text.Title
                    size="xSmall"
                    className="font-medium truncate max-w-[220px] sm:max-w-[300px]"
                  >
                    {event.event_name}
                  </Text.Title>
                  <Text className="text-sm text-gray-500 truncate max-w-[220px] sm:max-w-[300px] flex flex-col gap-2">
                    <p className="flex items-center gap-2">
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
                      </svg>{" "}
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
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
                      </svg>{" "}
                      {event.event_time}
                    </p>
                  </Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-2">
              Rất tiếc, không tìm thấy kết quả nào.
            </Text>
          )}
        </Box>
      )}

      {/* section sự kiện sắp diễn ra */}
      <Box className="flex flex-col gap-6 pt-2 pb-20">
        <Text.Title size="normal" className="mt-4 px-4 flex items-center gap-2">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          Sự kiện sắp diễn ra
        </Text.Title>

        <Box className="w-full px-4">
          <Swiper
            autoplay
            duration={5000}
            loop
            className="rounded-xl overflow-hidden"
          >
            {upcomingEvents.slice(0, 5).map((event) => (
              <Swiper.Slide
                key={event.event_id}
                onClick={() => handleEventClick(event)}
              >
                <img
                  src={event.banner_url}
                  alt={event.event_name}
                  className="w-full h-[200px] object-cover rounded-xl shadow-md"
                />
              </Swiper.Slide>
            ))}
          </Swiper>
        </Box>

        {/* section sự kiện xu hướng */}
        <Box className="flex items-center justify-between mt-2 px-4">
          <Text.Title className="flex items-center gap-2" size="normal">
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
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
            Sự kiện xu hướng
          </Text.Title>
          <Text
            size="small"
            className="text-green-600 font-medium cursor-pointer"
            onClick={() => navigate("/hot-events")}
          >
            Xem tất cả
          </Text>
        </Box>

        <Box className="flex overflow-x-auto gap-6 px-4 w-full">
          {hotEvents.slice(0, 5).map((event) => (
            <Box
              key={event.event_id}
              onClick={() => handleEventClick(event)}
              className="min-w-[140px] w-[260px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={event.banner_url}
                className="w-full h-[150px] object-cover"
              />
              <Box className="p-2">
                <Text.Title size="xSmall" className="px-1 truncate">
                  {event.event_name}
                </Text.Title>
                <Text className="px-1 text-base text-black-500 truncate flex gap-2 items-center">
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
                  {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="px-1 text-base text-black-500 truncate flex gap-2 items-center">
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
                  {event.event_time}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>

        {/* section sự kiện đặc biệt */}
        <Box className="flex items-center justify-between mt-2 px-4">
          <Text.Title size="normal">Dành cho bạn</Text.Title>
          <Text
            size="small"
            className="text-green-600 font-medium cursor-pointer"
            onClick={() => navigate("/for-you")}
          >
            Xem tất cả
          </Text>
        </Box>

        <Box className="flex overflow-x-auto gap-6 px-4 w-full">
          {upcomingEvents.slice(2, 10).map((event) => (
            <Box
              key={event.event_id}
              onClick={() => handleEventClick(event)}
              className="min-w-[140px] w-[260px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={event.banner_url}
                className="w-full h-[150px] object-cover"
              />
              <Box className="p-2">
                <Text.Title size="xSmall" className="px-1 truncate">
                  {event.event_name}
                </Text.Title>
                <Text className="px-1 text-base text-black-500 truncate flex gap-2 items-center">
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
                  {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="px-1 text-base text-black-500 truncate  flex gap-2 items-center">
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
                  {event.event_time}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
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
    </Page>
  );
}

export default HomePage;
