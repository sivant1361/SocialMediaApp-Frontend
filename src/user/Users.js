import React, { Component } from "react";
import { list } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultImage from "../images/avatar.png";
import Loading from "../core/Loading";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data.users });
      }
    }).catch(err =>{
      console.log(err);
    })
  }

  renderUsers(users) {
    return (
      <div className="row">
        {users &&
          users.map((user, index) => (
            <div className="col-md-4 col-sm-6 col-xs-12 p-2" key={index}>
              <div className="card p-4" style={{ backgroundColor: '#333'}}>
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
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {users.length===0 && <Loading />}
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
