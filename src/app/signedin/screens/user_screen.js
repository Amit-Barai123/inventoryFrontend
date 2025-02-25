import { Component } from "react";
import AuthenticationService from "../../../services/authentication_service";
import GetAllUsers from "../components/users/get_all_users";
import CreateUser from "../components/users/create_user";

export default class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            loading: true,
            search: "",
        };
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllRoles();
    }

    getAllUsers() {
        AuthenticationService.getAllUsers()
            .then((response) => {
                this.setState({
                    users: response.data.users || [],
                    loading: false,
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({ loading: false, users: [] });
            });
    }

    getAllRoles() {
        AuthenticationService.getAllRoles()
            .then((response) => {
                this.setState({
                    roles: response.data.roles || [],
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({ roles: [] });
            });
    }

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    render() {
        const { users, roles, loading, search } = this.state;

        const filteredUsers = users.filter((user) =>
            user.name?.toLowerCase().includes(search.toLowerCase())
        );

        if (loading) {
            return (
                <div className="w-100 text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="container mt-100">
                <h2 className="mb-4 text-center">Users List Page</h2>

                <div className="row">
                    <div className="my-4 d-flex justify-content-between">
                        <div></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                value={search}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        <div className="">
                            <CreateUser
                                fetchUsers={() => this.getAllUsers()}
                                roles={roles}
                            />
                        </div>

                    </div>
                </div>


                <GetAllUsers
                    users={filteredUsers}
                    roles={roles}
                    fetchUsers={() => this.getAllUsers()}
                />
            </div>
        );
    }
}
