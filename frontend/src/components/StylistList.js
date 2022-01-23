import React, { useState } from "react";
import GoodHairApi from "../api/api";
import SearchForm from "./SearchForm";
import StylistCardList from "./StylistCardList";

function StylistList() {
  const [stylists, setStylists] = useState(null);

  async function search(zipcode) {
    let stylists = await GoodHairApi.getStylists(zipcode);
    setStylists(stylists);
  }

  return (
    <div>
      <SearchForm searchFor={search} />
      {stylists && stylists.length ? (
        <StylistCardList stylists={stylists} />
      ) : (
        <p>No results. Try a different zipcode</p>
      )}
    </div>
  );
}

export default StylistList;
