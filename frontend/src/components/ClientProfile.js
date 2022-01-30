import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import GoodHairApi from "../api/api";
import { Link } from "react-router-dom";

function ClientProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    zipcode: "",
    email: "",
    favorite_stylists: [],
  });
  const [formErrors, setFormErrors] = useState([]);

  //going to need to make api call to get profile info and
  //set that as the form data since only email is stored in usercontext

  useEffect(() => {
    async function getProfile() {
      const userProf = await GoodHairApi.getCurrentUser(currentUser);
      setFormData({
        first_name: userProf.data.first_name,
        last_name: userProf.data.last_name,
        zipcode: userProf.data.zipcode,
        email: userProf.data.email,
        favorite_stylists: userProf.data.favorite_stylists,
      });
    }
    getProfile();
  }, [currentUser]);

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

  async function handleAccountRemoval(evt) {
    try {
      await GoodHairApi.deleteUser(formData.email);
    } catch (e) {
      setFormErrors(e);
      return;
    }
  }

  return (
    <div className="cold-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h1>Profile</h1>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Email</label>
              <p className="form-control-plaintext">{formData.email}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zipcode</label>
              <input
                className="form-control"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-block mt-4"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <button className="btn btn-danger btn-block mt-4">
        <Link to="/" onClick={handleAccountRemoval}></Link>
        Delete Account
      </button>

      {formErrors.lengths ? <p>{formErrors}</p> : null}
    </div>
  );
}

export default ClientProfile;
