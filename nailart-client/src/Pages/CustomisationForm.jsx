import React, { useState } from "react";
import './CustomisationForm.css'; // If using custom CSS
import Navbar from "../Components/Navbar"
const CustomisationForm = () => {
  const [formData, setFormData] = useState({
    color: "#ffffff",
    shape: "",
    length: "",
    image: null,
    description: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file
      }));

      // Show image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can handle actual form submit here
  };

  return (
    <>
    <Navbar/>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Customisation Form</h2>

        <div className="form-group">
          <label className="form-label">Pick a Color</label>
          <div className="color-picker">
            <input required
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="form-input"
            />
            <span className="color-hex">{formData.color}</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Select Shape</label>
          <select
            name="shape"
            value={formData.shape}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>Select shape</option>
            <option value="Square">Square</option>
            <option value="Almond">Almond</option>
            <option value="Round">Round</option>
            <option value="Coffin">Coffin</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Select Length</label>
          <select
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>Select length</option>
            <option value="Short">Short</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="form-file"
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-textarea"
            placeholder="Add more details about the nails..."
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default CustomisationForm;
