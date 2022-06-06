import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";

//===============================================================

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    // specify which state to subscribe to (state tree => reducer => state name )
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //===============================================================

  return (
    <div className="NavBar">
      <div>
    
        <Link className="title" to="/">
        {/* <img className="titlee" src="https://i.ibb.co/Q8JkN9P/Untitled-design-removebg-preview.png" alt="Untitled-design-removebg-preview" border="0"/> */}


          Big <span className="span">Bite</span>
        </Link>
      </div>
      <div className="navv">
        {isLoggedIn ? (
          <>
            <Link className="Link" to="/basket">
              basket
            </Link>
            <button
              className="logout"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              <GrLogout className="log"/> Logout
            </button>
          </>
        ) : (
          <>
         <div className="d">
            <Link className="Link" to="/register">
              <AiOutlineUserAdd />
              Register
            </Link>
            <Link  className="Link" to="/login">
              <AiOutlineUser /> Login
            </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
