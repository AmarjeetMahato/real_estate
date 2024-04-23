import { Suspense } from 'react'
import Filter from '../../components/Filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/Card/Card'
import Map from '../../components/Map/Map';
import { Await, useLoaderData } from "react-router-dom";
import { types } from '../../vite-env';
import "./listPage.scss"

const ListPage = () => {
    const data : types[] = listData
    // const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

              {data.map((post:types) => (
                  <Card key={post.id} item={post} />
                ))
              }
        </div>
      </div>


      <div className="mapContainer">
        
         <Map item={data} />

      </div>
    </div>
  )
}

export default ListPage