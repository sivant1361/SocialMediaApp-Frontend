import React, { Component } from "react";
import { getUser, update, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import DefaultImage from "../images/avatar.png";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      redirectToProfile: false,
      redirectToUsers: false,
      id: "",
      name: "",
      email: "",
      password: "",
      error: "",
      about: "",
      loading: false,
      fileSize: 0,
    };
  }

  init = (userId) => {
    if (userId !== isAuthenticated().user._id) {
      this.setState({ redirectToUsers: true });
    }
    this.setState({ loading: true });
    getUser(userId, isAuthenticated().token)
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToUsers: true });
        } else {
          this.setState({
            id: data._id,
            name: data.name,
            email: data.email,
            loading: false,
            about: data.about ? data.about : "",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    if (fileSize > 200000) {
      this.setState({ error: "File size should be lesser than 200kb" });
      return false;
    }
    if (email.length === 0) {
      this.setState({ error: "Email is required" });
      return false;
    }
    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false,
      });
      return false;
    }
    return true;
  };

  handleChange = (event, name) => {
    this.setState({ error: false });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { name, email, password } = this.state;
    if (this.isValid(name, email, password)) {
      // const user = { name, email, password: password || undefined };
      // console.log(user);

      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      console.log(this.userData);
      update(userId, token, this.userData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true,
            });
          });
        }
      });
    } else {
      this.setState({ loading: false });
    }
  };

  editForm = ({ name, email, password, about }) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Profile Photo</label>
          <input
            onChange={(event) => this.handleChange(event, "photo")}
            className="form-control"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={(event) => this.handleChange(event, "name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">About</label>
          <input
            onChange={(event) => this.handleChange(event, "about")}
            type="text"
            className="form-control"
            value={about}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={(event) => this.handleChange(event, "email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={(event) => this.handleChange(event, "password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button
          onClick={this.handleSubmit}
          className="btn btn-raised btn-primary"
        >
          Update
        </button>
      </form>
    );
  };

  render() {
    const {
      id,
      name,
      email,
      password,
      error,
      loading,
      about,
      redirectToProfile,
      redirectToUsers,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    if (redirectToUsers) {
      return <Redirect to={`/users`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultImage;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        )}

        <img
          src={photoUrl}
          alt={name}
          onError={(e) => (e.target.src = DefaultImage)}
          className="img-thumbnail"
          style={{ height: "150px", width: "auto" }}
        />
        {this.editForm({ name, email, password, about })}
      </div>
    );
  }
}

export default EditProfile;
