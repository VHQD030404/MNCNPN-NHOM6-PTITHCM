import React, { useState } from "react";
import { Box, Page, Header, Input, Button, Text, useSnackbar } from "zmp-ui";
import axios from "axios";
import useAuthGuard from "../hooks/useAuthGuard";

const AddEvent = () => {
  useAuthGuard();
  const snackbar = useSnackbar();
  const [form, setForm] = useState({
    event_name: "",
    event_date: "",
    event_time: "",
    event_location: "",
    event_description: "",
    banner_url: "",
    hot_level: 0,
    ticket_regular: { price: "", quantity: "" },
    ticket_vip: { price: "", quantity: "" },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTicketChange = (type, field, value) => {
    setForm({
      ...form,
      [type]: {
        ...form[type],
        [field]: value,
      },
    });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "event_name",
      "event_date",
      "event_time",
      "event_location",
      "event_description",
      "banner_url",
    ];

    for (let field of requiredFields) {
      if (!form[field]) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }
    }

    const payload = {
      event_name: form.event_name,
      event_date: form.event_date,
      event_time: form.event_time,
      event_location: form.event_location,
      event_description: form.event_description,
      banner_url: form.banner_url,
      hot_level: parseInt(form.hot_level),
      tickets: [
        {
          ticket_type: "Thường",
          price_vnd: parseInt(form.ticket_regular.price),
          quantity: parseInt(form.ticket_regular.quantity),
        },
        {
          ticket_type: "VIP",
          price_vnd: parseInt(form.ticket_vip.price),
          quantity: parseInt(form.ticket_vip.quantity),
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/events",
        payload
      );
      snackbar.openSnackbar({
        text: "Tạo sự kiện thành công",
        type: "success",
        duration: 2000,
      });
      setForm({
        event_name: "",
        event_date: "",
        event_time: "",
        event_location: "",
        event_description: "",
        banner_url: "",
        hot_level: 0,
        ticket_regular: { price: "", quantity: "" },
        ticket_vip: { price: "", quantity: "" },
      });
    } catch (err) {
      snackbar.openSnackbar({
        text: "Tạo sự kiện thất bại",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Page className="pt-16 px-4 bg-white">
      <Header title="Thêm sự kiện mới" className="bg-green-400" />
      <Box className="flex flex-col gap-4 mt-4">
        <Input
          label="Tên sự kiện"
          name="event_name"
          value={form.event_name}
          onChange={handleChange}
        />
        <Input
          label="Ngày tổ chức"
          type="date"
          name="event_date"
          value={form.event_date}
          onChange={handleChange}
        />
        <Input
          label="Giờ tổ chức"
          type="time"
          name="event_time"
          value={form.event_time}
          onChange={handleChange}
        />
        <Input
          label="Địa điểm"
          name="event_location"
          value={form.event_location}
          onChange={handleChange}
        />
        <Input
          label="Mô tả sự kiện"
          name="event_description"
          value={form.event_description}
          onChange={handleChange}
        />
        <Input
          label="Banner URL"
          name="banner_url"
          value={form.banner_url}
          onChange={handleChange}
        />
        <Input
          label="Điểm xếp hạng"
          type="text"
          name="hot_level"
          value={form.hot_level}
          onChange={handleChange}
        />

        <Text className="font-bold mt-4">Vé Thường</Text>
        <Input
          label="Giá vé thường"
          type="text"
          value={form.ticket_regular.price}
          onChange={(e) =>
            handleTicketChange("ticket_regular", "price", e.target.value)
          }
        />
        <Input
          label="Số lượng vé"
          type="text"
          value={form.ticket_regular.quantity}
          onChange={(e) =>
            handleTicketChange("ticket_regular", "quantity", e.target.value)
          }
        />

        <Text className="font-bold mt-4">Vé VIP</Text>
        <Input
          label="Giá vé VIP"
          type="text"
          value={form.ticket_vip.price}
          onChange={(e) =>
            handleTicketChange("ticket_vip", "price", e.target.value)
          }
        />
        <Input
          label="Số lượng vé"
          type="text"
          value={form.ticket_vip.quantity}
          onChange={(e) =>
            handleTicketChange("ticket_vip", "quantity", e.target.value)
          }
        />

        <Button onClick={handleSubmit} className="bg-green-400">
          Tạo sự kiện
        </Button>
      </Box>
    </Page>
  );
};

export default AddEvent;
