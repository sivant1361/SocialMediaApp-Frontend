import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };
  unFollowClick = () => {
    this.props.onButtonClick(unfollow);
  };
  render() {
    return (
      <div className="d-inline-block">
        {this.props.following ? (
          <button
            onClick={this.unFollowClick}
            className="btn btn-warning btn-raised"
          >
            UnFollow
          </button>
        ) : (
          <button
            onClick={this.followClick}
            className="btn btn-success btn-raised mr-5"
          >
            Follow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
