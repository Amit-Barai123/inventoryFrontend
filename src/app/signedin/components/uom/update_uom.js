import React, { Component } from "react";
import UpdateUomModal from "./update_uom_modal";

export default class UpdateUom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateUomModal: false,
        };
    }

    openUpdateUomModal = () => {
        this.setState({
            showUpdateUomModal: true,
        });
    };

    closeUpdateUomModal = () => {
        this.setState({
            showUpdateUomModal: false,
        });
    };

    render() {
        const { showUpdateUomModal } = this.state;
        const { uom, fetchUoms } = this.props;

        return (
            <div>
                <span
                    role="button"
                    onClick={this.openUpdateUomModal}
                    className="btn btn-primary me-2"
                    title="Edit UOM"
                >
                   <i className="bi bi-pencil-fill"></i>
                </span>


                {uom && (
                    <UpdateUomModal
                        show={showUpdateUomModal}
                        onHide={this.closeUpdateUomModal}
                        uom={uom}
                        fetchUoms={fetchUoms}
                    />
                )}
            </div>
        );
    }
}
