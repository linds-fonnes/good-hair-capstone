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
      <h2>Find Me At: </h2>
      <p>{profile.salon_name} Salon</p>
      <p>{profile.street_address}</p>
      <p>
        {profile.state}, {profile.city} {profile.zipcode}
      </p>
      <h3>Contact Me: </h3>
      <p>{profile.email}</p>
      <p>{profile.phone_number}</p>
      <p>{profile.instagram_url}</p>
      <p>{profile.website_url}</p>
      <h4>Services Offered: </h4>
      <p>{profile.services.toString()}</p>
      <h4>Check Out My Work: </h4>
      <div>
        {profile.images.map((image) => (
          <img src={image} alt="image not available" />
        ))}
      </div>
    </div>
  );
}

export default StylistProfile;
