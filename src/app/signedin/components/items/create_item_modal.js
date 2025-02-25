
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import UomService from '../../../../services/uom_service';
import ItemService from '../../../../services/items_service';
import DropDownList from '../dropdown/dropdown';

class CreateItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemname: "",
            threshold: "", // Added threshold field
            uoms: [],
            selectedUom: null,
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleUomChange = (selectedUom) => {
        this.setState({ selectedUom: selectedUom });
    };

    handleCreate = async () => {
        const { fetchItems } = this.props;
        const { itemname, threshold, selectedUom } = this.state;
        const data = {
            itemname: itemname,
            threshold: threshold, // Added threshold field to request
            uomid: selectedUom.value
        };

        try {
            await ItemService.createItem(data);
            fetchItems();
            toast.success("Item created successfully");
            this.props.onHide();
        } catch (e) {
            console.log(e);
            toast.error("Failed to create Item.");
        }
    };

    render() {
        const { show, onHide, uoms } = this.props;
        const { itemname, threshold, selectedUom } = this.state;

        return (
            <Modal show={show} onHide={onHide}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Item</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body mb-3">
                        <div className="form-group">
                            <label htmlFor="itemname" className='mb-2'>Item Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="itemname"
                                name="itemname"
                                placeholder="Enter Item name"
                                value={itemname}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="threshold" className='mb-2'>Threshold</label>
                            <input
                                type="text"
                                className="form-control"
                                id="threshold"
                                name="threshold"
                                placeholder="Enter Threshold"
                                value={threshold}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="uom" className='mb-2'>Select UOM</label>
                            <DropDownList
                                name="selectedUom"
                                placeholder="Select UOM"
                                data={uoms.map((uom) => ({
                                    value: uom.id,
                                    label: uom.uomname,
                                }))}
                                onUpdateSelectedValue={this.handleUomChange}
                                selectedValue={selectedUom}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onHide}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleCreate}
                        >
                            Create Item
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateItemModal;
