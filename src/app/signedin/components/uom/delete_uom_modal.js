import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'; 
import { Button } from 'react-bootstrap';

export default class DeleteUomModal extends Component {
    render() {
        const { show, onHide, onDelete, uom } = this.props;

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete UOM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the UOM <strong>{uom?.uomname}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
