import React, { Component } from "react";
import UpdateInvoiceModal from "./update_invoice_modal";

export default class UpdateInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateInvoiceModal: false,
        };
    }

    openUpdateInvoiceModal = () => {
        this.setState({
            showUpdateInvoiceModal: true,
        });
    };

    closeUpdateInvoiceModal = () => {
        this.setState({
            showUpdateInvoiceModal: false,
        });
    };

    render() {
        const { showUpdateInvoiceModal } = this.state;
        const { invoice, vendors, fetchInvoices } = this.props;

        return (
            <div>
                <span
                    role="button"
                    onClick={this.openUpdateInvoiceModal}
                    className="btn btn-primary"
                    title="Edit Invoice"
                >
                   <i className="bi bi-pencil-fill"></i>
                </span>


                {invoice && (
                    <UpdateInvoiceModal
                        show={showUpdateInvoiceModal}
                        onHide={this.closeUpdateInvoiceModal}
                        invoice={invoice}
                        vendors={vendors}
                        fetchInvoices={fetchInvoices}
                    />
                )}
            </div>
        );
    }
}
