import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import DefaultPost from "../images/bird.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";

export default class SinglePost extends Component {
  state = {
    post: null,
    loading: false,
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: [],
  };

  checkLike = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    console.log(match);
    return match;
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.setState({ loading: true });
    singlePost(postId).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        this.setState({
          post: response,
          loading: false,
          likes: response.likes.length,
          like: this.checkLike(response.likes),
          comments: response.comments,
        });
        // console.log(this.state.comments);
      }
      //   console.log(response);
    });
  }

  deletePost = () => {
    const postId = this.props.match.params.postId;
    remove(postId, isAuthenticated().token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        this.setState({ redirectToHome: true, response, loading: false });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post");
    if (answer) {
      this.deletePost();
    }
  };

  likeToggle = () => {
    if (isAuthenticated()) {
      let callApi = this.state.like ? unlike : like;
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.state.post._id;

      callApi(userId, token, postId).then((response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          this.setState({
            like: !this.state.like,
            likes: response.likes.length,
          });
        }
      });
    } else {
      this.setState({ redirectToSignin: true });
      return false;
    }
  };

  updateComments = (comments) => {
    this.setState({ comments: comments });
  };

  renderPost(post) {
    const posterId = post.postedBy._id ? post.postedBy._id : "";
    const posterName = post.postedBy.name ? post.postedBy.name : "";
    const { likes, like, comments } = this.state;

    return (
      <div>
        <div className="card">
          <div className="card-body" style={{backgroundColor:'#333',text:'white'}}>
            <img
              src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
              onError={(e) => (e.target.src = `${DefaultPost}`)}
              alt={post.title}
              className="img-thumbnail"
              style={{ height: "20em", width: "100%", objectFit: "cover" }}
            />
            {/* <h5 className="card-title mt-2 mb-2">{post.title}</h5> */}
            {like ? (
              <h6 className="mt-4">
                <i
                  onClick={this.likeToggle}
                  className="fa fa-thumbs-up text-primary"
                  style={{
                    borderRadius: "50%",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                ></i>
                {likes} Likes
              </h6>
            ) : (
              <h6 className="mt-4">
                <i
                  onClick={this.likeToggle}
                  className="fa fa-thumbs-up text-secondary"
                  style={{
                    borderRadius: "50%",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                ></i>
                {likes} Likes
              </h6>
            )}
            <p className="card-text mt-4 mb-4">{post.body}</p>

            <p className="font-italic mark" style={{color: 'black'}}>
              Posted by <Link to={`/user/${posterId}`}>{posterName}</Link> on{" "}
              {new Date(post.created).toDateString()}
            </p>
            <div className="d-inline-block">
              <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-3">
                Back to Posts
              </Link>
              {isAuthenticated().user &&
                isAuthenticated().user._id === posterId && (
                  <>
                    <Link
                      to={`/post/edit/${post._id}`}
                      className="btn btn-raised btn-info btn-sm mr-3"
                    >
                      Update
                    </Link>
                    <button
                      type="button"
                      onClick={this.deleteConfirmed}
                      className="btn btn-raised btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
            <Comment
              postId={post._id}
              comments={comments}
              updateComments={this.updateComments}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { post, loading, redirectToHome, redirectToSignin } = this.state;

    if (redirectToHome) {
      return <Redirect to="/" />;
    }
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{post && post.title}</h2>
        {/* {this.props.match.params.postId} */}
        {loading && (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        )}
        {post && this.renderPost(post)}
      </div>
    );
  }
}
