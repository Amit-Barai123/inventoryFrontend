import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import UomService from '../../../../services/uom_service';

export default class UpdateUomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uomname: this.props.uom.uomname || "",
        };
    }

    handleUpdateUom = async () => {
        const { uomname } = this.state;
        const { onHide, fetchUoms, uom } = this.props;

        try {
            await UomService.updateUom(uom.id, { uomname }); 
            toast.success("UOM updated successfully");
            fetchUoms();
            onHide(); 
        } catch (error) {
            console.error(error);
            toast.error("Failed to update UOM");
        }
    };

    handleInputChange = (e) => {
        this.setState({ uomname: e.target.value });
    };

    render() {
        const { show, onHide } = this.props;
        const { uomname } = this.state;

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Update UOM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={uomname}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Enter UOM Name"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={onHide}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={this.handleUpdateUom}>
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
