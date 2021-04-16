import React, { Component } from "react";
import { getUser } from "./apiUser";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import DefaultImage from "../images/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: [],
      loading: false,
    };
  }

  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = (userId) => {
    this.setState({ loading: true });
    getUser(userId, isAuthenticated().token)
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          let following = this.checkFollow(data);
          // console.log(data);
          this.setState({ user: data, following, loading: false });
          this.loadPosts(data._id);
        }
      })
      .catch((error) => console.log(error));
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        this.setState({ posts: response.posts });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, following, posts, loading } = this.state;

    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    const photoUrl = this.state.user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          this.state.user._id
        }?${new Date().getTime()}`
      : DefaultImage;

    if (loading) {
      return (
        <div className="container">
          <h2 className="mt-5 mb-5">Profile</h2>
          {loading && (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          )}
        </div>
      );
    } else
      return (
        <div className="container">
          <h2 className="mt-5 mb-5">Profile</h2>
          {loading && (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          )}
          <div className="row">
            <div className="col-md-4">
              <img
                src={photoUrl}
                onError={(e) => (e.target.src = DefaultImage)}
                alt={this.state.user.name}
                className="img-thumbnail"
                style={{ height: "200px", width: "auto", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="lead mt-2">
                <p>Hello {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Joined {new Date(user.created).toDateString()}</p>
              </div>
              {isAuthenticated().user &&
              isAuthenticated().user._id === user._id ? (
                <div className="d-inline-block">
                  <Link
                    className="btn btn-raised btn-info mr-5"
                    to={`/post/create`}
                  >
                    Create Post
                  </Link>
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id} />
                </div>
              ) : (
                <FollowProfileButton
                  onButtonClick={this.clickFollowButton}
                  following={following}
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mt-5 mb-5">
              {user.about && (
                <>
                  <hr />
                  <p className="lead">{user.about}</p>
                </>
              )}{" "}
              <hr />
              <ProfileTabs
                followers={user.followers}
                following={user.following}
                posts={posts}
              />
            </div>
          </div>
        </div>
      );
  }
}

export default Profile;
