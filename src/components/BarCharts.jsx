import React from 'react';
import { BarChart, Bar, Tooltip } from 'recharts';

const BarCharts = ({days}) => {

    const data = days.map(day => {
        return {
            name: `${day.day}`,
            value: day.perMin
        }
    });

    return (
        <BarChart width={300} height={100} data={data}>
            <Bar dataKey='value' fill='#1890ff'/>
            <Tooltip />
        </BarChart>
    );
}

export default BarCharts;
