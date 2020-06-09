import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

const LineCharts = ({days, type}) => {

    const data = days.map(day => {
        return {
            name: `${day.day}`,
            value: type === "count" ? day.count : day.amount
        }
    });

    return (
        <LineChart width={300} height={100} data={data}>
            <Line type="monotone" dataKey="value" stroke="#eb2f96" strokeWidth={2} />
            <Tooltip />
        </LineChart>
    );
}

export default LineCharts;
