import React, { useState } from 'react';
import http from '../../http-common';
import { toast } from 'react-toastify';
const RecipeList = ({ recipes, onSelectRecipe, fetchRecipes,deleteButtons }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleDelete = async (id) => {
    try {
      const {data}=await http.delete(`/recipe/${id}`);
      console.log(`the data of deleting is ${data}`)
      fetchRecipes();
      if (data.success) {
        toast.success(data.success.message || data.message);
      } else {
        toast.error(data.error.message || data.error);
      }
      
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  // Group recipes by category
  const groupedRecipes = recipes.reduce((acc, recipe) => {
    const category = recipe.RecipeCategory.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(recipe);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="accordion" id="recipeAccordion">
      {Object.keys(groupedRecipes).map((category, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading-${index}`}>
            <button
              className={`accordion-button ${activeCategory === category ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleCategory(category)}
              aria-expanded={activeCategory === category}
              aria-controls={`collapse-${index}`}
            >
              {category}
            </button>
          </h2>
          <div
            id={`collapse-${index}`}
            className={`accordion-collapse collapse ${activeCategory === category ? 'show' : ''}`}
            aria-labelledby={`heading-${index}`}
            data-bs-parent="#recipeAccordion"
          >
            <div className="accordion-body">
              <ul className="list-group">
                {groupedRecipes[category].map((recipe) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={recipe.id}
                  >
                    <span>{recipe.recipe_name}</span>
                    <div>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => onSelectRecipe(recipe)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                     {
                      deleteButtons===true && (
                        <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      )
                     }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
