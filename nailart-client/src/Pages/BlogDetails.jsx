import React from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetails.css";

const blogs = [
    {
      id: 1,
      title: "The Ultimate Guide to Nail Care",
      description: "Achieve salon-worthy nails with our complete guide to nail health and maintenance.",
      image: "../images/b11.jpg",
      content: {
        introduction: "Identifying if your nails are healthy is the first step to achieving an at-home manicure. But how do you determine their condition?",
        sections: [
          {
            title: "Signs of Healthy Nails",
            content: [
              "Nail plates are a pinkish-white color.",
              "Your cuticles are visible and existent.",
              "The lunula (half-moon shape) is prominent at the nail base.",
              "Your nails and white tips are even in length."
            ]
          },
          {
            title: "Signs of Unhealthy Nails",
            content: [
              "Peeling or splitting of nails regularly occurs.",
              "Tiny white spots appear due to over-painting.",
              "Swollen skin around nails due to biting or damage.",
              "Horizontal grooves visible on the nail plate."
            ]
          },
          {
            title: "How to Care for Nails",
            steps: [
              { step: "Cut Your Nails Regularly", details: "Trimmed nails prevent the spread of germs and keep infections at bay." },
              { step: "Push Your Cuticles Back", details: "Use cuticle oil and a cuticle pusher for a neat appearance." },
              { step: "File Your Nails", details: "Always file in one direction and avoid applying too much pressure." },
              { step: "Moisturize Your Nails Daily", details: "Apply cuticle oil daily to maintain hydration and nail health." },
              { step: "Polish the Right Way", details: "Start from the center, apply a top coat, and let it dry properly." }
            ]
          }
        ]
      }
    },
    {
      id: 2,
      title: "Nail Trend Forecast 2025",
      description: "Discover the hottest nail trends of 2025, from milky whites to mocha-inspired designs!",
      image: "../images/b21.jpg",
      content: {
        introduction: "Stay ahead of the game with these stylish nail trends for 2025!",
        trends: [
          { name: "Milky White Nails", description: "Low maintenance yet classy. The clean girl aesthetic is here to stay!" },
          { name: "3D Nail Art", description: "Cutesy and girly with floral designs and water droplet effects. Perfect for summer!" },
          { name: "Funky French Nail Art", description: "Reverse French tips, color mixes – the options are endless!" },
          { name: "Mocha Vibes", description: "Inspired by Pantone’s Color of the Year – Mocha Mousse! Cozy browns for a chic look." },
          { name: "Aura Nails", description: "Ethereal and dreamy, capturing the hues of summer mornings and nights." }
        ]
      }
    },
    {
      id: 3,
      title: "How to Apply Press-On Nails",
      description: "Get salon-perfect nails at home with this step-by-step guide to applying press-on nails like a pro!",
      image: "../images/b31.jpg",
      content: {
        introduction: "Press-on nails are an easy and affordable way to achieve stunning nails without a salon visit. Follow this guide to apply them perfectly.",
        steps: [
          { step: "Prep Your Natural Nails", details: "Wash hands, trim and file nails, push cuticles back, and remove oil with alcohol." },
          { step: "Choose the Right Size", details: "Match the press-on nails to your natural nail sizes and adjust if necessary." },
          { step: "Apply Adhesive", details: "Use either nail glue or adhesive tabs for a strong hold." },
          { step: "Attach the Press-On Nail", details: "Align with the cuticle and press firmly for 30 seconds." },
          { step: "Finish and Style", details: "File and shape as needed, and apply a top coat for extra shine." }
        ]
      }
    },
    {
      id: 4,
      title: "How to Remove Press-On Nails",
      description: "Removing press-on nails safely is crucial for keeping your natural nails healthy. Here’s how to do it right!",
      image: "../images/b41.jpeg",
      content: {
        introduction: "Proper removal is essential to avoid nail damage. Follow these steps for safe and easy removal of press-on nails.",
        steps: [
          { step: "Soak Your Nails", details: "Use warm soapy water or acetone to loosen the adhesive." },
          { step: "Gently Lift the Edges", details: "Use a cuticle pusher to lift the edges carefully without forcing." },
          { step: "Remove Residue", details: "Buff away any leftover adhesive and wash your hands thoroughly." },
          { step: "Hydrate Your Nails", details: "Apply cuticle oil or hand cream to restore moisture." }
        ],
        tips: [
          "Avoid water exposure for an hour after application.",
          "Wear gloves while doing chores to prevent lifting.",
          "Apply a fresh top coat every few days for extra durability.",
          "Store leftover press-on nails for reuse."
        ]
      }
    }
  ];
  
const BlogDetails = ()=> {
const { id } = useParams();
const blog=blogs[id-1];


  return (
    <div className="blog-details-container">
      <img src={blog.image} alt={blog.title} className="blog-details-image" />
      <h2 className="blog-details-title">{blog.title}</h2>
      <p className="blog-details-description">{blog.description}</p>
      
      <div className="blog-details-content">
        <p>{blog.content.introduction}</p>
        
        {blog.content.sections &&
          blog.content.sections.map((section, index) => (
            <div key={index} className="blog-section">
              <h3>{section.title}</h3>
              <div>
                {section.content &&
                  section.content.map((point, idx) => <li key={idx}>{point}</li>)}
              </div>
              {section.steps &&
                section.steps.map((step, idx) => (
                  <div key={idx} className="blog-step">
                    <h4>{step.step}</h4>
                    <p>{step.details}</p>
                  </div>
                ))}
            </div>
          ))}

        {blog.content.trends &&
          blog.content.trends.map((trend, index) => (
            <div key={index} className="blog-trend">
              <h3>{trend.name}</h3>
              <p>{trend.description}</p>
            </div>
          ))}

        {blog.content.steps &&
          blog.content.steps.map((step, index) => (
            <div key={index} className="blog-step">
              <h3>{step.step}</h3>
              <p>{step.details}</p>
            </div>
          ))}

        {blog.content.tips && (
          <div className="blog-tips">
            <h3>Tips for Long-Lasting Nails</h3>
            <div>
              {blog.content.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link to="/" className="back-button">Back to Blogs</Link>
      </div>
  );
};

export default BlogDetails;