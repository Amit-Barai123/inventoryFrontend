
import { Component } from "react";
import VendorService from "../../../../services/vendors_service";
import DeleteVendor from "./delete_vendor";
import UpdateVendor from "./update_vendor";

export default class GetAllVendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendors: [],
            loading: true,
            search: "",
            currentPage: 1,
            rowsPerPage: 10,
            totalPages: 0,
            totalVendors: 0,
        };
    }

    componentDidMount() {
        this.getAllVendors();
    }
     
    getAllVendors(page = 1) {
        const { rowsPerPage } = this.state;
        const data = {
            page: page,
            rowsPerPage: rowsPerPage,
        };

        VendorService.getAllVendorsWithPagenation(data)
            .then((response) => {
                const { vendors, pagination } = response.data;
                this.setState({
                    vendors: vendors || [],
                    loading: false,
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalVendors: pagination.totalVendors,
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
      
    handlePrint = () => {
        window.print();
      };
    handlePageChange = (newPage) => {
        this.setState({ loading: true });
        this.getAllVendors(newPage);
    };

    handleRowsPerPageChange = (newRowsPerPage) => {
        this.setState({ rowsPerPage: newRowsPerPage, currentPage: 1, loading: true }, () => {
            this.getAllVendors(1); // Reset to the first page when rows per page changes
        });
    };

    renderPagination() {
        const { currentPage, totalPages, rowsPerPage } = this.state;

        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return (
            <div>
                <nav aria-label="Vendor pagination" className="mt-3">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => this.handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        {pages.map((page) => (
                            <li
                                key={page}
                                className={`page-item ${page === currentPage ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => this.handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                        <li
                            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => this.handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                        <li>
                            <select
                                className="form-select ms-2 w-auto"
                                value={rowsPerPage}
                                onChange={(e) =>
                                    this.handleRowsPerPageChange(parseInt(e.target.value, 10))
                                }
                            >
                                <option value={10}>10 rows</option>
                                <option value={15}>15 rows</option>
                                <option value={20}>20 rows</option>
                                <option value={25}>25 rows</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    render() {
        const { vendors, loading, search, totalVendors } = this.state;
        const { isOperator, isAdmin, isOwner } = this.props;

        const filteredVendors = vendors.filter((vendor) =>
            vendor.vendorname?.toLowerCase().includes(search.toLowerCase())
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
            <div className="container">
           
                <div className="mb-3 d-flex mt-3 justify-content-between align-items-center">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search Vendors by name"
                        onChange={this.handleSearchChange} // Trigger page change with search term
                    />
                    <button onClick={this.handlePrint} className="btn btn-success">
                        <span className="bi bi-printer-fill" ></span> Print
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table table-bordered text-center table-striped table-responsive">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Vendor Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Pincode</th>
                                <th>GST Number</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Alt Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.length ? (
                                filteredVendors.map((vendor) => (
                                    <tr key={vendor.id}>
                                        <td>{vendor.vendorname}</td>
                                        <td>{vendor.address}</td>
                                        <td>{vendor.city}</td>
                                        <td>{vendor.state}</td>
                                        <td>{vendor.country}</td>
                                        <td>{vendor.pincode}</td>
                                        <td>{vendor.gstnumber}</td>
                                        <td>{vendor.contactnumber}</td>
                                        <td>{vendor.email}</td>
                                        <td>{vendor.altcontactnumber}</td>
                                        <td className="d-flex">
                                            <UpdateVendor
                                                vendor={vendor}
                                                fetchVendors={() => this.getAllVendors()}
                                            />
                                            <div className="me-4"></div>
                                            {isOwner && (
                                                <DeleteVendor
                                                    vendor={vendor}
                                                    fetchVendors={() => this.getAllVendors()}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No vendors found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-start">
                    {totalVendors > 0 && this.renderPagination()}
                </div>

            </div>
        );
    }
}