import "./prifilepageupdate.scss"
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { userUpdate } from "../../store/reducer/authReducer";
import UploadWidget from "../../components/uploadWidget/UploadWidget";




const ProfileUpdatePage = () => {
  const currentUser = useSelector((state:RootState)=> state.user)

  console.log(currentUser.avatar);
  
   const dispatch = useDispatch()
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       const formData = new FormData(e.currentTarget); 
       const { username, email, password, } = Object.fromEntries(formData);
         // Append avatar data to formData if it exists
  if (avatar.length > 0) {
    formData.append('avatar', avatar[0]);
  }

       try {
        const res = await apiRequest.put(`/users/update_user/${currentUser.id}`,{
            username, email, password, avatar
        })
        console.log(res.data);
        
        if(res?.data){
          navigate("/profile");
           dispatch(userUpdate(res.data.updateUser))
        }
       } catch (error:unknown) {
          console.log(error);
           setError(error)
       }
  }

  
  return (
    <div className="profileUpdatePage">
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
        <div className="item">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={currentUser.username}
          />
        </div>
        <div className="item">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={currentUser.email}
          />
        </div>
        <div className="item">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="********" />

        </div>
        <button>Update</button>
        {error && <span>error</span>}
      </form>
    </div>
    <div className="sideContainer">
    <img src={currentUser?.avatar ? currentUser?.avatar : "/noavatar.jpg"} alt="" className="avatar" />
      <UploadWidget
        uwConfig={{
          cloudName: "dowwqooed",
          uploadPreset: "estate",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatars",
        }}
        setAvatar={setAvatar}
      />
    </div>
  </div>
  )
}

export default ProfileUpdatePage