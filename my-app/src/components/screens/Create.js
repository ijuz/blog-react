import axios from 'axios';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './create.css';

function Create() {
  const [title, setTitle] = useState('');
  const [short_description, setShort_description] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState('');
  const [featured_image, setFeatured_image] = useState(null);
  const [is_draft, setIs_draft] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { userdata } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    if (!short_description.trim()) {
      errors.short_description = 'Short description is required';
    }
    if (!description.trim()) {
      errors.description = 'Description is required';
    }
    if (!categories.trim()) {
      errors.categories = 'Categories is required';
    }

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('short_description', short_description);
      formData.append('description', description);
      formData.append('categories', categories);
      if (featured_image) formData.append('featured_image', featured_image);

      const endpoint = 'http://127.0.0.1:8000/api/v1/blog/create/';

      axios
        .post(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${userdata?.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate('/myprofile');
        })
        .catch((error) => {
          console.error('Error:', error.response);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="create-page">
      <form onSubmit={handleSubmit} className="form-page">
        <div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div>
          <input
            type="text"
            value={short_description}
            placeholder="Short Description"
            onChange={(e) => setShort_description(e.target.value)}
          />
          {errors.short_description && <span className="error">{errors.short_description}</span>}
        </div>
        <div>
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="cata">
          <input
            type="text"
            className="ctat-box"
            placeholder="Categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
          {errors.categories && <span className="error">{errors.categories}</span>}
          <input
            type="file"
            className="filed"
            onChange={(e) => setFeatured_image(e.target.files[0])}
          />
        </div>
        <div>
          <span>Draft</span>
          <input
            type="checkbox"
            className="check"
            checked={is_draft}
            onChange={(e) => setIs_draft(e.target.checked)}
          />
        </div>
        <div>
          <button className="submi-btn" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
