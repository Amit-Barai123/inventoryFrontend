

import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ItemService from '../../../../services/items_service';
import { toast } from "react-toastify";
import DropDownList from '../dropdown/dropdown';
class UpdateItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemname: "",
            selectedUom: null,
            threshold: "",
            uoms: [],
        };
    }

    componentDidMount() {
        this.loadItemData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item || prevProps.uoms !== this.props.uoms) {
            this.loadItemData();
        }
    }

    loadItemData = () => {
        const { item, uoms } = this.props;

        if (item && uoms.length > 0) {
            const selectedUom = uoms.find(uom => uom.id === item.uomid);
            this.setState({
                itemname: item.itemname || "",
                selectedUom: selectedUom ? { value: selectedUom.id, label: selectedUom.uomname } : null,
                threshold: item.threshold || "",
                uoms: uoms.map(uom => ({ value: uom.id, label: uom.uomname }))
            });
        }
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleUomChange = (selectedUom) => {
        console.log("Selected UOM:", selectedUom);
        this.setState({ selectedUom });
    };

    handleUpdate = async () => {
        const { fetchItems, item, onHide } = this.props;
        const { itemname, selectedUom, threshold } = this.state;

        if (!itemname.trim() || !selectedUom) {
            toast.error("Item Name and UOM are required.");
            return;
        }

        const data = {
            itemname: itemname.trim(),
            uomid: selectedUom.value,
            threshold: threshold,
        };

        

        try {
            await ItemService.updateItem(item.id, data);
            fetchItems();
            toast.success("Item updated successfully");
            onHide();
        } catch (error) {
            toast.error("Failed to update item.");
        }
    };

    render() {
        const { show, onHide } = this.props;
        const { itemname, selectedUom, threshold, uoms } = this.state;

        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="itemname"
                                value={itemname}
                                onChange={this.handleInputChange}
                                placeholder="Enter item name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Threshold</Form.Label>
                            <Form.Control
                                type="number"
                                name="threshold"
                                value={threshold}
                                onChange={this.handleInputChange}
                                placeholder="Enter threshold value"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>UOM</Form.Label>
                            <DropDownList
                                name="selectedUom"
                                placeholder="Select UOM"
                                data={uoms}
                                onUpdateSelectedValue={this.handleUomChange}
                                selectedValue={selectedUom}
                            />
                        </Form.Group>

                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleUpdate}>
                        Update Item
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdateItemModal;
