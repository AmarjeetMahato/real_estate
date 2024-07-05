
import { useLoaderData } from "react-router-dom"
import "./singlepage.scss"
import { singlePostData } from "../../lib/dummydata";
import Map from "../../components/Map/Map";
import { Post } from "../../vite-env";
import Slider from "../../components/Slider/Slider";
import {Link} from "react-router-dom"
import DOMPurify from "dompurify";

const SinglePage = () => {
       
    const post  = useLoaderData() as Post
    console.log(post);
    
      console.log(post?.postDetail);

    
  return (
    <div className='singlePage'>
               <div  className="details">
                <div className="wrapper">
                  <Slider images={post?.images}/>
                  <div className="info">
                        <div className="top">
                               <div className="post">
                                <h1>{post?.title}</h1>
                                <div className="address">
                                  <img src="/pin.png" alt="" />
                                  <span>{post?.address}</span>
                                </div>
                                <div className="price">${singlePostData.price}</div>
                               </div>
                               <Link to={"/profile"} className="user">
                                  <img src={post?.user?.avatar} alt="" />
                                  <span>{post?.user?.username}</span>
                               </Link>
                        </div>
                        <div style={{marginBottom:10}} className="bottom"  dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post?.postDetail.desc)}} />
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
                               <p>{post?.postDetail?.utilities}</p>
                        </div>
                       </div>

                       <div className="feature">
                        <img src="/pet.png" alt="" />
                        <div className=" featuresText">
                               <span>Pet Policy</span>
                               <p>{post?.postDetail?.pet}</p>
                        </div>
                       </div>

                       <div className="feature">
                        <img src="/fee.png" alt="" />
                        <div className=" featuresText">
                               <span>Property Fees</span>
                               <p>{post?.postDetail?.income}</p>
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
                         <span>{post?.bathroom}</span>
                       </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className=" listHorizontal">
                    <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post?.postDetail.school > 999
                    ? post?.postDetail.school / 1000 + "km"
                    : post?.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post?.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post?.postDetail.restaurant}m away</p>
              </div>
            </div>
                    </div>
                    <p className="title">Location</p>
                    <div>
                       <Map item={[post]}/>
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