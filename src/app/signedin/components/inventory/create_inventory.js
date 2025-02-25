import { Component } from "react";
import CreateInventoryModal from "./create_inventory_modal";

export default class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInventoryModal: false,

        }
    }

    openInventoryModal = () => {
        this.setState({
            showInventoryModal: true,
        });
    };

    closeInventoryModal = () => {
        this.setState({
            showInventoryModal: false,
        });
    };

    render() {
        const { showInventoryModal } = this.state;
        const { fetchInventory, items, vendors, uoms, invoices } = this.props;
        return (
            <div className="container  justify-content-center">
                <div className="d-flex justify-content-start">
                    <button className="btn btn-primary" onClick={() => this.openInventoryModal()}>
                        Create Inventory
                    </button>

                    <CreateInventoryModal
                        show={showInventoryModal}
                        onHide={this.closeInventoryModal}
                        fetchInventory={fetchInventory}
                        items={items}
                        vendors={vendors}
                        uoms={uoms}
                        invoices={invoices}
                    />
                </div>
            </div>

        )
    }
}