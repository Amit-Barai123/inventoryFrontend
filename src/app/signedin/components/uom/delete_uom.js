import React, { Component } from "react";
import { toast } from "react-toastify";
import UomService from "../../../../services/uom_service"; 
import DeleteUomModal from "./delete_uom_modal"; 

export default class DeleteUom extends Component {
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
        const { uom, fetchUoms } = this.props;
        try {
            await UomService.deleteUom(uom.id);
            toast.success(`UOM ${uom.uomname} deleted successfully`);
            this.closeDeleteModal();
            fetchUoms();
        } catch (error) {
            if (
                error.response &&
                error.response.data.error.includes("violates foreign key constraint")
            ) {
                this.closeDeleteModal();
                toast.error(
                    "UOM cannot be deleted as it is connected to others."
                );
            } else {
                toast.error("Failed to delete UOM");
            }
            console.error(error);
        }
    };

    render() {
        const { showDeleteModal } = this.state;
        const { uom } = this.props;

        return (
            <div>
                <span
                    role="button"
                    className="btn btn-danger "
                    title="Delete UOM"
                    onClick={this.openDeleteModal}
                >
                    <i className="bi bi-trash-fill"></i>
                </span>

                {/* Use the DeleteUomModal */}
                <DeleteUomModal
                    show={showDeleteModal}
                    onHide={this.closeDeleteModal}
                    onDelete={this.handleDelete}
                    uom={uom} // Pass the UOM data
                />
            </div>
        );
    }
}
