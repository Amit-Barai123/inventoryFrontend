import React, { Component } from "react";
import UpdateVendorModal from "./update_vendor_modal";

export default class UpdateVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateVendorModal: false,
        };
    }

    openUpdateVendorModal = () => {
        this.setState({
            showUpdateVendorModal: true,
        });
    };

    closeUpdateVendorModal = () => {
        this.setState({
            showUpdateVendorModal: false,
        });
    };

    render() {
        const { showUpdateVendorModal } = this.state;
        const { vendor, fetchVendors } = this.props;

        return (
            <div>
                <span
                    role="button"
                    onClick={this.openUpdateVendorModal}
                    className="btn btn-primary me-2"
                    title="Edit Vendor"
                >
                   <i className="bi bi-pencil-fill"></i>
                </span>


                {vendor && (
                    <UpdateVendorModal
                        show={showUpdateVendorModal}
                        onHide={this.closeUpdateVendorModal}
                        vendor={vendor}
                        fetchVendors={fetchVendors}
                    />
                )}
            </div>
        );
    }
}
