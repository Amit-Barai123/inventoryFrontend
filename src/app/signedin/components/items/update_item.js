
import React, { Component } from "react";
import UpdateItemModal from "./update_item_modal";

export default class UpdateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateItemModal: false,
        };
    }

    openUpdateItemModal = () => {
        this.setState({
            showUpdateItemModal: true,
        });
    };

    closeUpdateItemModal = () => {
        this.setState({
            showUpdateItemModal: false,
        });
    };

    render() {
        const { showUpdateItemModal } = this.state;
        const { item, fetchItems, uoms } = this.props;

        return (
            <div>
                <span
                    role="button"
                    onClick={this.openUpdateItemModal}
                    className="btn btn-primary me-2"
                    title="Edit Item"
                >
                    <i className="bi bi-pencil-fill"></i>
                </span>

                {item && (
                    <UpdateItemModal
                        show={showUpdateItemModal}
                        onHide={this.closeUpdateItemModal}
                        item={item}
                        uoms={uoms}
                        fetchItems={fetchItems}
                    />
                )}
            </div>
        );
    }
}
