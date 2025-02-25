import React, { Component } from "react";
import { toast } from "react-toastify"; 
import VendorService from "../../../../services/vendors_service";
import DeleteVendorModal from "./delete_vendor_modal";

export default class DeleteVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
        };
    }

    openDeleteModal = () => {
        this.setState({
            showDeleteModal: true,
        });
    };

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
        });
    };

    handleDelete = async () => {
        const { vendor, fetchVendors } = this.props;
        try {
            await VendorService.deleteVendor(vendor.id);
            toast.success(`Vendor ${vendor.vendorname} deleted successfully`);
            this.closeDeleteModal();
            fetchVendors();
        } catch (error) {
            if (
                error.response &&
                error.response.data.error.includes("violates foreign key constraint")
            ) {
                this.closeDeleteModal();
                toast.error(
                    "Vendor cannot be deleted as it is connected to others."
                );
            } else {
                toast.error("Failed to delete Vendor");
            }
            console.error(error);
        }
    };

    render() {
        const { showDeleteModal } = this.state;
        const { vendor } = this.props;

        return (
            <div>
                <button
                    role="button"
                    className="btn btn-danger "
                    title="Delete UOM"
                    onClick={this.openDeleteModal}
                >
                    <i className="bi bi-trash-fill"></i>
                </button>

                <DeleteVendorModal
                    show={showDeleteModal}
                    onHide={this.closeDeleteModal}
                    onDelete={this.handleDelete}
                    vendor={vendor}
                />
            </div>
        );
    }
}


