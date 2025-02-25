
import React, { useState } from "react";
import http from "../../http-common";
import DailyConsumptionEditComponent from "./DailyConsumptionEditComponent";

export const RecipeTable = ({ data }) => {
  const [editRecipe, setEditRecipe] = useState(null); 
  const [recipeId,setRecipeId]=useState(Number);
  
  const categoryOrder = { Breakfast: 1, Launch: 2, Dinner: 3,  };

  const sortedData = [...data].sort(
    (a, b) =>
      categoryOrder[a.RecipeCategory.category] - categoryOrder[b.RecipeCategory.category]
  );

 
  const deleteRecipe = async (dateId, categoryId, recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await http.delete(
          `/daily-consumption/${dateId}/${categoryId}/${recipeId}`
        );
        alert(response.data.message);
        window.location.reload(); // Refresh the page to reflect changes
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete the recipe.");
      }
    }
  };

  const handleEdit = (recipe) => {
    setEditRecipe(recipe); 
    setRecipeId(recipe.id);
    console.log(`the recipe going to edit is  ${JSON.stringify(recipe)}`)
  };

  

  const closeModal = () => {
    setEditRecipe(null); // Close the modal
  };

  return (
    <div className={`container ${editRecipe ? "modal-active" : ""}`}>
      
      {sortedData.map((recipe) => (
        <div key={recipe.id} className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              {recipe.RecipeCategory.category} - {recipe.Recipe.recipe_name}
            </h5>
            <div>
              <button
                className="btn btn-warning btn-sm me-2 bi bi-pencil-fill"
                onClick={() => handleEdit(recipe)}
              ></button>
              <button
                className="btn btn-danger btn-sm bi bi-trash-fill"
                onClick={() =>
                  deleteRecipe(recipe.dateId, recipe.categoryId, recipe.recipeId)
                }
              ></button>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Item Name (UOM)</th>
                  <th>Reference Quantity</th>
                  <th>Actual Quantity</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ReleasedItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.Item.itemname} ({item.uomname})
                    </td>
                    <td>{item.referenceQty}</td>
                    <td>{item.actualQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Render the modal when a recipe is being edited */}
      {editRecipe && (
        <DailyConsumptionEditComponent
          ReleasedItem={editRecipe.ReleasedItems}
          onClose={closeModal}
          id={recipeId}
        />
      )}
    </div>
  );
};
