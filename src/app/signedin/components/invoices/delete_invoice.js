import React, { Component } from "react";
import { toast } from "react-toastify";
import InvoiceService from "../../../../services/invoices_service";
import DeleteinvoiceModal from "./delete_invoice_modal";

export default class DeleteInvoice extends Component {
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
        const { invoice, fetchInvoices } = this.props;
        try {
            await InvoiceService.deleteInvoice(invoice.id);
            toast.success(`Invoice ${invoice.invoicename} deleted successfully`);
            this.closeDeleteModal();
            fetchInvoices();
        } catch (error) {
            if (
                error.response &&
                error.response.data.error.includes("violates foreign key constraint")
            ) {
                this.closeDeleteModal();
                toast.error(
                    "Invoice cannot be deleted as it is connected to others."
                );
            } else {
                toast.error("Failed to delete Invoice");
            }
            console.error(error);
        }

    };

    render() {
        const { showDeleteModal } = this.state;
        const { invoice } = this.props;

        return (
            <div>
                <span
                    role="button"
                    className="btn btn-danger "
                    title="Delete Invoice"
                    onClick={this.openDeleteModal}
                >
                     <i className="bi bi-trash-fill"></i>
                </span>

                <DeleteinvoiceModal
                    show={showDeleteModal}
                    onHide={this.closeDeleteModal}
                    onDelete={this.handleDelete}
                    invoice={invoice}
                />
            </div>
        );
    }
}
