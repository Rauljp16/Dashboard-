import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const CalendarWrapper = styled.div`

  .react-calendar {
    width: 100%;
    height: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: 10px;
    border: none;
    box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
    padding: 10px;


    .react-calendar__tile {
      border-radius: 6px;
      text-align: center;
      padding: 8px 6px;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #007455;
        color: white;
      }
    }

    .react-calendar__tile--active {
      background-color: #007455;
      color: white;
      border-radius: 6px;
    }

    .react-calendar__navigation {
      display: flex;
      justify-content: space-between;
      margin: 0;

      button {
        color: #007455;
        font-size: 16px;
        font-weight: bold;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
    }

    .react-calendar__month-view__weekdays {
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
    }
  }
`;

const DateSelectedText = styled.p`
  font-size: 18px;
  color: #000000;
  text-align: center;
`;

const MyCalendar: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date());

    const handleChange: CalendarProps['onChange'] = (value) => {
        if (Array.isArray(value)) {
            setDate(value[0]);
        } else {
            setDate(value);
        }
    };

    return (
        <CalendarWrapper>
            <Calendar
                onChange={handleChange}
                value={date}
            />
        </CalendarWrapper>
    );
};

export default MyCalendar;
