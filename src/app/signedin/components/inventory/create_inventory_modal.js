import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import ItemService from '../../../../services/items_service';
import VendorService from '../../../../services/vendors_service';
import UomService from '../../../../services/uom_service';
import InvoiceService from '../../../../services/invoices_service';
import DropDownList from '../dropdown/dropdown';
import InventoryService from '../../../../services/inventory_service';
import http from '../../../../http-common';

class CreateInventoryModal extends Component {
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
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleItemChange = (selectedItem) => {
        this.setState({
            item_id: selectedItem,
        });
    };

    handleVendorChange = (selectedVendor) => {
        this.setState({ vendor_id: selectedVendor });
    };

    handleInvoiceChange = (selectedInvoice) => {
        this.setState({ invoice_number: selectedInvoice });
    };

    handleCreate = async () => {
        const { fetchInventory } = this.props;
        const {
            item_id, vendor_id, uom_id,
            quantity, actualquantity, price,
            received_date, cost, invoice_number
        } = this.state;

        const data = {
            item_id: item_id.value,
            vendor_id: vendor_id.value,
            uom_id: item_id.uom,
            quantity,
            actualquantity,
            price,
            received_date,
            cost,
            invoice_number: invoice_number.value
        };
        const storedata = {
            itemid: item_id.value,
            quantity: actualquantity
        }

        const transactionData = {
            date: received_date,
            item_id: item_id.value,
            credit_quantity: actualquantity,
            invoice_no: invoice_number.value,
            vendor_id: vendor_id.value,
            uom_id: item_id.uom
        }

        try {
            await InventoryService.createInventory(data);
            const Response = await http.post(`/increase-quantity`, storedata);
            const Transction=await http.post(`/transaction`,transactionData);
            console.log(`the response of inventory store is ${JSON.stringify(Response)}`)
            console.log(`the going transcation data is is ${JSON.stringify(transactionData)}`)
            console.log(`the transcation data from backend ${JSON.stringify(Transction)}`)



            fetchInventory();
            toast.success("Inventory created successfully");
            this.resetForm();
            this.props.onHide();
        } catch (e) {
            console.log(e);
            toast.error("Failed to create inventory.");
        }

    };

    resetForm = () => {
        this.setState({
            item_id: "",
            vendor_id: "",
            uom_id: "",
            quantity: "",
            actualquantity: "",
            price: "",
            received_date: "",
            cost: "",
            invoice_number: "",
        });
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
                        <h5 className="modal-title">Create Inventory Item</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="item_id" className='mb-2'>Item</label>
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
                                <div className="form-group mt-3">
                                    <label htmlFor="vendor_id" className='mb-2'>Vendor</label>
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
                                <div className="form-group mt-3">
                                    <label htmlFor="quantity" className='mb-2'>Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        id="quantity"
                                        placeholder="Enter Quantity"
                                        value={quantity}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="received_date" className='mb-2'>Received Date</label>
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
                            <div className="col-md-6">
                                <div className="form-group mt-3 mt-md-0">
                                    <label htmlFor="uom_id" className='mb-2'>Unit of Measurement (UOM)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="uom_id"
                                        id="uom_id"
                                        placeholder="Unit of Measurement"
                                        value={uoms.find((uom) => uom.id === item_id.uom)?.uomname || ""}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="actualquantity" className='mb-12px'>Actual Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control h-38"
                                        name="actualquantity"
                                        id="actualquantity"
                                        placeholder="Enter Actual Quantity"
                                        value={actualquantity}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="price" className='mb-2'>Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        id="price"
                                        placeholder="Enter Price"
                                        value={price}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="cost" className='mb-2'>Cost</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="cost"
                                        id="cost"
                                        placeholder="Enter Cost"
                                        value={cost}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="invoice_number" className='mb-2'>Invoice Number</label>
                            <DropDownList
                                name="invoice_number"
                                placeholder="Select Invoice Number"
                                data={invoices.map((invoice) => ({
                                    value: invoice.invoice_number,
                                    label: invoice.invoice_number,
                                }))}
                                onUpdateSelectedValue={this.handleInvoiceChange}
                                selectedValue={invoice_number}
                                menuPlacement="top"
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
                            Create Inventory
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateInventoryModal;
