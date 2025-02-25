import { Component } from "react";
import CreateVendorModal from "./create_vendor_modal";

export default class CreateVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVendorModal: false,

        }
    }

    openVendorModal = () => {
        this.setState({
            showVendorModal: true,
        });
    };

    closeVendorModal = () => {
        this.setState({
            showVendorModal: false,
        });
    };

    render() {
        const { showVendorModal } = this.state;
        const { getAllVendors } = this.props;
        return (
            <div className="container  justify-content-center">
                <div className=" d-flex justify-content-start">
                    <button className="btn btn-primary" onClick={() => this.openVendorModal()}>
                        Create Vendor
                    </button>

                    <CreateVendorModal
                        show={showVendorModal}
                        onHide={this.closeVendorModal}
                        getAllVendors={getAllVendors}
                    />
                </div>
            </div>

        )
    }
}