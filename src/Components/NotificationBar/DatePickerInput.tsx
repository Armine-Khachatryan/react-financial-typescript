import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'

export const DatePickerInput = () => {
    const [startDate, setStartDate] = useState(new Date("2024/02/09"));
    const [endDate, setEndDate] = useState(new Date("2024/02/12"));
    return (
      <div className='date-range'>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => date && setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => date && setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
    );
  };
