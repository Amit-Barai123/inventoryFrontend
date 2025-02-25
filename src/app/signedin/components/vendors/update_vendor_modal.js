import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import VendorService from '../../../../services/vendors_service';

class UpdateVendorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorname: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            gstnumber: "",
            contactnumber: "",
            email: "",
            altcontactnumber: "",
        };
    }

    componentDidMount() {
        this.loadVendorData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.vendor !== this.props.vendor) {
            this.loadVendorData();
        }
    }

    loadVendorData = () => {
        const { vendor } = this.props;
        if (vendor) {
            this.setState({
                vendorname: vendor.vendorname,
                address: vendor.address,
                city: vendor.city,
                state: vendor.state,
                country: vendor.country,
                pincode: vendor.pincode,
                gstnumber: vendor.gstnumber,
                contactnumber: vendor.contactnumber,
                email: vendor.email,
                altcontactnumber: vendor.altcontactnumber,
            });
        }
    };

    resetForm = () => {
        this.setState({
            vendorname: "", address: "", city: "", state: "",
            country: "", pincode: "", gstnumber: "",
            contactnumber: "", email: "", altcontactnumber: "",
        });
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleUpdate = async () => {
        const { fetchVendors, vendor } = this.props;
        const {
            vendorname, address, city, state,
            country, pincode, gstnumber, contactnumber,
            email, altcontactnumber,
        } = this.state;

        const data = {
            vendorname, address, city, state,
            country, pincode, gstnumber,
            contactnumber, email, altcontactnumber,
        };

        try {
            await VendorService.updateVendor(vendor.id, data);
            fetchVendors();
            this.resetForm();
            toast.success("Vendor updated successfully");
            this.props.onHide();
        } catch (e) {
            console.log(e);
            toast.error("Failed to update vendor.");
        }
    };

    render() {
        const { show, onHide } = this.props;
        const {
            vendorname, address, city, state,
            country, pincode, gstnumber, contactnumber,
            email, altcontactnumber,
        } = this.state;

        return (
            <Modal show={show} onHide={onHide} centered>
                <div className="modal-content" style={{ width: '600px' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Update Vendor</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="vendorname" className='mb-2'>Vendor Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="vendorname"
                                        id="vendorname"
                                        placeholder="Enter Vendor Name"
                                        value={vendorname}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="address" className='mb-2'>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        id="address"
                                        placeholder="Enter Address"
                                        value={address}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="city" className='mb-2'>City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        id="city"
                                        placeholder="Enter City"
                                        value={city}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="state" className='mb-2'>State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        id="state"
                                        placeholder="Enter State"
                                        value={state}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mt-3 mt-md-0">
                                    <label htmlFor="country" className='mb-2'>Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        id="country"
                                        placeholder="Enter Country"
                                        value={country}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="pincode" className='mb-2'>Pincode</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="pincode"
                                        id="pincode"
                                        placeholder="Enter Pincode"
                                        value={pincode}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="gstnumber" className='mb-2'>GST Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="gstnumber"
                                        id="gstnumber"
                                        placeholder="Enter GST Number"
                                        value={gstnumber}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="contactnumber" className='mb-2'>Contact Number</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="contactnumber"
                                        id="contactnumber"
                                        placeholder="Enter Contact Number"
                                        value={contactnumber}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email and Alternate Contact Row */}
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email" className='mb-2'>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="altcontactnumber" className='mb-2'>Alternate Contact Number</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="altcontactnumber"
                                        id="altcontactnumber"
                                        placeholder="Enter Alternate Contact Number"
                                        value={altcontactnumber}
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
                            onClick={this.handleUpdate}
                        >
                            Update Vendor
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default UpdateVendorModal;
