import React from 'react';
import { Table } from 'antd';

const OrdersTable = ({ orders }) => {

    console.info("orders: ", orders);

    return (
        <Table className="OrdersTable"></Table>
    );
}

export default OrdersTable;