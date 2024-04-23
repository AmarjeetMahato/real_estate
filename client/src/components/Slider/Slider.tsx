
import { useState } from "react";
import "./slider.scss"

interface SliderProps {
  images: string[];
}

const Slider = ({images}:SliderProps) => {
    const [imageIndex, setImageIndex] = useState<number | null>(0)

    const changeSlide = (direction: "left" | "right") => {
      setImageIndex(prevIndex => {
        if (prevIndex === null) {
          return direction === "left" ? images.length - 1 : 0;
        } else {
          return direction === "left" ? (prevIndex === 0 ? images.length - 1 : prevIndex - 1) :
                                         (prevIndex === images.length - 1 ? 0 : prevIndex + 1);
        }
      });
    };


  return (
    <div className="slider">
    {imageIndex !== null && (
      <div className="fullSlider">
        <div className="arrow" onClick={() => changeSlide("left")}>
          <img src="/arrow.png" alt="" />
        </div>
        <div className="imgContainer">
          <img src={images[imageIndex]} alt="" />
        </div>
        <div className="arrow" onClick={() => changeSlide("right")}>
          <img src="/arrow.png" className="right" alt="" />
        </div>
        <div className="close" onClick={() => setImageIndex(null)}>
          X
        </div>
      </div>
    )}
    <div className="bigImage">
      <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
    </div>
    <div className="smallImages">
      {images.slice(1).map((image, index) => (
        <img
          src={image}
          alt=""
          key={index}
          onClick={() => setImageIndex(index + 1)}
        />
      ))}
    </div>
  </div>
  )
}

export default Slider