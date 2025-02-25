import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import DropDownList from "../dropdown/dropdown";
import AuthenticationService from "../../../../services/authentication_service";

class CreateUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "", // Username field for unique user identification
            email: "", // Email field for user communication
            password: "",
            selectedRoles: [], // Array of { value, label } for DropDownList
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleRoleChange = (selectedRoles) => {
        // DropDownList provides an array of selected objects when isMulti is true
        this.setState({ selectedRoles });
    };

    handleCreate = async () => {
        const { fetchUsers, onHide } = this.props;
        const { name, username, email, password, selectedRoles } = this.state;

        if (!name || !username || !email || !password || selectedRoles.length === 0) {
            toast.error("All fields are required!");
            return;
        }

        const data = {
            name,
            username, // Send username for unique identification
            email, // Send email for communication or notifications
            password,
            roles: selectedRoles.map((role) => role.value), // Send array of role names
        };

        try {
            await AuthenticationService.register(data);
            toast.success("User created successfully");
            this.resetForm();
            fetchUsers();
            onHide();
        } catch (error) {
            console.log(error);
            toast.error("Failed to create user.");
        }
    };

    resetForm = () => {
        this.setState({
            name: "",
            username: "", // Reset username field
            email: "", // Reset email field
            password: "",
            selectedRoles: [],
        });
    };

    render() {
        const { show, onHide, roles } = this.props;
        const { name, username, email, password, selectedRoles } = this.state;

        return (
            <Modal show={show} onHide={onHide} centered>
                <div className="modal-content" style={{ width: "600px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Create User</h5>
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
                        <div className="form-group mt-3">
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
                        <div className="d-flex mt-3">
                            <div className="form-group w-100">
                                <label htmlFor="password" className="mb-2">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={this.handleInputChange}
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="form-group w-100 ms-1">
                                <label htmlFor="roles" className="mb-1">Roles</label>
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
                            onClick={this.handleCreate}
                        >
                            Create User
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateUserModal;
