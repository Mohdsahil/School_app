import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { getAllChapters } from "./apihelper/apicall";

const SChapter = ({ match }) => {
  const [chapters, setChapters] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const loadAllChapters = () => {
    setLoading(true);
    getAllChapters(match.params.subject, user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        setLoading(false);
        setError({ error: data.error });
      } else {
        setLoading(false);
        setChapters(data);
      }
    });
  };

  useEffect(() => {
    loadAllChapters();
  }, []);

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          loading...
        </div>
      )
    );
  };

  const chaptersTable = (chapters) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>

            <th>Class</th>
            <th>Subject</th>
            <th>Chapter</th>
            <th>descirption</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{chapter.cls}</td>
                <td>{chapter.subject}</td>
                <td>{chapter.name}</td>
                <td>{chapter.description.substr(0, 50)}</td>

                <td>
                  <Link
                    to={`/student/chapterslecture/${chapter._id}`}
                    className="btn btn-outline-success btn-sm mr-2"
                  >
                    See Lectures
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Layout title="All Chapters" description="Manage Chapters.">
      <div className="container">
        <div className="row py-4">
          <div className=" ml-auto mr-auto">
            {errorMessage()}

            {loadingMessage()}

            {chaptersTable(chapters)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SChapter;
