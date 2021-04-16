import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { singlePost, update } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/bird.jpg";

export default class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      posterId: "",
      posterName: "",
      error: "",
      fileSize: 0,
      redirectToHome: false,
      redirectToProfile: false,
      loading: false,
    };
  }

  init = (postId) => {
    this.setState({ loading: true });
    singlePost(postId, isAuthenticated().token)
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToHome: true });
        } else {
          
          this.setState({
            id: data._id,
            title: data.title,
            body: data.body,
            posterId: data.postedBy._id,
            posterName: data.postedBy.name,
            loading: false,
          });
          if (data.postedBy._id !== isAuthenticated().user._id) {
            this.setState({ redirectToHome: true });
          }
        }
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
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
    const fileSize =
      name === "photo" && event.target.files[0].size
        ? event.target.files[0].size
        : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      update(this.state.id, isAuthenticated().token, this.postData).then(
        (data) => {
          if (data.error) {
            this.setState({ error: data.error, loading: false });
          } else {
            console.log("Updated Post:", data);
            this.setState({
              loading: false,
              redirectToProfile: true,
              title: "",
              body: "",
              photo: "",
            });
          }
        }
      );
    } else {
      this.setState({ loading: false });
    }
  };

  editPost = (title, body) => {
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
          Update
        </button>
      </form>
    );
  };

  render() {
    const {
      redirectToHome,
      redirectToProfile,
      loading,
      title,
      body,
      posterId,
      error,
      id,
    } = this.state;

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/post/photo/${id}?${new Date().getTime()}`
      : DefaultPost;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    }

    if (redirectToProfile) {
      return <Redirect to={`/user/${posterId}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{title && "Edit Post"}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        )}
        {!loading && (
          <img
            src={photoUrl}
            alt={title}
            onError={(e) => (e.target.src = DefaultPost)}
            className="img-thumbnail mb-3 "
            style={{ height: "150px", width: "auto" }}
          />
        )}
        {!loading && this.editPost(title, body)}
      </div>
    );
  }
}
