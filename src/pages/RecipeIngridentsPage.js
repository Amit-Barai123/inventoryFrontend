
import React, { useState, useEffect } from "react";
import http from "../http-common";
import { toast } from "react-toastify";
import RecipeList from "../Component/RecipeComponent/RecipeList";
import TableComponent from "../Component/SharedComponent/TableComponent";
import ModalComponent from "../Component/SharedComponent/ModelComponent";


const RecipeIngridentsPage = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeIngridents, setRecipeIngridents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    item_id: "",
    reference_qty: "",
  });
  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const [recipeResponse, itemsResponse, uomsResponse] = await Promise.all([
        http.get("/recipes"),
        http.get("/items"),
        http.get("/uoms"),
      ]);
      setRecipeList(recipeResponse.data.recipes);
      setItems(itemsResponse.data.items);
      setItems(itemsResponse.data.items);
      setUoms(uomsResponse.data.uom);
    } catch (error) {
      toast.error( error.message || "Error fetching data:" );
    }
  };

  const handleSelectRecipe = async (recipe) => {
    setSelectedRecipe(recipe.id);
    try {
      const response = await http.get(`/ingredient/${recipe.id}`);
      setRecipeIngridents(response.data.ingredients);
      toast.success(response.data.message);
    } catch {
      setRecipeIngridents([]);
    }
  };

  const handleAddDailyConsumption = async (data) => {
    let response;
    try {
      if (isEditing) {
        response = await http.put(`ingredient/${editId}`, {
          ...data,
          recipe_id: selectedRecipe,
        });
        toast.success(response.data.message || "Record updated successfully");
      } else {
        response = await http.post("/ingredient", {
          ...data,
          recipe_id: selectedRecipe,
        });
        toast.success(response.data.message || "Record added successfully");
      }
      handleSelectRecipe({ id: selectedRecipe }); // Refresh the list
      setFormData({ item_id: "", reference_qty: "" }); // Reset form
      setShowModal(false);
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const openModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setFormData({ item_id: "", reference_qty: "" });
  };

  const openEditModal = (consumption) => {
    setShowModal(true);
    setIsEditing(true);
    setEditId(consumption.id);
    setFormData({
      item_id: consumption.item_id,
      reference_qty: consumption.reference_qty,
    });
  };

  const handleDeleteConsumption = async (id) => {
    const response = await http.delete(`/ingredient/${id}`);
    toast.success(response.data.message);
    handleSelectRecipe({ id: selectedRecipe }); // Refresh list
  };

  const columns = [
    { key: "Item.itemname", label: "Ingredients" },
    { key: "reference_qty", label: "Reference Quantity" },
    { key: "Item.Uom.uomname", label: "UOM" },
  ];

  const modalFields = [
    { name: "item_id", label: "Item", type: "select" },
    { name: "reference_qty", label: "Reference Quantity", type: "number" },

  ];

  return (
    <div style={{ marginTop: "20vh" }} className="container">
       <h2 className="text-center mb-12">Recipe Ingredients Page</h2>
      <div className="row">
        <div className="col-md-4">
          <h5 className="text-center">Recipe List</h5>
          <RecipeList
            recipes={recipeList}
            onSelectRecipe={handleSelectRecipe}
            fetchRecipes={fetchRecipes}
          />
        </div>

        <div className="col-md-8">
          <h5 className="text-center">Recipe Ingredients</h5>
          {selectedRecipe && (
            <div>
              <button onClick={openModal} className="btn btn-success mb-2">
                Add Recipe Ingredients <i className="bi bi-plus-circle-fill"></i>
              </button>
              <TableComponent
                data={recipeIngridents}
                columns={columns}
                onEdit={openEditModal}
                onDelete={handleDeleteConsumption}
                Action={true}
              />
            </div>
          )}
        </div>
      </div>

      <ModalComponent
        showModal={showModal}
        header={"Recipe Ingredients"}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddDailyConsumption}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        fields={modalFields}
        items={items}
        uoms={uoms}
      />
    </div>
  );
};

export default RecipeIngridentsPage;
