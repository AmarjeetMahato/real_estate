
import { MapContainer, TileLayer } from 'react-leaflet'
import "./map.scss"
import "leaflet/dist/leaflet.css"
import Pin from '../Pin/Pin'
import { types } from '../../vite-env'

interface MapProps {
  item: types[];
}

const Map : React.FC<MapProps>= ({item}) => {
  
  const latitude = item.length > 0 ? parseFloat(item[0].latitude.toString()) : 51.5074;
  const longitude = item.length > 0 ? parseFloat(item[0].longitude.toString()) : -0.1278;


  const center: [number, number] = 
  item.length === 1
    ? [latitude, longitude]
    : [51.5074, -0.1278]; // Default to London coordinates if multiple items


  return (
    <MapContainer   center={center} zoom={7} scrollWheelZoom={false}
    className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
    />
       {item.map((item) => (
        <Pin key={item.id} item={item}/>
      ))}
  </MapContainer>
  )
}

export default Map