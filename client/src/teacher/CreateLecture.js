import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/apihelper/apicall";
import { createLecture, getAllChapters } from "./apihelper/apicall";
import Layout from "../core/Layout";

const CreateLecture = () => {
  const [values, setValues] = useState({
    description: "",
    video: "",
    pdf: "",
    chapters: [],
    createdLecture: "",
    loading: false,
    error: "",
    success: false,
    formData: "",
  });

  const {
    description,
    video,
    pdf,
    chapters,
    createdLecture,
    loading,
    error,
    success,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  const loadAllChapters = () => {
    setValues({ ...values, loading: true });
    getAllChapters(user._id, token).then((data) => {
      if (data.error || !data) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({
          ...values,
          loading: false,
          chapters: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    loadAllChapters();
  }, []);

  const changeHandler = (name) => (event) => {
    let value;
    if (name === "video") {
      value = event.target.files[0];
    } else if (name === "pdf") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }

    setValues({ ...values, [name]: event.target.value });
    formData.set(name, value);
  };

  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });

    createLecture(formData, user._id, token).then((data) => {
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
          video: "",
          pdf: "",
          thumbnail: "",
          createdLecture: data.description,
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
          <strong>{createdLecture.substr(0, 15)}!</strong> lecture Created
          Successfully
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

  const createLectureForm = () => {
    return (
      <form className="mt-4 ">
        <div className="form-group">
          <label>Chapter</label>
          <select onChange={changeHandler("chapter")} className="form-control">
            <option value="">Chapter</option>
            {chapters.map((chapter, index) => (
              <option key={index} value={chapter._id}>
                class: {chapter.cls} | chapter: {chapter.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Lecture's Video</label>
          <input
            type="file"
            value={video}
            placeholder="Choose Thumbnail"
            onChange={changeHandler("video")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Lecture's Pdf</label>
          <input
            type="file"
            value={pdf}
            placeholder="Choose Pdf"
            onChange={changeHandler("pdf")}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Lecture's Short Description</label>
          <textarea
            className="form-control"
            onChange={changeHandler("description")}
            placeholder="Description"
            rows="10"
          ></textarea>
        </div>

        <button
          onClick={onSubmmit}
          className="btn btn-outline-info float-right"
        >
          Create
        </button>
      </form>
    );
  };

  return (
    <Layout title="All Chapters" description="Manage Chapters.">
      <div className="container">
        <div className="row py-4">
          <div className=" ml-auto mr-auto">
            {errorMessage()}
            {successMessage()}
            {loadingMessage()}

            {createLectureForm(chapters)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateLecture;
