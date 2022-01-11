import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
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
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Email </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.length ? <p>{formErrors}</p> : null}
          <button type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
