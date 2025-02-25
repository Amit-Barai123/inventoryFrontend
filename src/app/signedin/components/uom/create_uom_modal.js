import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import UomService from '../../../../services/uom_service';

class CreateUomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uomName: "",
        };
    }

    handleInputChange = (e) => {
        this.setState({ uomName: e.target.value });
    };

    handleCreate = async () => {
        const { getAllUoms } = this.props;
        const { uomName } = this.state;

        if (!uomName) {
            toast.error("UOM name cannot be empty!");
            return;
        }

        try {
            await UomService.createUom({ uomname: uomName });
            getAllUoms();
            toast.success("UOM created successfully");
            this.props.onHide();
        } catch (e) {
            console.log(e);
            toast.error("Failed to create UOM.");
        }
    };

    render() {
        const { show, onHide } = this.props;
        const { uomName } = this.state;

        return (
            <Modal show={show} onHide={onHide}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create UOM</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body mb-3">
                        <div className="form-group">
                            <label htmlFor="uomName" className='mb-2'>UOM Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="uomName"
                                placeholder="Enter UOM name"
                                value={uomName}
                                onChange={this.handleInputChange}
                            />
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
                            onClick={this.handleCreate}
                        >
                            Create UOM
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateUomModal;
