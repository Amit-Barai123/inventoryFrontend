import React, { useState, useEffect } from "react";
import http from "../http-common";
import { toast } from "react-toastify";
import useCategory from "../hooks/useCategory";
import useRecipe from "../hooks/useRecipe";
import { RecipeTable } from "../Component/DailyConsumptionComponent/DailyConsumptionViewTable";
import CalendarComponent from "../Component/SharedComponent/CalendarComponent";
import DropDownList from "../app/signedin/components/dropdown/dropdown";
import ConsumptionDays from "../Component/ConsumptionDays/ConsumptionDays";
const DailyConsumptionPage = () => {
  const [consumptionDays, setConsumptionDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dailyConsumptions, setDailyConsumptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [actualQuantities, setActualQuantities] = useState({});
  const [adultsCount, setAdultCount] = useState("");
  const [childrenCount, setChildernCount] = useState("");
  const [date, setDate] = useState();
  const [categoryname, setCategoryname] = useState("");
  const [Recipename, setRecipename] = useState("");
  const [ReleasedItem, setReleasedItem] = useState([]);
  const Recipe = useRecipe();
  const category = useCategory();

  useEffect(() => {
    const fetchData = async () => {
      const [daysResponse] = await Promise.all([http.get("/consumption-days")]);
      setConsumptionDays(daysResponse.data.consumptionDays);
      console.log(`the all the consumption days is ${daysResponse.data.consumptionDays}`)
    };
    fetchData();
    fetchingData();
  }, [Recipe,category]);

  const fetchingData = () => {
    setRecipe(Recipe);
    setCategories(category);
  };
  useEffect(() => {
    if (selectedDay) {
      const selectedDate = new Date(consumptionDays.find(day => day.id === selectedDay)?.date);
      if (selectedDate) {
        handleSelectDate(selectedDate);
      }
    }
  }, [selectedDay, consumptionDays]);

  const handleSelectDate = async (date) => {
    const day = consumptionDays.find(
      (day) =>
        new Date(day.date).toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
    if (day) {
      setSelectedDay(day.id);
      setAdultCount(day.adults_count);
      setChildernCount(day.children_count);
      setDate(new Date(day.date).toISOString().split("T")[0]);
      try {
        const response = await http.get(`/allconsumption/${day?.id}`);
        if (response.data.success === true) {
          setDailyConsumptions(response?.data?.data);
        } else {
          console.log("no data found");
          setDailyConsumptions([]);
        }

      } catch {
        setDailyConsumptions([]);
      }
    }
  };

  const GetIngredientsData = async () => {
    try {
      const DataFromReleased = await http.get(
        `getdaily-consumption/${selectedDay}/${categoryId}/${recipeId}`
      );

      if (DataFromReleased.data.success === false) {
        // Fetch ingredients for the recipe when not found in daily consumption
        const response = await http.get(`/ingredient/${recipeId}`);
        setRecipeIngredients(
          response.data.ingredients.map((ingredient) => ({
            ...ingredient,
            actual_qty: "", // Allow input for actual quantities
            editable: true, // Mark as editable
          }))
        );
        setReleasedItem([]);

        // Initialize actual quantities for the ingredients
        const initialQuantities = response.data.ingredients.reduce(
          (acc, ingredient) => ({
            ...acc,
            [ingredient.id]: "",
          }),
          {}
        );
        setActualQuantities(initialQuantities);
      } else if (DataFromReleased.data.success === true) {
        alert("data already exist");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleQuantityChange = (ingredientId, value) => {
    setActualQuantities((prev) => ({
      ...prev,
      [ingredientId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {

      // Prepare the data for decreasing quantities
      const decreaseData = recipeIngredients
        .filter((ingredient) => ingredient.editable)
        .map((ingredient) => ({
          itemid: ingredient.item_id,
          quantity: actualQuantities[ingredient.id] || 0,
        }));

      const dataToSubmit = recipeIngredients
        .filter((ingredient) => ingredient.editable)
        .map((ingredient) => ({
          item_Id: ingredient.item_id,
          referenceQty: ingredient.reference_qty,
          uomname: ingredient.Item.Uom.uomname,
          actualQty: actualQuantities[ingredient.id] || 0,
        }));

        const debitRecords = recipeIngredients
        .filter((ingredient) => ingredient.editable)
        .map((ingredient) => ({
          date: date,
          item_id: ingredient.item_id,
          debit_quantity: actualQuantities[ingredient.id] || 0,
          recipe_id: recipeId,
          category_id: categoryId,
          uom_id: ingredient.Item?.Uom?.id || 1
        }));
      console.log(`the debit records going to database is ${JSON.stringify(debitRecords)}`);
      // Make API call to decrease quantities
      const decreaseResponse = await http.post("/decrease-quantity", {
        items: decreaseData,
      });

      const transaction = await http.post("/bulk-transaction", {
        transactions: debitRecords,
      });

      console.log(`the transctions while releasing items is ${JSON.stringify(transaction)}`);


      if (decreaseResponse.data.message === "Bulk update completed") {
        await http.post("/createdaily-consumption", {
          dateId: selectedDay,
          categoryId: categoryId,
          recipeId: recipeId,
          ingredients: dataToSubmit,
        });

        const response = await http.get(`/allconsumption/${selectedDay}`);
        setDailyConsumptions(response?.data?.data);
        toast.success("Data submitted successfully!");
        setShowModal(false);
        setRecipeIngredients([]);
        setActualQuantities({});
        toast.success("Quantities decreased successfully!");
      } else {
        toast.error("Error decreasing quantities.");
      }





    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data.");
    }
  };
  const handleRecipe = () => {
    setShowModal(true);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryId(selectedOption?.id || null);
    setCategoryname(selectedOption?.value || "");
  };

  const handleRecipeChange = (selectedOption) => {
    setRecipeId(selectedOption?.id || null);
    setRecipename(selectedOption?.value || "");
  };

  return (
    <div style={{ marginTop: "20vh" }} className="container">
      <h2 className="text-center">Consumption page</h2>
      <div className="row">
        <div className="col-md-4">
          <h5 className="text-center">Consumption Days</h5>
          <CalendarComponent
            consumptionDays={consumptionDays}
            onDateSelect={handleSelectDate}
          />
          <button className="btn btn-success w-100 mt-2" onClick={handleRecipe}>
            Add Recipe
          </button>
        </div>
        <div className="col-md-8">
          <h5 className="mb-4 text-center">Daily Consumption Details</h5>
          <ConsumptionDays
            date={date}
            adultsCount={adultsCount}
            childrenCount={childrenCount}
          />
          <RecipeTable data={dailyConsumptions} />

          {selectedDay && (
            <div>
              {/* Modal Section */}
              <div
                className={`modal modal-overlay ${showModal ? "d-block" : "d-none"}`}
                tabIndex="-1"
                role="dialog"

              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Daily Consumption</h5>
                    </div>
                    <div className="modal-body">
                      <label htmlFor="CategoryId" className="col-form-label">Category</label>
                      <DropDownList
                        data={categories.map(cat => ({ id: cat.id, value: cat.category, label: cat.category }))}
                        placeholder="Select Category"
                        isMulti={false}
                        selectedValue={categoryId ? { id: categoryId, value: categoryname, label: categoryname } : null}
                        onUpdateSelectedValue={handleCategoryChange}
                      />

                      <label htmlFor="RecipeId" className="col-form-label">Recipe</label>
                      <DropDownList
                        data={recipe.map(r => ({ id: r.id, value: r.recipe_name, label: r.recipe_name }))}
                        placeholder="Select Recipe"
                        isMulti={false}
                        selectedValue={recipeId ? { id: recipeId, value: Recipename, label: Recipename } : null}
                        onUpdateSelectedValue={handleRecipeChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        onClick={GetIngredientsData}
                        className="btn btn-primary mt-2"
                      >
                        Fetch Ingredients
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      {/* Table to Display Ingredients */}
                      {recipeIngredients.length > 0 && (
                        <>
                          <table className="table table-bordered table-striped table-responsive">
                            <thead className="bg-dark text-white">
                              <tr>
                                <th>Item Name</th>
                                <th>Reference Qty</th>
                                <th>Actual Qty</th>
                                <th>UOM</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recipeIngredients.map((ingredient) => (
                                <tr key={ingredient.id}>
                                  <td>
                                    {ingredient.Item?.itemname || ingredient.id}
                                  </td>
                                  <td>{ingredient.reference_qty}</td>
                                  <td>
                                    {ingredient.editable ? (
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={
                                          actualQuantities[ingredient.id] || ""
                                        }
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            ingredient.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ) : (
                                      ingredient.actual_qty
                                    )}
                                  </td>
                                  <td>
                                    {ingredient.Item?.Uom?.uomname ||
                                      ingredient.uomname}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {recipeIngredients.some((ing) => ing.editable) && (
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-success me-2"
                                onClick={handleSubmit}
                              >
                                Release Item
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DailyConsumptionPage;
