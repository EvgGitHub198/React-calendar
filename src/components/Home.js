import React from 'react';
import styled from 'styled-components';

const Home = () => {
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
    width: 100%;
    padding: 10px 0;
  `;

  const Day = styled.div`
    display: flex;
    flex-direction: column;
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
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `;

  const DayNumber = styled.div`
    position: relative;
    z-index: 1;
    order: 2; /* Изменяем порядок отображения */

    /* Стили для белого цвета цифры текущей даты */
    ${({ isCurrentDay }) => isCurrentDay && `
      color: white;
    `}
  `;

  const DayOfWeek = styled.div`
    order: 1; /* Изменяем порядок отображения */
  `;

  // Получение текущей даты и дней недели
  const currentDate = new Date();
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Изменяем порядок дней недели

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
      const isCurrentDay = day.getDate() === currentDate.getDate() && day.getMonth() === currentDate.getMonth();

      weekDays.push(
        <Day key={dayOfWeek}>
          {isCurrentDay && <Circle />}
          <DayOfWeek>{dayOfWeek}</DayOfWeek>
          <DayNumber isCurrentDay={isCurrentDay}>{day.getDate()}</DayNumber>
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
    </CalendarContainer>
  );
};

export default Home;
