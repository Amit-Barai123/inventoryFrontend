import React, { Component } from "react";
import { toast } from "react-toastify"; 
import ItemService from "../../../../services/items_service";
import DeleteItemModal from "./delete_item_modal";

export default class DeleteItem extends Component {
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
        const { item, fetchItems } = this.props;
        try {
            await ItemService.deleteItem(item.id);
            toast.success(`UOM ${item.itemname} deleted successfully`);
            this.closeDeleteModal();
            fetchItems();
        } catch (error) {
            if (
                error.response &&
                error.response.data.error.includes("violates foreign key constraint")
            ) {
                this.closeDeleteModal();
                toast.error(
                    "Item cannot be deleted as it is connected to others."
                );
            } else {
                toast.error("Failed to delete Item");
            }
            console.error(error);
        }
    };

    render() {
        const { showDeleteModal } = this.state;
        const { item } = this.props;

        return (
            <div>
                <span
                    role="button"
                     className="btn btn-danger "
                    title="Delete Item"
                    onClick={this.openDeleteModal}
                >
                    <i className="bi bi-trash-fill"></i>
                </span>

                <DeleteItemModal
                    show={showDeleteModal}
                    onHide={this.closeDeleteModal}
                    onDelete={this.handleDelete}
                    item={item}
                />
            </div>
        );
    }
}
