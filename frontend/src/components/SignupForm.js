import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ signup }) {
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
    let result = await signup(formData);
    if (result.success) {
      history.push("/companies");
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
      </form>
    </div>
  );
}

export default SignupForm;
