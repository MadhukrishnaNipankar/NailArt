import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Sample data extracted from your document (Replace with actual content)
const blogs = [
  {
    id: 1,
    title: "The Art of Nail Perfection",
    excerpt: "Discover the secrets behind flawless nail art and how professionals achieve stunning designs...",
    image: "images/b11.jpg", // Replace with actual image paths
    content: "Full blog content for The Art of Nail Perfection..."
  },
  {
    id: 2,
    title: "Trending Nail Colors of 2025",
    excerpt: "A look into the most fashionable nail colors that will dominate the beauty industry this year...",
    image: "images/b21.jpg",
    content: "Full blog content for Trending Nail Colors of 2025..."
  },
  {
    id: 3,
    title: "DIY Nail Care at Home",
    excerpt: "How to keep your nails healthy and stylish with simple DIY treatments...",
    image: "images/b31.jpg",
    content: "Full blog content for DIY Nail Care at Home..."
  },
  {
    id: 4,
    title: "Luxury Nail Salons – Are They Worth It?",
    excerpt: "A deep dive into the world of high-end nail salons and whether they live up to the hype...",
    image: "images/b41.jpeg",
    content: "Full blog content for Luxury Nail Salons..."
  }
];

function Blogs() {
  return (
    <Row xs={1} md={2} className="g-4">
      {blogs.map((blog) => (
        <Col key={blog.id}>
          <Card className="shadow-lg border-0 rounded">
            <Card.Img variant="top" src={blog.image} alt={blog.title} />
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.excerpt}</Card.Text>
              <Link to={`/blog/${blog.id}`} className="btn btn-primary">Read More</Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Blogs;
