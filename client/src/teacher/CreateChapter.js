import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { createChapter } from "./apihelper/apicall";
import Layout from "../core/Layout";

const CreateChapter = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    cls: "",
    streme: "",
    subject: "",
    createdChapter: "",
    loading: false,
    error: "",
    success: false,
  });

  const {
    name,
    description,
    cls,
    streme,
    subject,
    createdChapter,
    loading,
    error,
    success,
  } = values;
  const { user, token } = isAuthenticated();
  const changeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,

      loading: true,
      error: false,
      success: false,
    });

    createChapter(
      { name, description, cls, streme, subject },
      user._id,
      token
    ).then((data) => {
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
          description: "",
          cls: "",
          streme: "",
          subject: "",
          createdChapter: data.name,

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
          <strong>{createdChapter}!</strong> Student Created Successfully
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

  const createChapterForm = () => {
    return (
      <form className="mt-4 ">
        <div className="form-group">
          <label>Chapter's Name</label>
          <input
            type="text"
            value={name}
            placeholder="eg. Chapter-1"
            onChange={changeHandler("name")}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label> Description</label>
          <input
            type="text"
            value={description}
            placeholder="eg. Chapter-1, this chapter is basically belongs t"
            onChange={changeHandler("description")}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Subject </label>
          <select onChange={changeHandler("subject")} className="form-control">
            <option value="">Subject</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Sanskrit">Sanskrit</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="SocialScience">Social Science</option>
            <option value="Drawing">Drawing</option>
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

        <button onClick={onSubmmit} className="btn btn-info float-right">
          Create Chapter
        </button>
      </form>
    );
  };

  return (
    <Layout title="Create Chapter" description="create new Chapter.">
      <div className="row col3">
        <div className="col-md-7 ml-auto mr-auto mt-2 mb-4">
          {errorMessage()}
          {successMessage()}
          {loadingMessage()}
          {createChapterForm()}
          <p>{JSON.stringify(values)} </p>
        </div>
      </div>
    </Layout>
  );
};

export default CreateChapter;
