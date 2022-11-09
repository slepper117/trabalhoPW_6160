import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Label, Button } from "reactstrap";
import logo from "../../assets/svg/logo.svg";
import { authLogin } from "../../services/auth";
import UserContext from "../../context/user";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const { getUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await authLogin(loginData);
    } catch (err) {
      setFormError(err.response.data.message);
      return;
    }

    await getUser();
    navigate("../dashboard", { replace: true });
  }
  return (
    <div className="login-page text-center">
      <main className="form-signin">
        <Form onSubmit={login}>
          <img className="mb-4" src={logo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Faça Login</h1>

          {formError}

          <div className="form-floating">
            <Input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
            <Label htmlFor="email">Email</Label>
          </div>

          <div className="form-floating">
            <Input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
            />
            <Label htmlFor="password">Password</Label>
          </div>

          <p className="mt-3">
            Email: teste@braintech.pt
            <br />
            Password: password
          </p>

          <Button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Autenticar
          </Button>

          <p className="mt-5 mb-3 text-muted">&copy; braintech</p>
        </Form>
      </main>
    </div>
  );
};

export default Login;
