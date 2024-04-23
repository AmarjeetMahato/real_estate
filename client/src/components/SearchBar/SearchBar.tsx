import React, { useState } from 'react'
import "./searchbar.scss"
import { Link } from 'react-router-dom'


const types : Array<string> = ['buy','rent']

interface queryProps {
    type:string
    city:string
    minPrice:number,
    maxPrice:number
}
const SearchBar = () => {
  const [query, setQuery] = useState<queryProps>({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });


  const switchType = (type: string) => {
    setQuery((prev) => ({ ...prev, type }));
};


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
    <div className="type">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => switchType(type)}
          className={query.type === type ? "active" : ""}
        >
          {type}
        </button>
      ))}
    </div>
    <form>
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />
      <input
        type="number"
        name="minPrice"
        min={0}
        max={10000000}
        placeholder="Min Price"
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        min={0}
        max={10000000}
        placeholder="Max Price"
        onChange={handleChange}
      />
      <Link
        to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
      >
        <button>
          <img src="/search.png" alt="" />
        </button>
      </Link>
    </form>
  </div>
  )
}

export default SearchBar