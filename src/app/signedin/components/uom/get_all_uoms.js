import { Component } from "react";
import UomService from "../../../../services/uom_service";
import UpdateUom from "./update_uom";
import DeleteUom from "./delete_uom";

export default class GetAllUoms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uoms: [],
            loading: true,
            search: "",
        };
    }

    componentDidMount() {
        this.getAllUoms();
    }

    getAllUoms() {
        UomService.getAllUoms()
            .then((response) => {
                this.setState({
                    uoms: response.data.uom,
                    loading: false,
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({ loading: false });
            });
    }

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    render() {
        const { uoms, loading, search } = this.state;
        const filteredUoms = uoms.filter(uom =>
            uom.uomname?.toLowerCase().includes(search.toLowerCase())
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
            <div className="row mx-0 justify-content-center">
                <div className="col-10 px-0">
                    <div className="row mb-3 justify-content-center mx-0">
                        <div className="col-md-6 col-10 px-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search UOMs"
                                value={search}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {filteredUoms.length ? (
                            filteredUoms.map((uom) => (
                                <div key={uom.id} className="col-md-4 col-sm-6 col-12 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{uom.uomname}</h5>
                                            <div className="d-flex justify-content-end">
                                                <UpdateUom
                                                    uom={uom}
                                                    fetchUoms={() => this.getAllUoms()}
                                                />
                                                <div className="me-3"></div>
                                                <DeleteUom
                                                    uom={uom}
                                                    fetchUoms={() => this.getAllUoms()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">No UOMs found</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
