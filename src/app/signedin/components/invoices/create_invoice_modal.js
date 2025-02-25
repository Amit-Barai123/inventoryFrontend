import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import DropDownList from '../dropdown/dropdown';
import InvoiceService from '../../../../services/invoices_service';

class CreateInvoiceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice_number: "",
            vendor_id: "",
            invoice_date: "",
            received_date: "",
            waybill_number: "",
            vehicle_number: "",
            received_by: "",
            cgst: "",
            sgst: "",
            gst: "",
            total_amount: "",
            vendors: [],
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleVendorChange = (selectedVendor) => {
        this.setState({ vendor_id: selectedVendor });
    };

    handleCreate = async () => {
        const { fetchInvoices } = this.props;
        const {
            invoice_number, vendor_id, invoice_date,
            received_date, waybill_number, vehicle_number,
            received_by, cgst, sgst, gst, total_amount
        } = this.state;
    
        if (!vendor_id || !vendor_id.value) {
            toast.error("Please select a valid vendor.");
            return;
        }
    
        const data = {
            invoice_number,
            vendor_id: vendor_id.value,
            invoice_date,
            received_date,
            waybill_number,
            vehicle_number,
            received_by,
            cgst,
            sgst,
            gst,
            total_amount
        };
    
        try {
            await InvoiceService.createInvoice(data);
            fetchInvoices();
            toast.success("Invoice created successfully");
            this.resetForm();
            this.props.onHide();
        } catch (e) {
            console.error(e);
            toast.error("Failed to create invoice.");
        }
    };
    
    resetForm = () => {
        this.setState({
            invoice_number: "", vendor_id: "", invoice_date: "",
            received_date: "", waybill_number: "", vehicle_number: "",
            received_by: "", cgst: "", sgst: "", gst: "", total_amount: "",
        });
    };

    render() {
        const { show, onHide, vendors } = this.props;
        const {
            invoice_number, vendor_id, invoice_date,
            received_date, waybill_number, vehicle_number,
            received_by, cgst, sgst, gst, total_amount
        } = this.state;

        return (
            <Modal show={show} onHide={onHide} centered>
                <div className="modal-content" style={{ width: '600px' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Create Invoice</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="invoice_number" className='mb-2'>Invoice Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="invoice_number"
                                        id="invoice_number"
                                        placeholder="Enter Invoice Number"
                                        value={invoice_number}
                                        onChange={this.handleInputChange}
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
                                    <label htmlFor="invoice_date" className='mb-2'>Invoice Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="invoice_date"
                                        id="invoice_date"
                                        value={invoice_date}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3 mt-md-0">
                                    <label htmlFor="waybill_number" className='mb-2'>Waybill Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="waybill_number"
                                        id="waybill_number"
                                        placeholder="Enter Waybill Number"
                                        value={waybill_number}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="vehicle_number" className='mb-2'>Vehicle Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="vehicle_number"
                                        id="vehicle_number"
                                        placeholder="Enter Vehicle Number"
                                        value={vehicle_number}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="received_by" className='mb-2'>Received By</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="received_by"
                                        id="received_by"
                                        placeholder="Enter Received By"
                                        value={received_by}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className='col-md-6'>
                                <div className="form-group">
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

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="cgst" className='mb-2'>CGST</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="cgst"
                                        id="cgst"
                                        placeholder="Enter CGST Amount"
                                        value={cgst}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="sgst" className='mb-2'>SGST</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sgst"
                                        id="sgst"
                                        placeholder="Enter SGST Amount"
                                        value={sgst}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="gst" className='mb-2'>GST</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="gst"
                                        id="gst"
                                        placeholder="Enter GST Amount"
                                        value={gst}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="total_amount" className='mb-2'>Total Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="total_amount"
                                        id="total_amount"
                                        placeholder="Enter Total Amount"
                                        value={total_amount}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
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
                            onClick={this.handleCreate}
                        >
                            Create Invoice
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateInvoiceModal;
