import React, { useEffect } from 'react'
import Aos from 'aos';
import "aos/dist/aos.css";
import './Testimonials.css';

const Testimonials = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: 'ease-out-cubic' });
  }, [])
  
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Web Development Student",
      message: "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch. I've built multiple projects and landed my first developer job!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Data Science Student",
      message: "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable. The practical approach is exactly what I needed.",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "UX Design Student",
      message: "The project-based approach helped me build a portfolio that landed me my dream job. The feedback from instructors was invaluable for my growth.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Marketing Student",
      message: "The instructors are industry experts who provide practical knowledge you can apply immediately. The community support is outstanding too.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 5,
      name: "David Chen",
      position: "Python Programming Student",
      message: "The community support and code reviews helped me improve my skills faster than I thought possible. Every lesson builds perfectly on the previous one.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      position: "Mobile Development Student",
      message: "The courses are well-structured with just the right balance of theory and hands-on practice. I now feel confident building mobile apps from scratch.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <section className='testimonials'>
      <h2 data-aos="fade-up">What Our Students Say</h2>
      <p className="testimonials-subtitle" data-aos="fade-up" data-aos-delay="100">
        Discover how our students have transformed their careers through our comprehensive courses
      </p>
      <div className='testimonials-cards'>
        {testimonialsData.map((testimonial, index) => (
          <div className='testimonials-card' key={testimonial.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className='student-image'>
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className='rating'>
              {renderStars(testimonial.rating)}
            </div>
            <p className='message'>{testimonial.message}</p>
            <div className='info'>
              <p className='name'>{testimonial.name}</p>
              <p className='position'>{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials;