
import "./singlepage.scss"
import Slider from '../../components/Slider/Slider'
import { singlePostData, userData } from '../../lib/dummydata'
import Map from "../../components/Map/Map"
import { Link } from "react-router-dom"


const SinglePage = () => {
  return (
    <div className='singlePage'>
               <div className="details">
                <div className="wrapper">
                  <Slider images={singlePostData.images}/>
                  <div className="info">
                        <div className="top">
                               <div className="post">
                                <h1>{singlePostData.title}</h1>
                                <div className="address">
                                  <img src="/pin.png" alt="" />
                                  <span>{singlePostData.address}</span>
                                </div>
                                <div className="price">${singlePostData.price}</div>
                               </div>
                               <Link to={"/profile"} className="user">
                                  <img src={userData.img} alt="" />
                                  <span>{userData.name}</span>
                               </Link>
                        </div>
                        <div className="bottom">
                            {singlePostData.description}
                        </div>
                  </div>
                </div>
               </div>
               <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className=" listVertical">
                       <div className="feature">
                        <img src="/utility.png" alt="" />
                        <div className=" featuresText">
                               <span>Utility</span>
                               <p>Renter is responsible </p>
                        </div>
                       </div>

                       <div className="feature">
                        <img src="/pet.png" alt="" />
                        <div className=" featuresText">
                               <span>Pet Policy</span>
                               <p>Pets Allowed </p>
                        </div>
                       </div>

                       <div className="feature">
                        <img src="/fee.png" alt="" />
                        <div className=" featuresText">
                               <span>Property Fees</span>
                               <p>Most have 3x the rent in total household income </p>
                        </div>
                       </div>
                    </div>
                    <p className="title">
                      Sizes
                    </p>
                    <div className="sizes">
                    <div className="size">
                         <img src="/size.png" alt="" />
                         <span>80sqft</span>
                       </div>

                       <div className="size">
                         <img src="/bed.png" alt="" />
                         <span>2 beds</span>
                       </div>

                       <div className="size">
                         <img src="/bath.png" alt="" />
                         <span>1 bathroom</span>
                       </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className=" listHorizontal">
                    <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                {/* <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p> */}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                {/* <p>{post.postDetail.bus}m away</p> */}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                {/* <p>{post.postDetail.restaurant}m away</p> */}
              </div>
            </div>
                    </div>
                    <p className="title">Location</p>
                    <div>
                       <Map item={[singlePostData]}/>
                    </div>
                    <div className="buttons">
                        <button>
                           <img src="/chat.png" alt="" />
                           Send a Message
                        </button>
                        <button
                            // onClick={handleSave}
                            // style={{
                            //   backgroundColor: saved ? "#fece51" : "white",
                            // }}
                        >
                           <img src="/save.png" alt="" />
                           Save the Place
                        </button>
                    </div>
                </div>
               </div>
    </div>
  )
}

export default SinglePage