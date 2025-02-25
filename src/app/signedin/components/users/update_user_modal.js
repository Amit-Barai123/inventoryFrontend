import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import DropDownList from "../dropdown/dropdown";
import AuthenticationService from "../../../../services/authentication_service";

class UpdateUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.user.name || "",
            username: props.user.username || "",
            email: props.user.email || "",
            password: props.user.password || "",
            selectedRoles: props.user.roles
                .map(userRole => {
                    const role = props.roles.find(role => role.name === userRole);
                    return role ? { value: role.id, label: role.name } : null;
                })
                .filter(role => role !== null) || [],
        };
    }


    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleRoleChange = (selectedRoles) => {
        this.setState({ selectedRoles });
    };

    handleUpdate = async () => {
        const { fetchUsers, onHide, user } = this.props;
        const { name, username, email, password, selectedRoles } = this.state;

        if (!name || !username || !email || selectedRoles.length === 0) {
            toast.error("All fields are required!");
            return;
        }

        const data = {
            name,
            username,
            email,
            password: password || user.password,
            roles: selectedRoles.map((role) => role.value),
        };

        try {
            await AuthenticationService.updateUser(user.id, data);
            toast.success("User updated successfully");
            fetchUsers();
            onHide();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update user.");
        }
    };


    render() {
        const { show, onHide, roles, user } = this.props;
        const { name, username, email, password, selectedRoles } = this.state;
        const roleNames = user.roles.join(", ");

        return (
            <Modal show={show} onHide={onHide} centered>
                <div className="modal-content" style={{ width: "600px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Update User</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex">
                            <div className="form-group w-100">
                                <label htmlFor="name" className="mb-2">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group w-100 ms-2">
                                <label htmlFor="username" className="mb-2">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="d-flex mt-3">
                            <div className="form-group w-100">
                                <label htmlFor="email" className="mb-2">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group w-100 ms-2">
                                <label htmlFor="password" className="mb-2">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Enter new password (leave empty to keep current)"
                                    value={password}
                                    onChange={this.handleInputChange}
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="roles" className="mb-2">
                                Roles {roleNames && `(${roleNames})`}
                            </label>
                            <DropDownList
                                name="roles"
                                placeholder="Select Roles"
                                isMulti={true}
                                data={roles.map((role) => ({
                                    value: role.id,
                                    label: role.name,
                                }))}
                                onUpdateSelectedValue={this.handleRoleChange}
                                selectedValue={selectedRoles}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onHide}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleUpdate}
                        >
                            Update User
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default UpdateUserModal;
