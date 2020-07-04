import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/apihelper/apicall";

const Subject = () => {
  const { user, token } = isAuthenticated();

  const subjectArea = () => {
    return (
      <Fragment>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Hindi</h5>
              <p className="card-text">
                Click on the link given below to get lectures
              </p>
              <Link to="/subjects/hindi" class="btn btn-primary">
                See Chapters
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">English</h5>
              <p className="card-text">
                Click on the link given below to get lectures
              </p>
              <Link to="/subjects/English" class="btn btn-primary">
                See Chapters
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Sanskrit</h5>
              <p className="card-text">
                Click on the link given below to get lectures
              </p>
              <Link to="/subjects/Sanskrit" class="btn btn-primary">
                See Chapters
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Maths</h5>
              <p className="card-text">
                Click on the link given below to get lectures
              </p>
              <Link to="/subjects/Maths" class="btn btn-primary">
                See Chapters
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Science</h5>
              <p className="card-text">
                Click on the link given below to get lectures
              </p>
              <Link to="/subjects/Science" class="btn btn-primary">
                See Chapters
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Social Science</h5>
              <p className="card-text">
                Click on the link given below to get lectures
              </p>
              <Link to="/subjects/SocialScience" class="btn btn-primary">
                See Chapters
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Layout title="All Subjects" description="">
      <div className="container">
        <div className="row py-4">{subjectArea()}</div>
      </div>
    </Layout>
  );
};

export default Subject;
