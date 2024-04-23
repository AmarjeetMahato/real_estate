import React from "react"
import Chat from "../../components/Chat/Chat"
import List from "../../components/List/List"
import "./profile.scss"
import apiRequest from "../../lib/apiRequest"
import { redirect, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/reducer"
import { userLogout } from "../../store/reducer/authReducer"

const Profile = () => {
    const naviagte = useNavigate()
     const dispatch = useDispatch()
     const CurrentUser = useSelector((state:RootState)=> state.userDetails)
     console.log(CurrentUser);
     
     if(!CurrentUser)  redirect("/")

  const logoutUser = async (e:React.MouseEvent<HTMLButtonElement>) => {
          try {
            e.preventDefault()
            const res = await apiRequest.post(`/auth/logout`)
            if(res.data){
                 console.log(`User logged out`);
                 dispatch(userLogout())
                 localStorage.removeItem('userData');
                  naviagte(`/`)
            }
          } catch (error) {
            console.log(error);
            
          }
  }





  return (
    <div className="profilePage">
        <div className="details">
              <div className="wrapper">
                    <div className="title">
                       <h1>User Information</h1>
                       <button>Update profile</button>
                    </div>

                    <div className="info">
                       <span>Avatar <img src={CurrentUser.avatar || "/noavatar.jpg"} alt="" /></span>
                       <span>Username: <b>{CurrentUser.username}</b></span>
                       <span>Email: {CurrentUser.email}</span>
                       <button onClick={logoutUser}>Logout</button>
                    </div>

                    <div className="title">
                       <h1>My List</h1>
                       <button>Create new post</button>
                    </div>
                    <List/>

                    <div className="title">
                       <h1>Saved List</h1>
                       
                    </div>

              </div>
        </div>
        <div className="chatContainer">
                 <div className="wrapper">
                       <Chat/>
                 </div>
        </div>
    </div>
  )
}

export default Profile