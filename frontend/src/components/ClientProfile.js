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
  }, [currentUser]);

  useEffect(() => {
    async function getFormData() {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        zipcode: profile.zipcode,
        favorite_stylists: profile.favorite_stylists,
      });
    }
    getFormData();
  }, [profile]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      zipcode: formData.zipcode.toString(),
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
      <div>
        <form>
          <div>
            <label>Email</label>
            <p>{formData.email}</p>
          </div>
          <div>
            <label>First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Zipcode</label>
            <input
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit}>Save Changes</button>
        </form>

        <div>
          <h2>Favorites</h2>
          {/* <p>{profile.favorite_stylists}</p> */}
        </div>
      </div>

      {formErrors.lengths ? <p>{formErrors}</p> : null}
    </div>
  );
}

export default ClientProfile;
