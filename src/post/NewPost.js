import React, { Component } from "react";
import { create } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      redirectToProfile: false,
      loading: false,
      title: "",
      body: "",
      photo: "",
      error: "",
      fileSize: 0,
      user: {},
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required" });
      return false;
    }
    if (fileSize > 200000) {
      this.setState({ error: "File size should be lesser than 200kb" });
      return false;
    }
    return true;
  };

  handleChange = (event, name) => {
    this.setState({ error: false });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      create(
        isAuthenticated().user._id,
        isAuthenticated().token,
        this.postData
      ).then((data) => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          console.log(data);
          this.setState({
            loading: false,
            redirectToProfile: true,
            title: "",
            body: "",
            photo: "",
          });
        }
      });
    } else {
      this.setState({ loading: false });
    }
  };

  newPost = ({ title, body }) => {
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
          <label className="text-muted">Title</label>
          <input
            onChange={(event) => this.handleChange(event, "title")}
            type="text"
            className="form-control"
            value={title}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Body</label>
          <input
            onChange={(event) => this.handleChange(event, "body")}
            type="text"
            className="form-control"
            value={body}
          />
        </div>
        <button
          onClick={this.handleSubmit}
          className="btn btn-raised btn-primary"
        >
          Create Post
        </button>
      </form>
    );
  };

  render() {
    const { title, body, user, redirectToProfile, error, loading } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">New Post </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        )}

        {this.newPost({ title, body })}
      </div>
    );
  }
}

export default NewPost;
