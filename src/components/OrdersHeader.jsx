import React from 'react';
import { Row, Col, Card } from 'antd';

const OrdersHeader = ({ channels }) => {

    return (
        <div className="OrdersHeader">
            <Row gutter={[16, 16]}>
                <Col sm={24} md={12} lg={6}>
                    <Card title="Status">

                    </Card>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <Card title={`Order Count(${7} days)`}>

                    </Card>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <Card title={`Order Amount(${7} days)`}>

                    </Card>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <Card title={`Order per Minute(${7} days)`}>

                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrdersHeader;
