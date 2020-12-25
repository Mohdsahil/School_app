import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { getPhoto } from "./apihelper/apicall";

const Profile = () => {
  const { user, token } = isAuthenticated();

  return (
    <Layout title={user.name} description="">
      <div className="container">
        <div className="row py-4">
          <div className="col-md-8">
            {user.role == "1" && <h2>Teacher's Profile</h2>}
            {user.role == "0" && <h2>Students's Profile</h2>}
            <img src={getPhoto(user._id)} alt="" className="img-fluid" />
          </div>
          <div className="col-md-4">
            <h4>Name: {user.name}</h4>
            <h4>Father's Name: {user.fatherName}</h4>
            <h4>Email: {user.email}</h4>
            <h4>phone: {user.phone}</h4>
            {user.role == "0" && (
              <Fragment>
                <h4>Class: {user.cls}</h4>
                <h4>Section: {user.section}</h4>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );

  //
};

export default Profile;
