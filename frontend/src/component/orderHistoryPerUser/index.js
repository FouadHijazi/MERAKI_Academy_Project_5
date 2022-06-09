import { addOrder, setItems } from "../../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";

import React, { useState, useEffect } from "react";
const UserOrder = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const orderState = useSelector((state) => {
    return {
      order: state.order.order,
      items: state.order.items,
    };
  });

  const getOrders = async () => {
    await axios
      .get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        setShow(true);
        dispatch(addOrder(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
    return () => {
      dispatch(addOrder([]));
    };
  }, []);

  return (
    <div>
      <h2>user history</h2>
      <div>
        <table>
          {" "}
          <tr>
            <th>order date</th>
            <th>productName</th>
            <th>price</th>
            <th>amount</th>
          </tr>
          {orderState.order.length &&
            orderState.order.map((element, index) => {
              return (
                <>
                  {JSON.parse(element.ORDERhisory).map((elements, indexs) => {
                    return (
                      <tr key={index}>
                        <td>{element.orderdate}</td>
                        <td>{elements.productName} </td>
                        <td> {elements.price}JD</td>
                        <td> {elements.amount}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
};
export default UserOrder;
// "orderdate":
