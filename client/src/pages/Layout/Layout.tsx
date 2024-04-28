import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import "./layout.scss";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/reducer";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const  currentUser = useSelector((state:RootState)=> state.user);
    console.log(currentUser);
    
  if (!currentUser ){
    return <Navigate to="/login" />;
  }  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout,RequireAuth };