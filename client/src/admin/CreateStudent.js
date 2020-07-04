import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { createStudent } from "./apihelper/apicall";
import Layout from "../core/Layout";

const CreateStudent = () => {
  const [values, setValues] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: [],
    gender: "",
    cls: "",
    streme: "",
    password: "",
    photo: "",

    createdStudent: "",
    loading: false,
    error: "",
    success: false,
    formData: "",
  });

  const {
    name,
    fatherName,
    phone,
    email,
    gender,
    cls,
    streme,
    password,
    photo,

    createdStudent,
    loading,
    error,
    success,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const changeHandler = (name) => (event) => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;

    setValues({ ...values, [name]: event.target.value });
    formData.set(name, value);
  };

  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,

      loading: true,
      error: false,
      success: false,
    });
    formData.set("password", phone + name);

    createStudent(formData, user._id, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          success: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          fatherName: "",
          phone: "",
          email: "",
          gender: "",
          cls: "",
          photo: "",
          streme: "",
          password: "",
          createdStudent: data.name,
          loading: false,
          error: "",
          success: true,
        });
      }
    });
  };

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const successMessage = () => {
    return (
      success && (
        <div className="alert alert-success">
          <strong>{createStudent}!</strong> Student Created Successfully
        </div>
      )
    );
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
          Loading...
        </div>
      )
    );
  };

  const createStudentForm = () => {
    return (
      <form className="mt-4 ">
        <div className="form-group">
          <label>Student Profile</label>
          <input
            type="file"
            value={photo}
            placeholder="Choose photo"
            onChange={changeHandler("photo")}
            className="form-control"
          />
        </div>
        <input type="hidden" name="role" value="1" />
        <div className="form-group">
          <label>Student's Name</label>
          <input
            type="text"
            value={name}
            placeholder="Eg. Mr. sahil"
            onChange={changeHandler("name")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Student's Father Name</label>
          <input
            type="text"
            value={fatherName}
            className="form-control"
            onChange={changeHandler("fatherName")}
            placeholder="Mr. Nabi sher"
          />
        </div>
        <div className="form-group">
          <label>Phone No.</label>
          <input
            type="text"
            value={phone}
            placeholder="eg. 9999999999"
            onChange={changeHandler("phone")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            placeholder="eg. xyz@sahil.com "
            onChange={changeHandler("email")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Gender </label>
          <select onChange={changeHandler("gender")} className="form-control">
            <option value="">gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Class </label>
          <select onChange={changeHandler("cls")} className="form-control">
            <option value="">class</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
          </select>
        </div>

        {/* <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="eg. password "
            onChange={changeHandler("password")}
            className="form-control"
          />
        </div> */}
        <button onClick={onSubmmit} className="btn btn-info float-right">
          Create Student
        </button>
      </form>
    );
  };

  return (
    <Layout title="Create Teacher" description="create new Teacher.">
      <div className="row col3">
        <div className="col-md-7 ml-auto mr-auto mt-2 mb-4">
          {errorMessage()}
          {successMessage()}
          {loadingMessage()}
          {createStudentForm()}
          {/* <p>{JSON.stringify(values)} </p> */}
        </div>
      </div>
    </Layout>
  );
};

export default CreateStudent;
