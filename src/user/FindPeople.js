import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultImage from "../images/avatar.png";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      followMessage: "",
      open: false,
    };
  }

  componentDidMount() {
    findPeople(isAuthenticated().user._id, isAuthenticated().token).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          this.setState({ users: data });
        }
      }
    );
  }

  clickFollow = (person, index) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, person._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(index, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${person.name}`,
        });
      }
    });
  };

  renderUsers(users) {
    return (
      <div className="row">
        {users &&
          users.map((user, index) => (
            <div className="col-md-4 col-sm-6 col-xs-12 p-2" key={index}>
              <div className="card p-2">
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${
                    user._id
                  }?${new Date().getTime()}`}
                  onError={(e) => (e.target.src = DefaultImage)}
                  alt={user.name}
                  className="img-thumbnail"
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  <Link
                    to={`/user/${user._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    User's Profile
                  </Link>
                  <button
                    onClick={() => this.clickFollow(user, index)}
                    className="btn btn-raised btn-info btn-sm float-right"
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  render() {
    const { users, followMessage, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Find People</h2>
        {open && (
          <div className="alert alert-success">
            <p>{followMessage}</p>
          </div>
        )}
        {users && this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
