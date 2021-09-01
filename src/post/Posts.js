import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultPost from "../images/bird.jpg";
import DefaultImage from "../images/avatar.png";
import Loading from "../core/Loading";
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    list()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // console.log(data.posts);
          this.setState({ posts: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderPosts(posts) {
    // console.log(posts);
    return (
      <div>
        {posts &&
          posts.map((post, index) => {
            // const posterId = post.postedBy._id ? post.postedBy._id : "unknown";
            // const posterName = post.postedBy.name
            //   ? post.postedBy.name
            //   : "unknown";

            const person = post.postedBy;
            // console.log(
            //   `${process.env.REACT_APP_API_URL}/post/photo/${post._id}`
            // );
            return (
              <div className="row justify-content-center" key={index}>
                <div
                  className="col-md-12 col-sm-12 col-xs-12 p-2 mt-2 mb-4"
                  style={{ borderRadius: 10, backgroundColor: "#333" }}
                >
                  <div style={{ backgroundColor: "#333" }}>
                    <div
                      className="card"
                      style={{ borderRadius: 10, backgroundColor: "#222" }}
                    >
                      <Link
                        to={`/user/${person._id}`}
                        className="row align-items-center ml-2 p-2"
                      >
                        <img
                          className="float-left mr-2"
                          src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                          onError={(e) => (e.target.src = DefaultImage)}
                          alt={person.name}
                          style={{
                            height: "40px",
                            width: "40px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "1px solid black",
                            backgroundColor: "white",
                            padding: 2,
                          }}
                        />
                        <div style={{ padding: 2, height: "40px" }}>
                          <p>
                            {person.name}
                            <br />
                            <span style={{ fontSize: 10 }}>
                              {new Date(post.created).toDateString()}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div
                      className="card-body"
                      style={{ backgroundColor: "#333" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                        onError={(e) => (e.target.src = `${DefaultPost}`)}
                        alt={post.title}
                        className="img-thumbnail"
                        style={{
                          height: "300px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <h5
                        className="card-title mt-4"
                        style={{ fontWeight: "bold",color: "#c5c5c5" }}
                      >
                        {post.title}
                      </h5>
                      <p className="card-text">
                        {post.body.length < 150
                          ? post.body
                          : `${post.body.slice(0, 140)}...`}
                      </p>

                      {/* <p
                        className="font-italic mark"
                        style={{ color: "black" }}
                      >
                        Posted by{" "}
                        <Link to={`/user/${posterId}`}>{posterName}</Link> on{" "}
                        {new Date(post.created).toDateString()}
                      </p> */}
                      <Link
                        to={`/post/${post._id}`}
                        className="btn btn-raised btn-primary btn-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        {posts.length === 0 && <Loading />}
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
