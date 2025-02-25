import React, { Component } from "react";
import DeleteInvoice from "./delete_invoice";
import UpdateInvoice from "./update_invoice";
import moment from "moment";
export default class GetAllInvoices extends Component {
    render() {
        const { invoices, loading, search, vendorsMap, vendors, handleSearchChange, fetchInvoices, isOwner, currentPage,
            rowsPerPage, handlePageChange, totalInvoices,
            handleRowsPerPageChange,totalPages } = this.props;

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
                        placeholder="Search Vendors"
                        onChange={handleSearchChange} // Trigger page change with search term
                    />
                    <button onClick={()=>window.print()} className="btn btn-success">
                        <span className="bi bi-printer-fill" ></span> Print
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table table-bordered text-center table-striped table-responsive">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Invoice Number</th>
                                <th>Vendor Name</th>
                                <th>Invoice Date</th>
                                <th>Received Date</th>
                                <th>Waybill Number</th>
                                <th>Vehicle Number</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.length ? (
                                invoices.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td>{invoice.invoice_number}</td>
                                        <td>{vendorsMap[invoice.vendor_id] || "Unknown Vendor"}</td>
                                        
                                         <td>{moment(invoice.invoice_date).format('MMM D, YYYY')}</td> 
                                         <td>{moment(invoice.received_date).format('MMM D, YYYY')}</td> 
                                        <td>{invoice.waybill_number}</td>
                                        <td>{invoice.vehicle_number}</td>
                                        <td>₹ {invoice.total_amount.toFixed(2)}</td>
                                        <td className="d-flex">
                                            <UpdateInvoice
                                                invoice={invoice}
                                                vendors={vendors}
                                                fetchInvoices={fetchInvoices}
                                            />
                                            <div className="me-4"></div>
                                            {(isOwner) && (
                                                <DeleteInvoice
                                                    invoice={invoice}
                                                    fetchInvoices={fetchInvoices}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No invoices found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="row justify-content-between mt-3">
                        <div className="col-auto">
                         
                        </div>
                        <div className="d-flex justify-content-start">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: Math.ceil(totalInvoices / rowsPerPage) }, (_, index) => (

                                        <>

                                            <li
                                                key={index + 1}
                                                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        </>
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
                                className="form-select ms-2"
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                            >
                                <option value="10">10 rows</option>
                                <option value="15">15 rows</option>
                                <option value="20">20 rows</option>
                                <option value="25">25 rows</option>
                            </select>
                        </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
