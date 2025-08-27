import React, { useState } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import Footer from "../../components/footer/Footer";

const Courses = () => {
  const { courses } = CourseData();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || course.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Get unique categories for filter buttons
  const categories = ["All", ...new Set(courses.map(course => course.category))].filter(Boolean);

  return (
    <>
      <div className="courses">
        <div className="courses-container">
          <div className="courses-header">
            <h2>Available Courses</h2>
            <p className="courses-subtitle">
              Discover our comprehensive collection of courses designed to help you learn new skills and advance your career.
            </p>
          </div>

          <div className="search-container">
            <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search courses"
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* Filter Section */}
          {categories.length > 1 && (
            <div className="filter-section">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Results Info */}
          {search && (
            <div className="results-info">
              Found <span className="results-count">{filterCourses.length}</span> course{filterCourses.length !== 1 ? 's' : ''} 
              {search && ` for "${search}"`}
            </div>
          )}

          <div className="course-container">
            {filterCourses && filterCourses.length > 0 ? (
              filterCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="no-courses">
                <div className="no-courses-content">
                  <span className="no-courses-icon">📚</span>
                  <h3>No courses found</h3>
                  <p>
                    {search ? (
                      <>We couldn't find any courses matching <span className="search-term">"{search}"</span>. Try a different search term.</>
                    ) : (
                      "No courses are available at the moment. Please check back later!"
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;