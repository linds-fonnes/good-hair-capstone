import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoodHairApi from "../api/api";

function StylistProfile() {
  const { email } = useParams();
  console.log("stylist profile", email);

  const [profile, setProfile] = useState(null);

  useEffect(
    function getStylistDetails() {
      async function getDetails() {
        setProfile(await GoodHairApi.getStylistProfile(email));
      }
      getDetails();
      console.log(profile);
    },
    [email]
  );

  if (!profile) return <h1>Stylist Not Found</h1>;

  return (
    <div>
      <h1>Stylist Profile</h1>
      <p>
        {profile.first_name} {profile.last_name}
      </p>
      <p>{profile.email}</p>
      <p>{profile.salon_name}</p>
      <p>{profile.street_address}</p>
      <p>
        {profile.state}, {profile.city} {profile.zipcode}
      </p>
    </div>
  );
}

export default StylistProfile;
