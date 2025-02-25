import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import http from "../../http-common";
import useCategory from "../../hooks/useCategory";

const RecipeForm = ({ recipe, fetchRecipes, onClose }) => {
  const [formData, setFormData] = useState({
    recipe_name: recipe?.recipe_name || "",
    description: recipe?.description || "",
    instructions: recipe?.instructions || "",
    comments: recipe?.comments || "",
    is_lc_recipe: recipe?.is_lc_recipe || false,
    category_id: recipe?.category_id || "",
    videoUrls: recipe?.videoUrls || [],
  });

  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(null);
  const category =useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setCategories(category);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVideoUrlChange = (index, value) => {
    const updatedUrls = [...formData.videoUrls];
    updatedUrls[index] = value;
    setFormData({ ...formData, videoUrls: updatedUrls });
  };

  const addVideoField = () => {
    setFormData((prev) => ({ ...prev, videoUrls: [...prev.videoUrls, ""] }));
  };

  const removeVideoField = (index) => {
    const updatedUrls = formData.videoUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, videoUrls: updatedUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("recipe_name", formData.recipe_name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("instructions", formData.instructions);
    formDataToSend.append("comments", formData.comments);
    formDataToSend.append("is_lc_recipe", formData.is_lc_recipe);
    formDataToSend.append("category_id", formData.category_id);
  
    // Append each video URL to the FormData
    formData.videoUrls.forEach((url) => {
      formDataToSend.append("videoUrls[]", url);
    });
  
    if (thumbnail) {
      Array.from(thumbnail).forEach((file) => {
        formDataToSend.append("thumbnail", file);
      });
    }
  
    if (image) {
      Array.from(image).forEach((file) => {
        formDataToSend.append("image", file);
      });
    }
  
    try {
      const endpoint = recipe ? `/recipe/${recipe.id}` : "/recipe";
      const method = recipe ? http.put : http.post;
  
      await method(endpoint, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(`the method is ${method}`);
      toast.success("Recipe submitted successfully!");
      fetchRecipes();
      onClose();
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error("Error submitting recipe!");
    }
  };
  //remove the thumbnail
  const removethumbnail = (fileToRemove) => {
    setThumbnail((prev) => Array.from(prev).filter((file) => file !== fileToRemove));
  };

  const removeImage= (fileToRemove) => {
    setImage((prev) => Array.from(prev).filter((file) => file !== fileToRemove));
  };
  return (
    <form onSubmit={handleSubmit} className="recipe-form p-4 mt-4">
      <h4 className="mb-3">{recipe ? "Edit Recipe" : "Add Recipe"}</h4>

      <div className="mb-3">
        <label htmlFor="recipe_name" className="form-label">
          Recipe Name
        </label>
        <input
          type="text"
          className="form-control"
          id="recipe_name"
          name="recipe_name"
          value={formData.recipe_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="instructions" className="form-label">
          Instructions
        </label>
        <textarea
          className="form-control"
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          rows="4"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="comments" className="form-label">
          Comments
        </label>
        <textarea
          className="form-control"
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category_id" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
         <label htmlFor="is_lc_recipe" className="form-label">
           Is LC Recipe?
         </label>
         <input
           type="checkbox"
           id="is_lc_recipe"
           name="is_lc_recipe"
           checked={formData.is_lc_recipe}
           onChange={handleInputChange}
         />
         </div>
      <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">
          Thumbnail
        </label>
        <input
          type="file"
          className="form-control"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          multiple
          onChange={(e) => setThumbnail(e.target.files)}
        />
        <div className="d-flex flex-wrap mt-2">
          {thumbnail &&
            Array.from(thumbnail).map((file, index) => (
              <div className="d-flex flex-column ">
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Thumbnail Preview"
                className="me-2"
                width={100}
                height={100}
              />
             <div className="mx-auto">
             <button className="btn btn-danger  mt-3" onClick={() => removethumbnail(file)}>Remove</button>
             </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          accept="image/*"
          multiple
          onChange={(e) => setImage(e.target.files)}
        />
        <div className="d-flex flex-wrap mt-2">
          {image &&
            Array.from(image).map((file, index) => (
              <div className="d-flex flex-column ">
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Thumbnail Preview"
                className="me-2"
                width={100}
                height={100}
              />
             <div className="mx-auto">
             <button className="btn btn-danger  mt-3" onClick={() => removeImage(file)}>Remove</button>
             </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-3">
        {formData.videoUrls.map((url, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={url}
              onChange={(e) => handleVideoUrlChange(index, e.target.value)}
              placeholder="Enter YouTube video URL"
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeVideoField(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success mt-2"
          onClick={addVideoField}
        >
          Add Video URL <span className="bi bi-youtube" ></span>
        </button>
      </div>

      <div className="mb-3">
        {formData.videoUrls.map(
          (url, index) =>
            url && (
              <iframe
                key={index}
                width="100%"
                height="200"
                src={url.replace("watch?v=", "embed/")}
                title={`video-${index}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mb-3"
              />
            )
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {recipe ? "Update Recipe" : "Submit Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;


