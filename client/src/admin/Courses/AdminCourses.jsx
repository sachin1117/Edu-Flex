import React, { useState, useEffect } from 'react'
import "./admincourses.css"
import Layout from '../Utils/Layout'
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';

const categories = [
  "Programming & Development → C++ Programming",
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
  "Java Development"
]

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role && user.role !== "admin" && user.role !== "superadmin") {
      navigate("/");
    }
  }, [user, navigate]);

  const { courses, fetchCourses } = CourseData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(true)
  const [search, setSearch] = useState("");

  const filterCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category === "Other" ? customCategory : category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(
        `${server}/api/course/new`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setTitle("");
      setDescription("");
      setCategory("");
      setCustomCategory("");
      setPrice("");
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePrev("");
      setShow(false);
      setShowSearch(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h2>All Courses</h2>
          
          {showSearch && (
            <div className="course-search">
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          
          <div className="dashboard-content">
            {filterCourses && filterCourses.length > 0 ? (
              filterCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="no-courses">
                <div className="icon">📚</div>
                <p>No courses found</p>
                <small>Add your first course using the form on the right</small>
              </div>
            )}
          </div>
        </div>

        <div className="right">
          <div className="add-course">
            <button 
              className="add-btn" 
              onClick={() => { 
                setShow(!show); 
                setShowSearch(!showSearch);
              }}
            >
              {show ? <>✕ Close Form</> : <>+ Add New Course</>}
            </button>

            {show && (
              <div className="course-form">
                <h3>Add New Course</h3>
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="title">Course Title</label>
                    <input 
                      type="text" 
                      id="title"
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="Enter course title"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input 
                      type="text" 
                      id="description"
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="Enter course description"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price (₹)</label>
                    <input 
                      type="number" 
                      id="price"
                      value={price} 
                      onChange={e => setPrice(e.target.value)} 
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="createdBy">Instructor</label>
                    <input 
                      type="text" 
                      id="createdBy"
                      value={createdBy} 
                      onChange={e => setCreatedBy(e.target.value)} 
                      placeholder="Instructor name"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                      id="category"
                      value={category} 
                      onChange={e => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option value={cat} key={cat}>{cat}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {category === "Other" && (
                      <input
                        type="text"
                        placeholder="Enter custom category"
                        value={customCategory}
                        onChange={e => setCustomCategory(e.target.value)}
                        required
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration">Duration (hours)</label>
                    <input 
                      type="number" 
                      id="duration"
                      value={duration} 
                      onChange={e => setDuration(e.target.value)} 
                      placeholder="Course duration in hours"
                      min="1"
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Course Image</label>
                    <input 
                      type="file" 
                      id="image"
                      onChange={changeImageHandler} 
                      accept="image/*"
                      required 
                    />
                  </div>

                  {imagePrev && (
                    <div className="form-group">
                      <img src={imagePrev} alt="Course preview" />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={btnLoading}
                  >
                    {btnLoading ? "Creating Course..." : "Create Course"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminCourses
