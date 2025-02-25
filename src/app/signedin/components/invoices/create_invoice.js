import { Component } from "react";
import CreateInvoiceModal from "./create_invoice_modal";

export default class CreateInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInvoiceModal: false,

        }
    }

    openInvoiceModal = () => {
        this.setState({
            showInvoiceModal: true,
        });
    };

    closeInvoiceModal = () => {
        this.setState({
            showInvoiceModal: false,
        });
    };

    render() {
        const { showInvoiceModal } = this.state;
        const { fetchInvoices, vendors } = this.props;
        return (
            <div className="container  justify-content-center">
                <div className="d-flex justify-content-start">
                    <button className="btn btn-primary" onClick={() => this.openInvoiceModal()}>
                        Create Invoice
                    </button>

                    <CreateInvoiceModal
                        show={showInvoiceModal}
                        onHide={this.closeInvoiceModal}
                        fetchInvoices={fetchInvoices}
                        vendors={vendors}
                    />
                </div>
            </div>

        )
    }
}