import React from 'react';
import { Layout, Space } from 'antd';

// components
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';

// mocked data
import { data } from '../data';

const { Content } = Layout;

const Output = () => {

    const { adminDashbord: { channels, orders, wh, comment }} = data;

    return (
        <Layout className="Output">
            <Content>
                <Space direction="vertical">
                    <OrdersHeader channels={channels} />
                    <OrdersTable orders={orders} />
                </Space>
            </Content>
        </Layout>
    );
}

export default Output;
