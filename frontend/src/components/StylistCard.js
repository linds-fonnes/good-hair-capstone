import React from "react";
import { Link } from "react-router-dom";

function StylistCard({
  first_name,
  last_name,
  salon_name,
  city,
  state,
  zipcode,
  email,
}) {
  return (
    <Link to={`/stylists/${email}`}>
      <div>
        <h1>
          {first_name} {last_name}
        </h1>
        <p>{salon_name}</p>
        <p>
          {city} {state} {zipcode}
        </p>
      </div>
    </Link>
  );
}

export default StylistCard;
