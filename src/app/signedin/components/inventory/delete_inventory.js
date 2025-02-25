import React, { Component } from "react";
import { toast } from "react-toastify"; 
import DeleteinventoryModal from "./delete_inventory_modal";
import InventoryService from "../../../../services/inventory_service";

export default class DeleteInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
        };
    }

    openDeleteModal = () => {
        this.setState({
            showDeleteModal: true,
        });
    };

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
        });
    };

    handleDelete = async () => {
        const { inventory, fetchInventory } = this.props;
        try {
            await InventoryService.deleteInventory(inventory.id);
            toast.success(`Inventory ${inventory.inventoryname} deleted successfully`);
            this.closeDeleteModal();
            fetchInventory();
        } catch (error) {
            if (
                error.response &&
                error.response.data.error.includes("violates foreign key constraint")
            ) {
                this.closeDeleteModal();
                toast.error(
                    "Inventory cannot be deleted as it is connected to others."
                );
            } else {
                toast.error("Failed to delete Inventory");
            }
            console.error(error);
        }
    };

    render() {
        const { showDeleteModal } = this.state;
        const { inventory } = this.props;

        return (
            <div>
                <span
                    role="button"
                    className="btn btn-danger "
                    title="Delete Inventory"
                    onClick={this.openDeleteModal}
                >
                   <i className="bi bi-trash-fill"></i>
                </span>

                <DeleteinventoryModal
                    show={showDeleteModal}
                    onHide={this.closeDeleteModal}
                    onDelete={this.handleDelete}
                    inventory={inventory}
                />
            </div>
        );
    }
}
