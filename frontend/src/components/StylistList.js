import React, { useState } from "react";
import GoodHairApi from "../api/api";
import SearchForm from "./SearchForm";
import StylistCard from "./StylistCard";

function StylistList() {
  const [stylists, setStylists] = useState(null);

  async function search(zipcode) {
    let stylists = await GoodHairApi.getStylists(zipcode);
    setStylists(stylists);
  }

  return (
    <div>
      <SearchForm searchFor={search} />
      {stylists.length ? (
        <div>
          {stylists.map((stylist) => (
            <StylistCard />
          ))}
        </div>
      ) : (
        <p>No results. Try a different zipcode</p>
      )}
    </div>
  );
}

export default StylistList;
