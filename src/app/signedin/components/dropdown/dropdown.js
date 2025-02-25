import React, { Component } from "react";
import Select from "react-select";

class DropDownList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.selectedValue || (this.props.isMulti ? [] : ""),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedValue !== this.props.selectedValue) {
      this.setState({
        selectedValue: this.props.selectedValue || (this.props.isMulti ? [] : "")
      });
    }
  }

  handleChange = (selectedOptions) => {
    this.setState({
        selectedValue: selectedOptions, // Store the array of selected options directly
    });
    this.props.onUpdateSelectedValue(selectedOptions); // Pass the array to the parent
};


  render() {
    const { selectedValue } = this.state;
    const { data, placeholder, width, placeholderColor, menuPlacement, isMulti } = this.props;

    return (
      <div className={`DropDownList m-1 ${width ? `w-${width}` : ""}`}>
        <Select
          className="dropdown"
          placeholder={placeholder}
          value={selectedValue} // Use the selected array directly for multi-select
          options={data}
          onChange={this.handleChange}
          isMulti={isMulti}
          isClearable
          styles={{
            control: (provided) => ({
              ...provided,
              cursor: 'pointer',
            }),
            placeholder: (provided) => ({
              ...provided,
              color: placeholderColor || '#6c757d',
            }),
            menu: (provided) => ({
              ...provided,
              overflow: "hidden",
            }),
            menuList: (provided) => ({
              ...provided,
              maxHeight: 200,
              overflowY: "auto",
            }),
          }}
          menuPlacement={menuPlacement || "auto"}
        />
      </div>
    );
  }
}

export default DropDownList;
