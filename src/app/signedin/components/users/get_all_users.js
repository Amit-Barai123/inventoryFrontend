import { Component } from "react";
import UpdateUser from "./update_user";
import DeleteUser from "./delete_user";

export default class GetAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { users, roles, fetchUsers } = this.props;

        return (
            <div className="container">
                <div className="row">
                    {users.map((user) => (
                        <div key={user.id} className="col-md-4 mt-2 px-1">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex align-items-top justify-content-between">
                                    <div>
                                        <h5 className="card-title fw-bold mb-2">{user.name}</h5>
                                        <p className="mb-1">
                                            <strong>Username:</strong> {user.username}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Email:</strong> {user.email}
                                        </p>
                                        <p className="mb-0">
                                            <strong>Roles:</strong> {user.roles.join(", ")}
                                        </p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between">
                                        <UpdateUser
                                            fetchUsers={fetchUsers}
                                            roles={roles}
                                            user={user}
                                        />
                                        <DeleteUser user={user} fetchUsers={fetchUsers} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
