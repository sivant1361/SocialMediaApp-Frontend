import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultPost from "../images/bird.jpg";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(data.posts);
        this.setState({ posts: data });
      }
    });
  }

  renderPosts(posts) {
    // console.log(posts);
    return (
      <div className="row">
        {posts &&
          posts.map((post, index) => {
            const posterId = post.postedBy._id ? post.postedBy._id : "";
            const posterName = post.postedBy.name ? post.postedBy.name : "";
            // console.log(
            //   `${process.env.REACT_APP_API_URL}/post/photo/${post._id}`
            // );
            return (
              <div className="col-md-4 col-sm-6 col-xs-12 p-2" key={index}>
                <div className="card p-2">
                  <div className="card-body">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                      onError={(e) => (e.target.src = `${DefaultPost}`)}
                      alt={post.title}
                      className="img-thumbnail"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="card-title mt-2">{post.title}</h5>
                    <p className="card-text">
                      {post.body.length < 50
                        ? post.body
                        : `${post.body.slice(0, 40)}...`}
                    </p>

                    <p className="font-italic mark">
                      Posted by{" "}
                      <Link to={`/user/${posterId}`}>{posterName}</Link> on{" "}
                      {new Date(post.created).toDateString()}
                    </p>
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-raised btn-primary btn-sm"
                    >
                      Read More
                    </Link>
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
        <h2 className="mt-5 mb-5">
          {posts.length === 0 ? `Loading...` : `Recent Posts`}
        </h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
