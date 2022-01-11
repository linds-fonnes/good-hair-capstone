import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function StylistCard({
  id,
  first_name,
  last_name,
  salon_name,
  city,
  state,
  zipcode,
  email,
}) {
  const { hasFavoritedStylist, addFavorite } = useContext(UserContext);
  const [favorited, setFavorite] = useState();

  React.useEffect(
    function updateFavoritedStatus() {
      setFavorite(hasFavoritedStylist(id));
    },
    [id, hasFavoritedStylist]
  );

  async function handleFavorite(evt) {
    if (hasFavoritedStylist(id)) return;
    addFavorite(id);
    setFavorite(true);
  }

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
        <button onClick={handleFavorite} disabled={favorited}>
          {favorited ? "Favorited" : "Favorite"}
        </button>
      </div>
    </Link>
  );
}

export default StylistCard;
