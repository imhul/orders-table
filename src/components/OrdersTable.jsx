import React, { useState } from 'react';
import { Table, Card, Row, Col, Space, Badge, Tag } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const OrdersTable = ({ orders }) => {

    const dataSource = orders.map(order => {
        order.key = order.id;
        return order
    });

    const [isRowExpanded, setIsRowExpanded] = useState(false);

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
            sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
            sortDirections: ['descend', 'ascend'],
            render: text => new Date(text).toLocaleString(),
        },
        {
            title: "Ship by",
            dataIndex: 'earliestShipDate',
            sorter: (a, b) => Date.parse(a.earliestShipDate) - Date.parse(b.earliestShipDate),
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
                            <Space size="middle">
                                <Badge count={text.length}>
                                    {
                                        isRowExpanded ? 
                                        <EyeInvisibleOutlined /> : 
                                        <EyeOutlined />
                                    }
                                </Badge>
                                <Tag color="magenta" >
                                    more then one
                                </Tag>
                            </Space>
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
                                                        `Product ID: ${product.id}`
                                                    }
                                                </div>
                                                <div className="product-sku">
                                                    {
                                                        `Channel SKU: ${product.channel_sku}`
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
                onExpandedRowsChange: expandedRows => setIsRowExpanded(!isRowExpanded),
            }}
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
        />
    );
}

export default OrdersTable;
