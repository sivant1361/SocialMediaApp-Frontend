import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import Loading from "../core/Loading";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      redirectToReferer: false,
    };
  }

  handleChange = (event, name) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({
            redirectToReferer: true,
            loading: false,
          });
        });
      }
    });
  };

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="mt-5" style={{ backgroundColor: "#333", padding: 40 }}>
          <h2 className="mb-5">Login</h2>
          <SocialLogin />
          <hr />
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <Loading />}
          <form>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input
                onChange={(event) => this.handleChange(event, "email")}
                style={{ color: "white" }}
                type="email"
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input
                onChange={(event) => this.handleChange(event, "password")}
                style={{ color: "white" }}
                type="password"
                className="form-control"
                value={password}
              />
            </div>
            <button
              onClick={this.handleSubmit}
              className="btn btn-raised btn-primary"
            >
              Signin
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
