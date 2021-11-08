import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function StylistSignupForm({ signup }) {
  const { userType } = useContext(UserContext);
  console.log("USERTYPE", userType);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    instagram_url: "",
    facebook_url: "",
    website_url: "",
    images: "",
    services: "",
    salon_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(userType, formData);
    if (result.success) {
      history.push("/stylists/search");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div>
      <form>
        <label>Email </label>
        <input name="email" value={formData.email} onChange={handleChange} />
        <label>First name </label>
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label>Last name </label>
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <label>Password </label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>Instagram Url </label>
        <input
          name="instagram_url"
          value={formData.instagram_url}
          onChange={handleChange}
        />
        <label>Facebook Url </label>
        <input
          name="facebook_url"
          value={formData.facebook_url}
          onChange={handleChange}
        />
        <label>Website Url</label>
        <input
          name="website_url"
          value={formData.website_url}
          onChange={handleChange}
        />
        <label>Images Urls </label>
        <input name="images" value={formData.images} onChange={handleChange} />
        <label>Services </label>
        <input
          name="services"
          value={formData.services}
          onChange={handleChange}
        />
        <label>Salon Name </label>
        <input
          name="salon_name"
          value={formData.salon_name}
          onChange={handleChange}
        />
        <label>Phone Number </label>
        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <label>Street Address </label>
        <input
          name="street_address"
          value={formData.street_address}
          onChange={handleChange}
        />
        <label>City </label>
        <input name="city" value={formData.city} onChange={handleChange} />
        <label>State </label>
        <input name="state" value={formData.state} onChange={handleChange} />
        <label>Zipcode </label>
        <input
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
        {formErrors.length ? <p>{formErrors}</p> : null}
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default StylistSignupForm;
