import { Component } from "react";
import CreateItemModal from "./create_item_modal";

export default class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showItemModal: false,

        }
    }

    openItemModal = () => {
        this.setState({
            showItemModal: true,
        });
    };

    closeItemModal = () => {
        this.setState({
            showItemModal: false,
        });
    };

    render() {
        const { showItemModal } = this.state;
        const { fetchItems, uoms } = this.props;
        return (
            <div className="">
                    <button className="btn btn-primary" onClick={() => this.openItemModal()}>
                        Create Item
                    </button>

                    <CreateItemModal
                        show={showItemModal}
                        onHide={this.closeItemModal}
                        uoms={uoms}
                        fetchItems={fetchItems}
                    />
            </div>

        )
    }
}