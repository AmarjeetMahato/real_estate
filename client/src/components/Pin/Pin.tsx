
import { Marker, Popup } from 'react-leaflet'
import { types } from '../../vite-env'
import { Link } from 'react-router-dom'
import "./pin.scss"


const Pin = ({item}:{item:types}) => {
  return (
    <Marker position={[parseFloat(item.latitude.toString()), parseFloat(item.longitude.toString())]}>
    <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
  </Marker>
  )
}

export default Pin