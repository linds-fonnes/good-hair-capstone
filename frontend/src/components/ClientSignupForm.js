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
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h1>Register</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email </label>
              <input
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password </label>
              <input
                className="form-control"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>First Name </label>
              <input
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name </label>
              <input
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zipcode </label>
              <input
                className="form-control"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </div>
            {formErrors.length ? <p>{formErrors}</p> : null}
            <button
              className="btn btn-primary float-right"
              type="submit"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientSignupForm;
