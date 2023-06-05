import React from 'react';
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
  justify-content: space-around;
  align-items: center;
  width: 100%;
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
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 55%; /* Изменяем положение кружка */
    left: 50%;
    transform: translateX(-50%);
    order: 1; /* Добавляем порядок отображения */
  
`;

const DayNumber = styled.div`
  position: relative;
  z-index: 1;



  /* Стили для белого цвета цифры текущей даты */
  ${({ isCurrentDay }) =>
    isCurrentDay &&
    `
      color: white;
    `}
`;

const DayOfWeek = styled.div`
  margin-top: 5px;
  order: 3; /* Изменяем порядок отображения */
`;

const Home = () => {
  // Получение текущей даты и дней недели
  const currentDate = new Date();
  const daysOfWeek = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']; // Изменяем порядок дней недели

  // Функция для отображения текущей недели
  const renderCurrentWeek = () => {
    const currentDayIndex = (currentDate.getDay() + 6) % 7; // Исправляем индекс текущего дня недели
    const startOfWeek = new Date(currentDate); // Начало текущей недели
    startOfWeek.setDate(startOfWeek.getDate() - currentDayIndex); // Установка начальной даты недели

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
      <h1>Interview calendar</h1>
      <Line />
      <WeekContainer>{renderCurrentWeek()}</WeekContainer>
      <Line />
    </CalendarContainer>
  );
};

export default Home;
