
import React from "react";
import DropDownList from "../../app/signedin/components/dropdown/dropdown";

const ModalComponent = ({
  showModal,
  header,
  onClose,
  onSubmit,
  isEditing,
  formData,
  setFormData,
  fields,
  items,
  uoms,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (name, selectedValue) => {
    setFormData({ ...formData, [name]: selectedValue });
  };

  const renderFormFields = () => {
    return fields.map((field, index) => {
      if (field.type === "select") {
        const options = field.name === "item_id" 
          ? items.map((item) => ({ value: item.id, label: item.itemname }))
          : uoms.map((uom) => ({ value: uom.id, label: uom.uomname }));

        return (
          <div className="form-group mb-3" key={index}>
            <label>{field.label}</label>
            <DropDownList
              data={options}
              isMulti={false} // Adjust based on your requirement
              selectedValue={formData[field.name]}
              placeholder={`Select ${field.label}`}
              onUpdateSelectedValue={(selectedOption) =>
                handleDropdownChange(field.name, selectedOption?.value)
              }
            />
          </div>
        );
      }

      return (
        <div className="form-group mb-3" key={index}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      );
    });
  };

  return (
    <div
      className={`modal modal-overlay ${showModal ? "d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? "Edit" : "Add"} {header}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{renderFormFields()}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmit(formData)}
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
