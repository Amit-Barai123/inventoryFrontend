import { Component } from "react";
import CreateUomModal from "./create_uom_modal";

export default class CreateUom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUomModal: false,

        }
    }

    openUomModal = () => {
        this.setState({
            showUomModal: true,
        });
    };

    closeUomModal = () => {
        this.setState({
            showUomModal: false,
        });
    };

    render() {
        const { showUomModal } = this.state;
        const { getAllUoms } = this.props;
        return (
            <div className="row mx-0 justify-content-center">
                <div className="col-10 px-0 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={() => this.openUomModal()}>
                        Create Uom
                    </button>

                    <CreateUomModal
                        show={showUomModal}
                        onHide={this.closeUomModal}
                        getAllUoms={getAllUoms}
                    />
                </div>
            </div>

        )
    }
}