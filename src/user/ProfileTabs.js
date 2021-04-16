import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../images/avatar.png";

class ProfileTabs extends Component {
  render() {
    // console.log(this.props);
    const { following, followers, posts } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">Followers</h3>
            <hr />
            {followers.map((person, index) => {
              return (
                <div key={index}>
                  <Link to={`/user/${person._id}`}>
                    <img
                      className="float-left mr-2"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      onError={(e) => (e.target.src = DefaultImage)}
                      alt={person.name}
                      style={{
                        height: "30px",
                        width: "30px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3 className="text-primary">Following</h3>
            <hr />
            {following.map((person, index) => {
              return (
                <div key={index}>
                  <Link to={`/user/${person._id}`}>
                    <img
                      className="float-left mr-2"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      onError={(e) => (e.target.src = DefaultImage)}
                      alt={person.name}
                      style={{
                        height: "30px",
                        width: "30px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Posts </h3>
            <hr />
            {posts.map((post, index) => {
              return (
                <div key={index}>
                  <div>
                    <Link to={`/post/${post._id}`}>
                      <div>
                        <p className="lead">{post.title}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
