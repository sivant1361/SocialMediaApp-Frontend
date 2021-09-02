import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
    };
  }

  handleChange = (event, name) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    console.log(user);
    signup(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true,
        });
        console.log(this.state);
      }
    });
  };

  signupForm = () => {
    const { name, email, password } = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={(event) => this.handleChange(event, "name")}
            style={{ color: "white" }}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
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
          Signup
        </button>
      </form>
    );
  };

  render() {
    const { error, open } = this.state;
    return (
      <div className="container">
        <div className="mt-5" style={{ backgroundColor: "#333", padding: 40 }}>
          <h2 className=" mb-5">Signup</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {open && (
            <div className="alert alert-info">
              New account successfully created. Please{" "}
              <Link to="/signin">Sign In</Link>
            </div>
          )}
          {this.signupForm()}
        </div>
      </div>
    );
  }
}

export default Signup;
