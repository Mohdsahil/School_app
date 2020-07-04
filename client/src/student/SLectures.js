import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/apihelper/apicall";
import {
  getLectureByChapterId,
  getVideo,
  getPdf,
  getLectureById,
} from "../teacher/apihelper/apicall";
import DialogBox from "./DialogBox";
import { Player, ControlBar } from "video-react";

const SLecture = ({ match }) => {
  const [lectures, setLectures] = useState([]);
  const [videourl, setVideourl] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const loadChaptersLecture = () => {
    setLoading(true);
    getLectureByChapterId(match.params.chapterId, user._id, token).then(
      (data) => {
        if (data.error) {
          setLoading(false);
          setError({ error: data.error });
        } else {
          setLoading(false);
          setLectures(data);
        }
      }
    );
  };

  const loadVideo = (lectureId) => {
    getVideo(lectureId).then((data) => {
      if (data.error) console.log(data.error);
      else setVideourl(data);
    });
  };

  useEffect(() => {
    loadChaptersLecture();
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

  const lecturesTable = (lectures) => {
    return (
      <table className="table">
        <tbody>
          {lectures.map((lecture, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{lecture.description} </td>
                <td>{lecture.chapter.name} </td>

                <td>
                  <button
                    onClick={() => loadVideo(lecture._id)}
                    className="btn btn-outline-success btn-sm mr-2"
                  >
                    play
                  </button>
                  <DialogBox book={lecture} /> download notes
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Layout title="Lectures of " description="">
      <div className="container">
        <div className="row py-4">
          {errorMessage()}

          {loadingMessage()}

          <div className="col-md-8">
            <h2>vide play section</h2>
            <video
              src={videourl}
              autoPlay
              controls
              controlsList="nodownload"
            ></video>

            {/* <div className="embed-responsive embed-responsive-21by9">
              <iframe className="embed-responsive-item" src={videourl}></iframe>
            </div> */}
          </div>
          <div className="col-md-4">{lecturesTable(lectures)}</div>
        </div>
      </div>
    </Layout>
  );
  //
};

export default SLecture;
