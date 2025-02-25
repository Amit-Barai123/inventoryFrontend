import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'; 
import { Button } from 'react-bootstrap';

export default class DeleteinvoiceModal extends Component {
    render() {
        const { show, onHide, onDelete, invoice } = this.props;

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the Invoice <strong>{invoice?.invoice_number}</strong>?</p>
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
