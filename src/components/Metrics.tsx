import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const data = [
  { name: "Sunday", checkIn: 50, checkOut: 20 },
  { name: "Monday", checkIn: 30, checkOut: 10 },
  { name: "Tuesday", checkIn: 20, checkOut: 40 },
  { name: "Wednesday", checkIn: 60, checkOut: 30 },
  { name: "Thursday", checkIn: 40, checkOut: 25 },
  { name: "Friday", checkIn: 50, checkOut: 10 },
  { name: "Saturday", checkIn: 45, checkOut: 15 },
];

const ChartContainer = styled.div`
  width: 400px;
  max-width: 420px;
  max-height: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 10px;
  box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StatItem = styled.div`
  font-size: 10px;
  color: #106d13;

  &.check-out {
    color: #e53935;
  }
`;

const MyBarChart: React.FC = () => {
  return (
    <ChartContainer>
      <Header>
        <Stats>
          <StatItem>Check In: 23,451</StatItem>
          <StatItem className="check-out">Check Out: 20,441</StatItem>
        </Stats>
      </Header>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="checkIn" fill="#2e7d32" name="Check In" />
          <Bar dataKey="checkOut" fill="#e53935" name="Check Out" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MyBarChart;
