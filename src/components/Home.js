import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 740px) {
    width: 100%;
  }
`;

const WeekContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 10px 0;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: relative;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background-color: black;
`;

const Circle = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 55%;
  background-color: red;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
  order: 1;
`;

const DayNumber = styled.div`
  position: relative;
  z-index: 1;

  ${({ isCurrentDay }) =>
    isCurrentDay &&
    `
      color: white;
    `}
`;

const DayOfWeek = styled.div`
  margin-top: 5px;
  order: 3;
`;

const MonthYear = styled.div`
  margin: 10px 0;
  text-align: center;
  display: flex;
  justify-content: space-between; /* Align arrows at the edges */
  align-items: center;
  width: 100%; /* Add width to occupy entire space */
  padding: 0 10px; /* Add padding to create space around arrows */
`;

const Arrow = styled.div`
  cursor: pointer;
  color: red;
  font-weight: bold;

  margin: 10px 5%;
`;

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const renderCurrentWeek = () => {
    const currentDayIndex = (currentDate.getDay() + 6) % 7;
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - currentDayIndex);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      const dayOfWeek = daysOfWeek[i];
      const isCurrentDay =
        day.getDate() === currentDate.getDate() && day.getMonth() === currentDate.getMonth();

      weekDays.push(
        <Day key={dayOfWeek}>
          <DayOfWeek>{dayOfWeek}</DayOfWeek>
          <DayNumber isCurrentDay={isCurrentDay}>{day.getDate()}</DayNumber>
          {isCurrentDay && <Circle />}
        </Day>
      );
    }

    return weekDays;
  };

  return (
    <CalendarContainer>
      <h1 className="header">Interview calendar</h1>
      <Line />
      <WeekContainer>{renderCurrentWeek()}</WeekContainer>
      <MonthYear>
        <Arrow onClick={handlePrevWeek}>&lt;</Arrow>
        {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
          currentDate
        )}
        <Arrow onClick={handleNextWeek}>&gt;</Arrow>
      </MonthYear>
      <Line />
    </CalendarContainer>
  );
};

export default Home;