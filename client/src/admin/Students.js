import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { getAllStudens, imageUri } from "./apihelper/apicall";

const Students = () => {
  const [students, setStudents] = useState([]);
  let [filtedstudent, setFiltedstudent] = useState([]);
  // setFiltedstudent(students);
  // let s = students;

  const [filters, setFilters] = useState({
    roll: "",
    cls: "",
    section: "",
  });
  const { roll, cls, section } = filters;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);

  const { user, token } = isAuthenticated();

  const loadAllStudents = () => {
    setLoading(true);
    getAllStudens(user._id, token).then((data) => {
      if (data.error) {
        setLoading(false);
        setError({ error: data.error });
      } else {
        setLoading(false);
        setStudents(data);
        setFiltedstudent(data);
      }
    });
  };
  useEffect(() => {
    loadAllStudents();
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

  const changeHandler = (name) => (event) => {
    setFilters({ ...filters, [name]: event.target.value });
  };

  const filterAction = (event) => {
    event.preventDefault();

    setFiltedstudent(
      students.filter(function (student) {
        return student.cls == cls;
      })
    );
    // setFiltedstudent();

    console.log("filted student:", filtedstudent);
  };

  const filterField = () => {
    return (
      <div className="row">
        <form className="mt-4 mb-4 ml-auto mr-auto ">
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="from-group">
                    <input
                      type="text"
                      className="form-control"
                      name="roll"
                      placeholder="Roll no."
                      onChange={changeHandler("roll")}
                      id=""
                    />
                  </div>
                </td>
                <td>
                  <div className="from-group">
                    <select
                      name="cls"
                      className="form-control"
                      onChange={changeHandler("cls")}
                      id=""
                    >
                      <option value="">Class</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="from-group">
                    <select
                      name="section"
                      className="form-control"
                      onChange={changeHandler("section")}
                      id=""
                    >
                      <option value="">Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-outline-info"
                    onClick={filterAction}
                  >
                    filter
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>{JSON.stringify(filters)}</p>
        </form>
      </div>
    );
  };

  const studentsTable = (students) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Photo</th>
            <th>name</th>
            <th>Phone</th>
            <th>email</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  {" "}
                  <img
                    src={imageUri(student._id)}
                    alt=""
                    style={{ width: "80px" }}
                  />{" "}
                </td>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>{student.cls}</td>

                <td>
                  <Link
                    to={`/admin/category/update/${student._id}`}
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
      <div className="container">
        <div className="row py-4">
          <div className=" ml-auto mr-auto">
            {errorMessage()}
            {deleteMessage()}
            {loadingMessage()}
            {filterField()}
            {studentsTable(filtedstudent)}
          </div>
        </div>
      </div>
    </Layout>
  );
  //
};
export default Students;
