import React from 'react';
import { Table } from 'antd';

const OrdersTable = ({ orders }) => {

    console.info("orders: ", orders);

    const dataSource = orders.map(order => {
        order.key = order.id;
        return order
    });

    const columns = [
        {
            title: 'Channel',
            dataIndex: 'channel',
        },
        {
            title: 'Order #',
            dataIndex: 'channel_order_id',
        },
        {
            title: 'Purchase',
            dataIndex: 'date',
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend', 'ascend'],
            render: text => {
                const date = new Date(text);
                return date.toLocaleString();
            },
        },
        {
            title: "Ship by",
            dataIndex: 'earliestShipDate',
            sorter: (a, b) => a.earliestShipDate.length - b.earliestShipDate.length,
            sortDirections: ['descend', 'ascend'],
            render: text => {
                const date = new Date(text);
                return date.toLocaleDateString();
            },
        },
        {
            title: 'Inserted',
            dataIndex: 'date_inserted',
            render: text => {
                const date = new Date(text);
                return date.toLocaleString();
            },
        },
        {
            title: 'Products',
            dataIndex: 'order_products',
            render: text => {
                if (text.length > 1) {
                    return text.map(item => {
                        return item.id
                    })
                } else {
                    return text[0].id
                }
            },
        },
    ];

    return (
        <Table 
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
        />
    );
}

export default OrdersTable;