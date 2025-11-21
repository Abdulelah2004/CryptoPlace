import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (!historicalData || !historicalData.prices) return;

    const dataCopy = [["Date", "Prices"]];

    historicalData.prices.forEach((item) => {
      const date = new Date(item[0]).toLocaleDateString();
      const price = item[1];
      dataCopy.push([date, price]);
    });

    setData(dataCopy);
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
