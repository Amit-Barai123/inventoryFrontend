
import React, { Component } from 'react';
import CreateInvoice from '../components/invoices/create_invoice';
import GetAllInvoices from '../components/invoices/get_all_invoices';
import InvoiceService from '../../../services/invoices_service';
import VendorService from '../../../services/vendors_service';

export default class InvoicesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            vendors: [],
            vendorsMap: {},
            loading: true,
            search: "",
            currentPage: 1,
            rowsPerPage: 10,
            totalInvoices: 0,
            totalPages: 1, 
        };
    }
    
    componentDidMount() {
        if (Object.keys(this.state.vendorsMap).length === 0) {
            console.log("Item Map is empty, fetching data first...");
            this.loadVendors().then(() => {
                this.getAllInvoices();
            });
        } else {
            this.getAllInvoices();
        }
    }

    getAllInvoices(page = 1, rowsPerPage = 10) {
        const data = { page, rowsPerPage };
        InvoiceService.getAllInvoiceWithPagenation(data)
            .then((response) => {
                const pagination = response.data.pagination || {};
                this.setState({
                    invoices: response.data.invoices || [],
                    loading: false,
                    currentPage: pagination.currentPage || 1,
                    rowsPerPage: pagination.rowsPerPage || 10,
                    totalInvoices: pagination.totalInvoices || 0,
                    totalPages: pagination.totalPages || 1, // 
                });
                console.log(`Invoices data: ${JSON.stringify(response.data)}`);
            })
            .catch((error) => {
                console.error("Error fetching invoices:", error);
                this.setState({ loading: false, invoices: [] });
            });
    }

    async loadVendors() {
        try {
            const vendorsData = await VendorService.getAllVendors();
            const vendors = vendorsData.data.vendor || [];
            const vendorsMap = this.fetchMap(vendors);
            this.setState({
                vendors: vendors,
                vendorsMap: vendorsMap,
            });
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    }

    fetchMap = (dataArray) => {
        return dataArray.reduce((acc, vendor) => {
            acc[vendor.id] = vendor?.vendorname;
            return acc;
        }, {});
    };

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage, loading: true }, () => {
            this.getAllInvoices(newPage, this.state.rowsPerPage);
        });
    };

    handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        this.setState({ rowsPerPage: newRowsPerPage, loading: true }, () => {
            this.getAllInvoices(1, newRowsPerPage);
        });
    };

    render() {
        const { invoices, loading, search, vendorsMap, vendors, currentPage, rowsPerPage, totalInvoices, totalPages } = this.state;
        const { isOperator, isAdmin, isOwner } = this.props;

        const filteredInvoices = invoices.filter(invoice => {
            const vendorName = vendorsMap[invoice.vendor_id]?.toLowerCase() || "";
            return (
                invoice.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
                vendorName.includes(search.toLowerCase())
            );
        });


        if (loading ) {
            return (
                <div className="w-100 text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div className='mt-100'>
                <h2 className='text-center'>Invoice Page</h2>
                <CreateInvoice
                    fetchInvoices={() => this.getAllInvoices()}
                    vendors={vendors}
                />
                <GetAllInvoices
                    invoices={filteredInvoices}
                    loading={loading}
                    search={search}
                    vendors={vendors}
                    vendorsMap={vendorsMap}
                    handleSearchChange={this.handleSearchChange}
                    fetchInvoices={(page, rowsPerPage) => this.getAllInvoices(page, rowsPerPage)}
                    totalInvoices={totalInvoices}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    handlePageChange={this.handlePageChange}
                    handleRowsPerPageChange={this.handleRowsPerPageChange}
                    isOperator={isOperator}
                    isAdmin={isAdmin}
                    isOwner={isOwner}
                />
            </div>
        );
    }
}

