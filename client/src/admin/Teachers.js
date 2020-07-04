import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { getAllTeachers, imageUri } from "./apihelper/apicall";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);

  const { user, token } = isAuthenticated();

  const loadAllTeachers = () => {
    setLoading(true);
    getAllTeachers(user._id, token).then((data) => {
      if (data.error) {
        setLoading(false);
        setError({ error: data.error });
      } else {
        setLoading(false);
        setTeachers(data);
      }
    });
  };
  useEffect(() => {
    loadAllTeachers();
  }, []);

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            loading...
          </button>
        </div>
      )
    );
  };
  const deleteMessage = () => {
    return (
      isdeleted && (
        <div className="alert alert-success">Book Deleted successfully</div>
      )
    );
  };
  // const deleteTeacher = (bookId) => {
  //     setLoading(true);
  //     removebook(user._id, bookId, token)
  //         .then((data) => {
  //             if (data.error) {
  //                 setError(data.error);
  //                 setLoading(false);
  //             } else {
  //                 setIsdeleted(true);
  //                 loadAllBooks();
  //                 setLoading(false);
  //             }
  //         })
  //         .catch((err) => console.log(err));
  // };

  const teachersTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Photo</th>
            <th>name</th>
            <th>Phone</th>
            <th>email</th>
            <th>Desingn</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  {" "}
                  <img
                    src={imageUri(teacher._id)}
                    alt=""
                    style={{ width: "80px" }}
                  />{" "}
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.email}</td>
                <td>{teacher.desingn}</td>

                <td>
                  <Link
                    to={`/admin/category/update/${teacher._id}`}
                    className="btn btn-info"
                  >
                    Update
                  </Link>
                  <button
                    // onClick={() => deleteBook(book._id)}
                    className="btn btn-danger ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <Layout title="All Teachers" description="Manage Teachers.">
      <div className="row py-4">
        <div className="col-md-10 ml-auto mr-auto">
          {errorMessage()}
          {deleteMessage()}
          {loadingMessage()}
          {teachersTable()}
        </div>
      </div>
    </Layout>
  );
  //
};
export default Teachers;
