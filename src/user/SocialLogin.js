import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";

class SocialLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };
  }

  responseGoogle = (response) => {
    console.log(response);
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl,
    };
    // console.log("user obj to social login: ", user);
    socialLogin(user)
      .then((data) => {
        console.log("signin data: ", data);
        if (data.error) {
          console.log("Error Login. Please try again..");
        } else {
          console.log("signin success - setting jwt: ", data);
          authenticate(data, () => {
            this.setState({ redirectToReferrer: true });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // redirect
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ color: "black" }}>
        <GoogleLogin
          clientId="41166456655-rmhoe5prao7dhnt0boo0v2njvgdp5bj5.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          theme="dark"
        />
      </div>
    );
  }
}

export default SocialLogin;
