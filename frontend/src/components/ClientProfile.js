import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import GoodHairApi from "../api/api";

function ClientProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState([]);

  //going to need to make api call to get profile info and
  //set that as the form data since only email is stored in usercontext

  useEffect(() => {
    async function getProfile() {
      const userProf = await GoodHairApi.getCurrentUser(currentUser);
      setProfile(userProf.data);
    }
    getProfile();
    // setFormData({
    //   first_name: profile.first_name,
    //   last_name: profile.last_name,
    //   email: profile.email,
    //   zipcode: profile.zipcode,
    //   favorite_stylists: profile.favorite_stylists,
    // });
  }, [currentUser]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      zipcode: formData.zipcode,
      favorite_stylists: formData.favorite_stylists,
    };

    let email = formData.email;
    let updatedUser;

    try {
      updatedUser = await GoodHairApi.updateUser(email, profileData);
    } catch (error) {
      setFormErrors(error);
      return;
    }

    setFormData((f) => ({ ...f }));
    setFormErrors([]);

    setCurrentUser(updatedUser.email);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default ClientProfile;
