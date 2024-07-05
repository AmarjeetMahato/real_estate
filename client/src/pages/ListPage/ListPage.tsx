
import Filter from '../../components/Filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/Card/Card'
import Map from '../../components/Map/Map';
import {  useLoaderData } from "react-router-dom";
import { Post, types } from '../../vite-env';
import "./listPage.scss"

const ListPage = () => {
    const data : types[] = listData
    // const data = useLoaderData();
      const post = useLoaderData() as Post[]

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

              {post && post?.map((post) => (
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