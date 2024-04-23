import { useState } from "react";
import "./chat.scss"


const Chat = () => {
      const [chat, setChat] = useState(false);

  const handleSubmit = () => {

  }



  return (
    <div className="chat">
          <div className="messages">
             <h1>Message</h1>
             <div className="message" onClick={()=>setChat(!chat)}>
                  <img src="https://content.artofmanliness.com/uploads/2016/09/good.jpg" alt="" />
                  <span>Jhon Doe</span>
                  <p> Lorem ipsum dolor sit amet...</p>
             </div>

             <div className="message">
                  <img src="https://content.artofmanliness.com/uploads/2016/09/good.jpg" alt="" />
                  <span>Jhon Doe</span>
                  <p> Lorem ipsum dolor sit amet...</p>
             </div>

             <div className="message">
                  <img src="https://content.artofmanliness.com/uploads/2016/09/good.jpg" alt="" />
                  <span>Jhon Doe</span>
                  <p> Lorem ipsum dolor sit amet...</p>
             </div>
             <div className="message">
                  <img src="https://content.artofmanliness.com/uploads/2016/09/good.jpg" alt="" />
                  <span>Jhon Doe</span>
                  <p> Lorem ipsum dolor sit amet...</p>
             </div>
          </div>

        { chat && <div className="chatBox">
               <div className="top">
                  <div className="user">
                      <img src="https://content.artofmanliness.com/uploads/2016/09/good.jpg" alt="" />
                      Jhon Doe
                  </div>
                  <span onClick={()=>setChat(!chat)} className="close">X</span>
               </div>
               <div className="center">
                  <div className="chatMessage">
                       <p>Lorem ipsum dolor sit amet.</p>
                       <span>1 hour ago</span>
                  </div>
               </div>
               <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
          </div>}
    </div>
  )
}

export default Chat