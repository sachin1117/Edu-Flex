import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "./../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && user.role !== "superadmin" && !user.subscription.includes(params.id))
    return navigate("/");
  
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setLoading(false);
      setLectures(data.lectures);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecLoading ? (
              <Loading />
            ) : (
              <>
                {lecture.video ? (
                  <>
                    <video
                      src={`${server}/${lecture.video}`}
                      width={"100%"}
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                    ></video>
                    <h1>{lecture.title}</h1>
                    <h3>{lecture.description}</h3>
                  </>
                ) : (
                  <div style={{textAlign: 'center', padding: '40px'}}>
                    <h1>Select a Lecture to Begin</h1>
                    <p>Choose from the list on the right to start learning</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="right">
            {user && (user.role === "admin" || user.role === "superadmin") && (
              <button className="add-btn" onClick={() => setShow(!show)}>
                {show ? "Close Form" : "Add Lecture"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Add New Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter lecture title"
                  />
                  
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter lecture description"
                  />
                  
                  <label htmlFor="video">Video File</label>
                  <input
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={changeVideoHandler}
                    required
                  />

                  {videoPrev && (
                    <div className="video-preview">
                      <video src={videoPrev} width={"100%"} controls></video>
                    </div>
                  )}

                  <button disabled={btnLoading} type="submit">
                    {btnLoading ? "Adding..." : "Add Lecture"}
                  </button>
                </form>
              </div>
            )}

            <h3 style={{margin: '10px 0', color: '#1F2937'}}>Lectures ({lectures.length})</h3>
            
            {lectures && lectures.length > 0 ? (
              lectures.map((lec, i) => (
                <div key={lec._id}>
                  <div
                    className={`lecture-number ${lecture._id === lec._id && "active"}`}
                    onClick={() => fetchLecture(lec._id)}
                  >
                    {i + 1}. {lec.title}
                  </div>
                  {user && (user.role === "admin" || user.role === "superadmin") && (
                    <button className="delete-btn" onClick={() => deleteHandler(lec._id)}>
                      Delete Lecture
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={{textAlign: 'center', color: '#6B7280', padding: '20px'}}>
                No lectures available yet
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;