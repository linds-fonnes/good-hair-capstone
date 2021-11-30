import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ClientSignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    zipcode: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
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
      <form onSubmit={handleSubmit}>
        <label>Email </label>
        <input name="email" value={formData.email} onChange={handleChange} />
        <label>Password </label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>First Name </label>
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label>Last Name </label>
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
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

export default ClientSignupForm;
