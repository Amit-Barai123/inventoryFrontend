import { Component } from "react";
import CreateUserModal from "./create_user_modal";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserModal: false,
        };
    }

    openUserModal = () => {
        this.setState({
            showUserModal: true,
        });
    };

    closeUserModal = () => {
        this.setState({
            showUserModal: false,
        });
    };

    render() {
        const { showUserModal } = this.state;
        const { fetchUsers, roles } = this.props;

        return (
            <div className="">
                <button className="btn btn-primary" onClick={this.openUserModal}>
                    Create User
                </button>

                <CreateUserModal
                    show={showUserModal}
                    onHide={this.closeUserModal}
                    fetchUsers={fetchUsers}
                    roles={roles}
                />
            </div>
        );
    }
}
