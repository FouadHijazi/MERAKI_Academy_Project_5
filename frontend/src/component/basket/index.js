import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProductts,
  deleteproductts,
  updateproductts,
  setProducts,
  setProductName,
} from "../../redux/reducers/products/index";
import {
  addCategoriess,
  deleteCategoriess,
  updateCategoriess,
  setCategories,
} from "../../redux/reducers/categories";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setBasket,
  updateBasket,
  deleteFromBasket,
  addToBasket,
} from "../../redux/reducers/basket/index";

const Basket = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const productsState = useSelector((state) => {
    return {
      products: state.products.products,
      productName: state.products.productName,
    };
  });
  const categoriesState = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });
  const basketState = useSelector((state) => {
    return {
      basket: state.basket.basket,
    };
  });
  const decreaseAndRemoveFromBasket = (id) => {
    axios
      .put(
        `http://localhost:5000/basket/basket/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewBasket();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewBasket = () => {
    axios
      .get(`http://localhost:5000/basket/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setProducts(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    viewBasket();
  }, []);
  return (
    <div>
      <div className="products">
        {productsState.products.map((element, index) => {
          return (
            <div key={index}>
              <div>{element.img}</div>
              <div> {element.productName}</div>
              <div> {element.description}</div>
              <div>{element.price}</div>
              <div>{element.amount}</div>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    decreaseAndRemoveFromBasket(element.id);
                  }}
                >
                  remove from basket
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Basket;
