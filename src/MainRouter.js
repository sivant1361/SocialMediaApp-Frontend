import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Home from "./core/Home";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";

import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";

const MainRouter = () => {
  return (
    <div style={{backgroundColor:'#000', minHeight:'100vh'}}>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/user/:userId" component={Profile} />
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute exact path="/findpeople" component={FindPeople} />
        <PrivateRoute exact path="/post/create" component={NewPost} />
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
        <Route exact path="/post/:postId" component={SinglePost} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </div>
  );
};

export default MainRouter;
