import React, { useState } from 'react';
import { Table, Card, Row, Col, Space, Badge, Tag, Tooltip } from 'antd';
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
            render: text => (
                <Tooltip title={text}>
                    <span className="truncate">
                        { text }
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Order #',
            dataIndex: 'channel_order_id',
            render: text => (
                <Tooltip title={text}>
                    <span className="brand-color truncate">
                        {text}
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Purchase',
            dataIndex: 'date',
            sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
            sortDirections: ['descend', 'ascend'],
            render: text => {
                const title = new Date(text).toLocaleString();
                return (
                    <Tooltip title={title}>
                        <span className="truncate">
                            { title }
                        </span>
                    </Tooltip>
                )
            },
        },
        {
            title: "Ship by",
            dataIndex: 'earliestShipDate',
            sorter: (a, b) => Date.parse(a.earliestShipDate) - Date.parse(b.earliestShipDate),
            sortDirections: ['descend', 'ascend'],
            render: text => {
                const title = new Date(text).toLocaleString();
                return (
                    <Tooltip title={title}>
                        <span className="truncate">
                            { title }
                        </span>
                    </Tooltip>
                )
            },
        },
        {
            title: 'Inserted',
            dataIndex: 'date_inserted',
            render: text => {
                const title = new Date(text).toLocaleString();
                return (
                    <Tooltip title={title}>
                        <span className="truncate">
                            { title }
                        </span>
                    </Tooltip>
                )
            },
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
                    const title = text[0].channel_sku;
                    return (
                        <Tooltip title={title}>
                            <span className="truncate">
                                { title }
                            </span>
                        </Tooltip>
                    )
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
                        <Row gutter={[16, 16]}>
                            {
                                products.map(product => {
                                    return (
                                        <Col sm={24} md={8} key={product.id}>
                                            <Card className="product">
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
            onHeaderCell={column => {
                return {
                        onClick: () => {
                            console.info("column: ", column)
                        },
                    }
                }
            }
        />
    );
}

export default OrdersTable;
