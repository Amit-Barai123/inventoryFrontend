
import React, { useState, useEffect } from 'react';
import RecipeList from '../Component/RecipeComponent/RecipeList';
import RecipeForm from '../Component/RecipeComponent/RecipeForm';
import RecipeDetails from '../Component/RecipeComponent/RecipeDetails';
import http from '../http-common';
const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchRecipes = async () => {
    try {
      const { data } = await http.get('/recipes');
      setRecipes(data.recipes);
      
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
    
  }, []);
  
  return (
    <div className="container mt-100">
      <h2 className='text-center'>Recipe page</h2>
  <div className="row">
    <div className="col-md-4 mb-5">
    <button
        className="btn btn-primary mt-3 "
        onClick={() => {
          setSelectedRecipe(null);
          setIsFormVisible(true);
        }}
      >
        + Create Recipe
      </button>
      <RecipeList
        recipes={recipes}
        deleteButtons={true}
        onSelectRecipe={(recipe) => {
          setSelectedRecipe(recipe);
          setIsFormVisible(false);
        }}
        fetchRecipes={fetchRecipes}
      />
      
    </div>
    <div className="col-md-8 mt-5">
      {isFormVisible ? (
        <RecipeForm
          recipe={selectedRecipe}
          fetchRecipes={fetchRecipes}
          onClose={() => setIsFormVisible(false)}
        />
      ) : selectedRecipe ? (
        <RecipeDetails
          recipe={selectedRecipe}
          onEdit={() => setIsFormVisible(true)}
        />
      ) : (
        <h6 className='text-center mt-5 text-bold'>Select a recipe to view details or create a new one.</h6>
      )}
    </div>
  </div>
</div>
  );
};

export default RecipePage;
