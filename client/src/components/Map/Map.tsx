
import { MapContainer, TileLayer } from 'react-leaflet'
import "./map.scss"
import "leaflet/dist/leaflet.css"
import Pin from '../Pin/Pin'
import { types } from '../../vite-env'

interface MapProps {
  item: types[];
}

const Map : React.FC<MapProps>= ({item}) => {
  return (
    <MapContainer   center={
      item.length === 1
        ? [item[0].latitude, item[0].longitude]
        : [52.4797, -1.90269]
    } zoom={7} scrollWheelZoom={false}
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