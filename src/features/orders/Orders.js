import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncOrders,
  canceledOrder,
  deliveredOrder,
  orderInProgress,
  ordersSelector,
} from "./ordersSlice";
import {
  Dropdown,
  Button,
  Popover,
  OverlayTrigger,
  Card,
  Container,
  Row,
  Col,
  Accordion,
  NavLink,
} from "react-bootstrap";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector.selectAll);
  console.log(orders);

  const popover = (order) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">are you sure?</Popover.Title>
      <Popover.Content>
        <Button
          variant="outline-danger"
          onClick={() => {
            dispatch(canceledOrder(order._id));
          }}
        >
          YES
        </Button>
      </Popover.Content>
    </Popover>
  );

  const mapOrders = (orders = []) => {
    if (orders.length) return mapping(orders);
    else return <p>no orders</p>;
  };

  const mapLocation = (long = 0, lat = 0) => {
    return `https://www.google.com/maps/dir//${lat},${long}/@${lat},${long},17z`;
  };

  const mapping = (orders = []) =>
    orders.map((order, index) => {
      return (
        <Col className="justify-content-center d-flex ">
          <Card style={{ width: "20rem" }} key={index}>
            <Card.Body>
              <Card.Title>name : {order.customer.username}</Card.Title>
              <Card.Text>
                <h5>status : {order.status}</h5>

                <p>timePlaced : {order.timePlaced}</p>
                {order.timeScheduled && (
                  <p>timeScheduled : {order.timeScheduled}</p>
                )}
                {order.address?.address && (
                  <p>address : {order.address?.address}</p>
                )}
                {order.address?.longitude && (
                  <p>
                    location : (
                    <a
                      href={mapLocation(
                        order.address?.longitude,
                        order.address?.latitude
                      )}
                    >
                      click here
                    </a>
                    )
                  </p>
                )}
                {order.timeDelivered && (
                  <p>timeDelivered : {order.timeDelivered}</p>
                )}
                {order.instruction && <p>instruction : {order.instruction}</p>}
                {order.isPaid ? <p>is paid</p> : <p> is not paid</p>}
              </Card.Text>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  order status
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => dispatch(orderInProgress(order._id))}
                  >
                    in progress
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(deliveredOrder(order._id))}
                  >
                    delivered
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={popover(order)}
              >
                <Button variant="outline-danger">Cancel order</Button>
              </OverlayTrigger>
            </Card.Body>
          </Card>
        </Col>
      );
    });

  return (
    <Accordion defaultActiveKey="0">
      <Button onClick={() => dispatch(asyncOrders())}>refresh</Button>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Current Orders
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Row className="justify-content-center" xs={1} md={2} lg={3} xl={4}>
              {mapOrders(orders)}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
