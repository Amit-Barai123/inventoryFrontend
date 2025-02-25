import React, { Component } from "react";
import DeleteInventory from "./delete_inventory";
import UpdateInventory from "./update_inventory";
import moment from "moment";
export default class GetAllInventory extends Component {
    render() {
        const { inventory, loading, search, vendorMap, itemMap, uomMap, items, vendors, uoms, invoices, handleSearchChange, isOwner,  currentPage,
            rowsPerPage, handlePageChange, totalInvoices,
            handleRowsPerPageChange,totalPages  } = this.props;

        if (loading  ) {
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
                        value={search}
                        className="form-control w-50"
                        placeholder="Search by Invoice no"
                        onChange={handleSearchChange} 
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
                                <th>Item Name</th>
                                <th>Vendor Name</th>
                                <th>UOM</th>
                                <th>Quantity</th>
                                <th>Actual Quantity</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Received Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.length ? (
                                inventory.map((inventory) => (
                                    <tr key={inventory.id}>
                                        <td>{inventory.invoice_number}</td>
                                        <td>{itemMap[inventory.item_id] || "Unknown Item"}</td>
                                        <td>{vendorMap[inventory.vendor_id] || "Unknown Vendor"}</td>
                                        <td>{uomMap[inventory.uom_id] || "Unknown UOM"}</td>
                                        <td>{inventory.quantity}</td>
                                        <td>{inventory.actualquantity}</td>
                                        <td>₹ {inventory.price.toFixed(2)}</td>
                                        <td>₹ {inventory.cost.toFixed(2)}</td>
                                        <td>{moment(inventory.received_date).format('MMM D, YYYY')}</td>
                                        <td className="d-flex">
                                            <UpdateInventory
                                                inventory={inventory}
                                                fetchInventory={this.props.fetchInventory}
                                                items={items}
                                                vendors={vendors}
                                                uoms={uoms}
                                                invoices={invoices}
                                            />
                                            <div className="me-4"></div>
                                            {(isOwner) && (
                                                <DeleteInventory
                                                    inventory={inventory}
                                                    fetchInventory={this.props.fetchInventory}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">No inventory items found</td>
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
