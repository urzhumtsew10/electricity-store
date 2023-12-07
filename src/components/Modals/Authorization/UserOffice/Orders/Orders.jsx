import { useEffect, useState } from "react";
import "../Orders/Orders.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { OrderCard } from "./OrderCard";
import { setOrders } from "../../../../../store/orders";

export const Orders = () => {
  const REST_API = useSelector((state) => state.modals.api);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const [yourOrders, setYourOrders] = useState([]);

  useEffect(() => {
    axios.get(`${REST_API}/orders`).then((res) => {
      dispatch(setOrders({ value: res.data }));
    });
  }, []);

  useEffect(() => {
    const yourOrders = orders.filter(
      (order) => order.userEmail === userData?.email
    );
    setYourOrders(yourOrders);
  }, [orders]);

  return (
    <div className="userOffice__content userOffice__ordersContent">
      <h2 className="ordersContent__title">Orders history</h2>
      <div className="ordersContent__orders">
        {orders &&
          yourOrders.map((order) => (
            <OrderCard
              key={order._id}
              id={order._id}
              total={order.total}
              date={order.date}
              address={order.address}
            />
          ))}
      </div>
    </div>
  );
};
