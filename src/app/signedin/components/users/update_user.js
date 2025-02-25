import React, { Component } from "react";
import UpdateUserModal from "./update_user_modal";

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateUserModal: false,
        };
    }

    openUpdateUserModal = () => {
        this.setState({
            showUpdateUserModal: true,
        });
    };

    closeUpdateUserModal = () => {
        this.setState({
            showUpdateUserModal: false,
        });
    };

    render() {
        const { showUpdateUserModal } = this.state;
        const { user, fetchUsers, roles } = this.props;

        return (
            <div>
                <span
                    role="button"
                    onClick={this.openUpdateUserModal}
                    className="btn btn-primary"
                    title="Edit User"
                >
                    <i className="bi bi-pencil-fill"></i>
                </span>

                {user && (
                    <UpdateUserModal
                        show={showUpdateUserModal}
                        onHide={this.closeUpdateUserModal}
                        user={user}
                        fetchUsers={fetchUsers}
                        roles={roles}
                    />
                )}
            </div>
        );
    }
}
