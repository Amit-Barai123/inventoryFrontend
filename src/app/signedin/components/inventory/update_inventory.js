import React, { Component } from "react";
import UpdateInventoryModal from "./update_inventory_modal";

export default class UpdateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateInventoryModal: false,
        };
    }

    openUpdateInventoryModal = () => {
        this.setState({
            showUpdateInventoryModal: true,
        });
    };

    closeUpdateInventoryModal = () => {
        this.setState({
            showUpdateInventoryModal: false,
        });
    };

    render() {
        const { showUpdateInventoryModal } = this.state;
        const { inventory, fetchInventory, modalData, items, vendors, uoms, invoices } = this.props; 

        return (
            <div>
                <span
                    role="button"
                    onClick={this.openUpdateInventoryModal}
                     className="btn btn-primary "
                    title="Edit Inventory"
                >
                   <i className="bi bi-pencil-fill"></i>
                </span>

                {inventory && (
                    <UpdateInventoryModal
                        show={showUpdateInventoryModal}
                        onHide={this.closeUpdateInventoryModal}
                        inventory={inventory}
                        modalData={modalData}
                        fetchInventory={fetchInventory}
                        items={items}
                        vendors={vendors}
                        uoms={uoms} 
                        invoices={invoices} 
                    />
                )}
            </div>
        );
    }
}
