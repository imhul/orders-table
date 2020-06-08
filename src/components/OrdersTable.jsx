import React, { useState } from 'react';
import { Table, Card, Row, Col } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const OrdersTable = ({ orders }) => {

    const dataSource = orders.map(order => {
        order.key = order.id;
        return order
    });

    const [expandedRow, setExpandedRow] = useState(false);

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
            render: text => new Date(text).toLocaleString(),
        },
        {
            title: "Ship by",
            dataIndex: 'earliestShipDate',
            sorter: (a, b) => a.earliestShipDate.length - b.earliestShipDate.length,
            sortDirections: ['descend', 'ascend'],
            render: text => new Date(text).toDateString().toLocaleString(),
        },
        {
            title: 'Inserted',
            dataIndex: 'date_inserted',
            render: text => new Date(text).toLocaleString(),
        },
        {
            title: 'Products',
            dataIndex: 'order_products',
            render: text => {
                if (text.length > 1) {
                    return (
                        <div className="expand-icon">
                            {
                                expandedRow ? 
                                <EyeInvisibleOutlined /> : 
                                <EyeOutlined />
                            }
                        </div>
                    )
                } else {
                    return text[0].channel_sku
                }
            },
        },
    ];

    return (
        <Table 
            expandable={{
                expandIcon: ({expanded, onExpand, record}) => {
                    const isHaveToExpand = record.order_products.length > 1;
                    const icon = expanded ? 
                        <EyeInvisibleOutlined onClick={e => {
                            setExpandedRow(false);
                            return onExpand(record, e)
                        }} /> : 
                        <EyeOutlined onClick={e => {
                            setExpandedRow(true);
                            return onExpand(record, e);
                        }} />; 
                    return isHaveToExpand ? icon : null
                },
                expandedRowRender: record => {
                    const products = record.order_products;
                    return (
                        <Row gutter={16}>
                            {
                                products.map(product => {
                                    return (
                                        <Col span={8}>
                                            <Card className="product" key={product.id}>
                                                <div className="product-id">
                                                    {
                                                        product.id
                                                    }
                                                </div>
                                                <div className="product-sku">
                                                    {
                                                        product.channel_sku
                                                    }
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                },
                rowExpandable: record => record.order_products.length > 1,
                expandRowByClick: true,
            }}
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
        />
    );
}

export default OrdersTable;
