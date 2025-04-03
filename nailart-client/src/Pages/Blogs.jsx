import React from "react";
import { Link } from "react-router-dom";
import "./Blogs.css";

const blogs = [
  {
    id: 1,
    title: "The Ultimate Guide to Nail Care",
    description: "Achieve salon-worthy nails with our complete guide to nail health and maintenance.",
    image: "images/b11.jpg"
  },
  {
    id: 2,
    title: "Nail Trend Forecast 2025",
    description: "Discover the hottest nail trends of 2025, from milky whites to mocha-inspired designs!",
    image: "images/b21.jpg"
  },
  {
    id: 3,
    title: "How to Apply Press-On Nails",
    description: "Get salon-perfect nails at home with this step-by-step guide to applying press-on nails like a pro!",
    image: "images/b31.jpg"
  },
  {
    id: 4,
    title: "How to Remove Press-On Nails",
    description: "Removing press-on nails safely is crucial for keeping your natural nails healthy. Here’s how to do it right!",
    image: "images/b41.jpeg"
  }
];


const Blogs = () => {
  return (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-description">{blog.description}</p>
            <Link to={`/blog/${blog.id}`} className="read-more">Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
