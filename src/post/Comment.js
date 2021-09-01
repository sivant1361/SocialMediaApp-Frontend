import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import DefaultImage from "../images/avatar.png";

export default class Comment extends Component {
  state = {
    text: "",
    error: "",
    redirectToSignin: false,
  };

  handleChange = (event) => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  addComment = (event) => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return;
    }
    event.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;
    const text = this.state.text;
    if (this.isValid())
      comment(userId, token, postId, text).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response);
          this.setState({ text: "" });
          this.props.updateComments(response.comments);
        }
      });
    else {
      return false;
    }
  };

  isValid = () => {
    const { text } = this.state;

    console.log(text.length);
    if (text.length < 1 || text.length > 150) {
      this.setState({
        error: "comment should not be empty or greater than 150 characters",
      });
      return false;
    } else {
      return true;
    }
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this comment");
    return answer;
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;
    if (this.deleteConfirmed()) {
      uncomment(userId, token, postId, comment).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.props.updateComments(response.comments);
          //   console.log(response);
        }
      });
    }
  };

  render() {
    const { comments } = this.props;
    const { error, redirectToSignin } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div >
        {/* {JSON.stringify(comments)} */}
        <h2 className="mt-5 mb-2">Leave a Comment</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              style={{color: 'white',borderColor:'white'}}
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button className="btn btn-raised btn-dark btn-sm mt-3">
              Post
            </button>
          </div>
        </form>
        {/* <hr /> */}
        <div className="col-md-12 col-md-offset-2">
          <h3 className="text-primary">{comments.length} Comments</h3>
          <hr />
          {comments.map((comment, index) => {
            console.log(comment);
            return (
              <div key={index} >
                <Link to={`/user/${comment.postedBy._id}`}>
                  <img
                    className="float-left mr-2"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${comment.postedBy._id}`}
                    onError={(e) => (e.target.src = DefaultImage)}
                    alt={comment.postedBy.name}
                    style={{
                      height: "30px",
                      width: "30px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                  />
                </Link>
                <div>
                  <p className="lead">{comment.text}</p>
                  <p className="font-italic mark" style={{color: 'black'}}>
                    Posted by{" "}
                    <Link to={`/user/${comment.postedBy._id}`}>
                      {comment.postedBy.name}
                    </Link>{" "}
                    on {new Date(comment.created).toDateString()}
                    <span className="float-right">
                      {isAuthenticated().user &&
                        isAuthenticated().user._id === comment.postedBy._id && (
                          <>
                            <span
                              onClick={() => this.deleteComment(comment)}
                              className="text-danger mr-1"
                            >
                              Remove
                            </span>
                          </>
                        )}
                    </span>
                  </p>
                  <br />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
