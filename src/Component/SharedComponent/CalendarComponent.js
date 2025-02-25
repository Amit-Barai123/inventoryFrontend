

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ consumptionDays, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    // Adjust date to local timezone
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    setSelectedDate(localDate);

    if (onDateSelect) {
      onDateSelect(localDate);
      console.log(`The selected date in the React component: ${localDate.toISOString().split('T')[0]}`);
    }
  };

  // Mark selected dates
  const getTileClassName = ({ date }) => {
    // Convert date to local YYYY-MM-DD format
    const formattedDate = date.toLocaleDateString("en-CA"); // 'YYYY-MM-DD' format
    return consumptionDays?.some(
      (day) => formattedDate === day.date.split("T")[0]
    )
      ? "highlight"
      : "";
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={getTileClassName}
      />
    </div>
  );
};

export default CalendarComponent;
