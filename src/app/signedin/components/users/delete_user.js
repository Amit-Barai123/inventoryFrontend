import React, { Component } from "react";
import { toast } from "react-toastify";
import DeleteUserModal from "./delete_user_modal";
import AuthenticationService from "../../../../services/authentication_service";

export default class DeleteUser extends Component {
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
        const { user, fetchUsers } = this.props;
        try {
            await AuthenticationService.deleteUser(user.id);
            toast.success(`User ${user.username} deleted successfully`);
            this.closeDeleteModal();
            fetchUsers();
        } catch (error) {
            if (
                error.response &&
                error.response.data.error.includes("violates foreign key constraint")
            ) {
                this.closeDeleteModal();
                toast.error(
                    "User cannot be deleted as they are connected to other records."
                );
            } else {
                toast.error("Failed to delete User");
            }
            console.error(error);
        }
    };

    render() {
        const { showDeleteModal } = this.state;
        const { user } = this.props;

        return (
            <div>
                <span
                    role="button"
                     className="btn btn-danger "
                    title="Delete User"
                    onClick={this.openDeleteModal}
                >
                    <i className="bi bi-trash-fill"></i>
                </span>

                <DeleteUserModal
                    show={showDeleteModal}
                    onHide={this.closeDeleteModal}
                    onDelete={this.handleDelete}
                    user={user}
                />
            </div>
        );
    }
}
