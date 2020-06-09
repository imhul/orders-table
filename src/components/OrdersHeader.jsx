import React from 'react';

// components
import { Tabs, Row, Col, Card, Badge, Tag, Typography } from 'antd';
import LineCharts from './LineCharts';
import BarCharts from './BarCharts';

const { TabPane } = Tabs;
const { Title } = Typography;

const OrdersHeader = ({ channels }) => {

    const onTab = key => {
        console.log(key);
    }

    return (
        <div className="OrdersHeader">
            <Tabs defaultActiveKey="1" onChange={onTab}>
                {
                    channels.map((channel, index) => {
                        const tab = channel.channel_description ?
                            `${channel.channel} ${channel.channel_description}` :
                            channel.channel;
                        const status = channel.orderByStatus;
                        const pending = status.Pending ? status.Pending : 0;
                        const canceled = status.Canceled ? status.Canceled : 0;
                        const unshipped = status.Unshipped ? status.Unshipped : 0;
                        const shipped = status.Shipped ? status.Shipped : 0;
                        const days = channel.daysDynamics;

                        const cardHeader = (
                            <Row gutter={[16, 16]}>
                                <Col span={6}>
                                    <Badge count={pending}>
                                        <Tag color="blue">
                                            PENDING
                                        </Tag>
                                    </Badge>
                                </Col>
                                <Col span={6}>
                                    <Badge count={shipped}>
                                        <Tag color="green">
                                            SHIPPED
                                        </Tag>
                                    </Badge>
                                </Col>
                                <Col span={6}>
                                    <Badge count={unshipped}>
                                        <Tag color="magenta">
                                            UNSHIPPED
                                        </Tag>
                                    </Badge>
                                </Col>
                                <Col span={6}>
                                    <Badge count={canceled}>
                                        <Tag>
                                            CANCELED
                                        </Tag>
                                    </Badge>
                                </Col>
                            </Row>
                        );

                        return (
                            <TabPane tab={tab} key={index}>
                                <Card title={cardHeader}>
                                    <Title 
                                        level={3} 
                                        style={{textAlign: 'center'}}
                                        underline={true}
                                    >
                                        {`${days.length} ${days.length > 1 ? "Days" : "Day"}`}
                                    </Title>
                                    <Row gutter={[16, 16]}>
                                        <Col sm={24} md={12} lg={8}>
                                            <Title level={4}>
                                                Order Count
                                            </Title>
                                            <LineCharts days={days} type="count" />
                                        </Col>
                                        <Col sm={24} md={12} lg={8}>
                                            <Title level={4}>
                                                Order Amount
                                            </Title>
                                            <LineCharts days={days} type="amount" />
                                        </Col>
                                        <Col sm={24} md={12} lg={8}>
                                            <Title level={4}>
                                                Order per Minute
                                            </Title>
                                            <BarCharts days={days} />
                                        </Col>
                                    </Row>
                                </Card>
                            </TabPane>
                        )
                    })
                }
            </Tabs>
        </div>
    );
}

export default OrdersHeader;
