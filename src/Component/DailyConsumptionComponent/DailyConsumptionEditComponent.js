
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import http from "../../http-common";

const DailyConsumptionEditComponent = ({ ReleasedItem, onClose , id }) => {
  const [showModal, setShowModal] = useState(true);
  const [actualQuantities, setActualQuantities] = useState({});

  // Update actual quantity for a specific item
  const handleActualQuantityChange = (item_Id, value) => {
    setActualQuantities((prev) => ({
      ...prev,
      [item_Id]: value,
    }));
  };

  // Populate actual quantities when the modal opens
  useEffect(() => {
    if (ReleasedItem && ReleasedItem.length > 0) {
      const initialQuantities = ReleasedItem.reduce((acc, item) => {
        acc[item.id] = item.actualQty || "";  // Set to actualQty or empty string
        return acc;
      }, {});
      setActualQuantities(initialQuantities);
    }
  }, [ReleasedItem]); // This effect runs when ReleasedItem changes

  const handleItemsUpdates = async () => {
    const itemsforUpdate = (ReleasedItem || []).map((item) => ({
      item_Id: item.id,
      actualQty: actualQuantities[item.id] || item.actualQty,
    }));

    if (itemsforUpdate.length === 0) {
      toast.warning("No items to update.");
      return;
    }
    console.log(`the released item whose id i want is ${JSON.stringify(ReleasedItem)}`)
    const ReleasedItemsId = ReleasedItem.id;
    console.log(`The released item ID is ${ReleasedItemsId}`);
    

    try {
        
        console.log(`the items for update  is ${JSON.stringify(itemsforUpdate)}`);
      const response = await http.put(`/updateQty/${id}`, {
        items: itemsforUpdate,
      });
      console.log("Items successfully updated:", response.data);
      if (response.data.success) {
        toast.success("Items successfully updated!");
        setActualQuantities({});  // Reset quantities after update
      }
    } catch (error) {
      toast.error("Failed to update quantities...");
      console.error("Error updating quantities:", error);
    }
  };

  const handleCloseEdit = () => {
    setShowModal(false); // Close the modal
    if (onClose) onClose(); // If onClose prop exists, call it
  };

  return (
    <div
      className={`modal ${showModal ? "d-block" : "d-none"}`}
     
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Consumption</h5>
          </div>
          <div className="modal-body">
            {ReleasedItem?.length > 0 && (
              <>
                <table className="table table-bordered table-striped">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>Item Name</th>
                      <th>Reference Qty</th>
                      <th>Actual Qty</th>
                      <th>UOM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ReleasedItem.map((ingredient) => (
                      <tr key={ingredient.id}>
                        <td>{ingredient.Item?.itemname || ingredient.id}</td>
                        <td>{ingredient.referenceQty}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={actualQuantities[ingredient.id] || ""}
                            onChange={(e) =>
                              handleActualQuantityChange(
                                ingredient.id,
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>{ingredient.uomname}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary"
                    onClick={handleItemsUpdates}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleCloseEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyConsumptionEditComponent;

