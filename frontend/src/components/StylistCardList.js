import React from "react";
import StylistCard from "./StylistCard";
import uuid from "react-uuid";

function StylistCardList({ stylists }) {
  console.debug("StylistCardList", "stylists=", stylists);

  return (
    <div>
      {stylists.map((stylist) => (
        <StylistCard
          key={uuid()}
          first_name={stylist.first_name}
          last_name={stylist.last_name}
          salon_name={stylist.salon_name}
          city={stylist.city}
          state={stylist.state}
          zipcode={stylist.zipcode}
          email={stylist.email}
        />
      ))}
    </div>
  );
}

export default StylistCardList;
