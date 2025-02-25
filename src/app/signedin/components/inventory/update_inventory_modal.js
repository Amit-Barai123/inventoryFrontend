import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import DropDownList from '../dropdown/dropdown';
import InventoryService from '../../../../services/inventory_service';
import { calendarFormatInModal } from '../../../../common/date_time_utils';
class UpdateInventoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_id: "",
            vendor_id: "",
            uom_id: "",
            quantity: "",
            actualquantity: "",
            price: "",
            received_date: "",
            cost: "",
            invoice_number: "",
        };
    }

    componentDidMount() {
        this.loadInventoryData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.inventory !== this.props.inventory) {
            this.loadInventoryData();
        }
    }

    loadInventoryData = () => {
        const { inventory, items, vendors } = this.props;
        if (inventory) {
            const selectedItem = items.find((item) => item.id === inventory.item_id);
            const selectedVendor = vendors.find((vendor) => vendor.id === inventory.vendor_id);
            this.setState({
                item_id: {
                    value: inventory.item_id,
                    label: selectedItem.itemname,
                },
                vendor_id: {
                    value: inventory.vendor_id,
                    label: selectedVendor.vendorname,
                },
                uom_id: inventory.uom_id,
                quantity: inventory.quantity,
                actualquantity: inventory.actualquantity,
                price: inventory.price,
                received_date: calendarFormatInModal(inventory.received_date),
                cost: inventory.cost,
                invoice_number: {
                    value: inventory.invoice_number,
                    label: inventory.invoice_number
                },
            });
        }
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleItemChange = (selectedItem) => {
        this.setState({ item_id: selectedItem });
    };

    handleVendorChange = (selectedVendor) => {
        this.setState({ vendor_id: selectedVendor });
    };

    handleInvoiceChange = (selectedInvoice) => {
        this.setState({ invoice_number: selectedInvoice });
    };

    handleUpdate = async () => {
        const { fetchInventory, inventory } = this.props;
        const {
            item_id, vendor_id, uom_id,
            quantity, actualquantity, price,
            received_date, cost, invoice_number
        } = this.state;

        const data = {
            item_id: item_id.value, vendor_id: vendor_id.value, uom_id: item_id.uom,
            quantity, actualquantity, price,
            received_date, cost, invoice_number: invoice_number.value
        };

        try {
            await InventoryService.updateInventory(inventory.id, data);
            fetchInventory();
            toast.success("Inventory updated successfully");
            this.props.onHide();
        } catch (e) {
            console.log(e);
            toast.error("Failed to update inventory.");
        }
    };

    render() {
        const { show, onHide, items, vendors, uoms, invoices } = this.props;
        const {
            item_id, vendor_id, uom_id,
            quantity, actualquantity, price,
            received_date, cost, invoice_number
        } = this.state;

        return (
            <Modal show={show} onHide={onHide} centered>
                <div className="modal-content" style={{ width: '600px' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Update Inventory Item</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="item_id">Item</label>
                                <DropDownList
                                    name="item_id"
                                    placeholder="Select Item"
                                    data={items.map((item) => ({
                                        value: item.id,
                                        label: item.itemname,
                                        uom: item.uomid
                                    }))}
                                    onUpdateSelectedValue={this.handleItemChange}
                                    selectedValue={item_id}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="vendor_id">Vendor</label>
                                <DropDownList
                                    name="vendor_id"
                                    placeholder="Select Vendor"
                                    data={vendors.map((vendor) => ({
                                        value: vendor.id,
                                        label: vendor.vendorname,
                                    }))}
                                    onUpdateSelectedValue={this.handleVendorChange}
                                    selectedValue={vendor_id}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="form-group mt-3 mt-md-0 col-md-6">
                                <label htmlFor="uom_id" className='mb-1'>Unit of Measurement (UOM)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="uom_id"
                                    id="uom_id"
                                    placeholder="Unit of Measurement"
                                    value={uoms.find((uom) => uom.id === uom_id)?.uomname || ""}
                                    readOnly
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="invoice_number">Invoice Number</label>
                                <DropDownList
                                    name="invoice_number"
                                    placeholder="Select Invoice Number"
                                    data={invoices.map((invoice) => ({
                                        value: invoice.invoice_number,
                                        label: invoice.invoice_number,
                                    }))}
                                    onUpdateSelectedValue={this.handleInvoiceChange}
                                    selectedValue={invoice_number}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    id="quantity"
                                    value={quantity}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="actualquantity">Actual Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="actualquantity"
                                    id="actualquantity"
                                    value={actualquantity}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="cost">Cost</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="cost"
                                    id="cost"
                                    value={cost}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label htmlFor="received_date">Received Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="received_date"
                                    id="received_date"
                                    value={received_date}
                                    onChange={this.handleInputChange}
                                />
                            </div>
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
                            onClick={this.handleUpdate}
                        >
                            Update Inventory
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default UpdateInventoryModal;