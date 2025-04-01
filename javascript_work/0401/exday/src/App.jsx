import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import AddEventModal from "./AddEventModal";
import { supabase } from "./supabaseClient";
import "./Calendar.css";
import './Test';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);

  const today = dayjs();

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*");
    const grouped = {};
    data.forEach(event => {
      if (!grouped[event.date]) grouped[event.date] = [];
      grouped[event.date].push(event.title);
    });
    setEvents(grouped);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddClick = (dateStr) => {
    setSelectedDate(dateStr);
    setShowModal(true);
  };

  const handleSaveEvent = async (title) => {
    const { error } = await supabase.from("events").insert([
      { title, date: selectedDate }
    ]);
    if (!error) {
      await fetchEvents(); // 갱신
      setShowModal(false);
    }
  };

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const calendarCells = [];

  for (let i = 0; i < startDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="cell empty" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = dayjs(new Date(currentDate.year(), currentDate.month(), d));
    const dateStr = date.format("YYYY-MM-DD");
    const isToday = date.isSame(today, "day");

    calendarCells.push(
      <div
        key={d}
        className={`cell ${isToday ? "today" : ""}`}
        onClick={() => handleAddClick(dateStr)}
      >
        <div className="date-number">{d}</div>
        <ul className="event-list">
          {(events[dateStr] || []).map((evt, i) => (
            <li key={i}>{evt}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      <div className="header">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>←</button>
        <h2>{currentDate.format("YYYY년 MM월")}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>→</button>
      </div>

      <div className="days-row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-header">{day}</div>
        ))}
      </div>

      <div className="grid">{calendarCells}</div>

      <AddEventModal
        isOpen={showModal}
        selectedDate={selectedDate}
        onClose={() => setShowModal(false)}
        onSubmit={handleSaveEvent}
      />
    </div>
  );
};

export default Calendar;
