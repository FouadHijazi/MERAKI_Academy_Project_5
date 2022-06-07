import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  addProductts,
  deleteproductts,
  updateproductts,
  setProducts,
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

const SearchResult = () => {
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
  const { products, productName } = useSelector((state) => {
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

  const getProductBySearch = () => {
    axios
      .get(`http://localhost:5000/product/search?productName=${productName}`)
      .then((result) => {
        dispatch(setProducts(result.data.result));
        console.log("hi", result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductBySearch();
  }, []);

  const addToCart = (String) => {
    axios
      .post(
        `http://localhost:5000/basket/${String}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setMessage("Added To Basket");
      })
      .catch((err) => {
        console.log("header", token);
        console.log(err);
        setMessage(err.message);
      });
  };

  return (
   
    
      <div className="producttss">
        {products.map((element, index) => {
          return (
            <div className="product" key={index}>
              <div className="pr">
                <div className="imge">
                  <img className="imgg" src={element.img} />
                </div>
                <div className="pppp">
                  <div className="t">
                    <div className="pName"> {element.productName}</div>
                    <div className="desc"> {element.description}</div>
                    <div className="price">{element.price}</div>
                  </div>
                  {isLoggedIn ? (
                    <div>
                      <button
                        className="basketButton"
                        onClick={() => {
                          addToCart(element.id);
                        }}
                      >
                        Add to basket
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
     
      <div>
        {products.length === 0 ? (
          <p>Your search didn't match any product.</p>
        ) : (
          <></>
        )}
      </div>
     </div>
  );
};

export default SearchResult;
