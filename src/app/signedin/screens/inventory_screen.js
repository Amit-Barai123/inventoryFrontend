import React, { Component } from 'react';
import CreateInventory from '../components/inventory/create_inventory';
import GetAllInventory from '../components/inventory/get_all_inventory';
import InventoryService from '../../../services/inventory_service';
import ItemService from '../../../services/items_service';
import VendorService from '../../../services/vendors_service';
import UomService from '../../../services/uom_service';
import InvoiceService from '../../../services/invoices_service';


export default class InventoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            vendorMap: {},
            itemMap: {},
            uomMap: {},
            loading: true,
            search: "",
            items: [],
            vendors: [],
            uoms: [],
            invoices: [],
            currentPage: 1,
            rowsPerPage: 10,
            totalInvoices: 0,
            totalPages: 1,
        };
    }

    componentDidMount() {
        if (Object.keys(this.state.itemMap).length === 0) {
            this.fetchData().then(() => {
                this.getAllInventory();
            });
        } else {
            this.getAllInventory();
        }
    }

    getAllInventory(page = 1, rowsPerPage = 10) {
        const data = { page, rowsPerPage };
        InventoryService.getAllInvoiceWithPagenation(data)
        
            .then((response) => {
                this.setState({
                    inventory: response.data.inventory || [],
                    loading: false,
                    currentPage: response.data.currentPage || 1,
                    rowsPerPage: response.data.rowsPerPage || 10,
                    totalInvoices: response.data.totalRecords || 0,
                    totalPages: response.data.totalPages || 1, 
                });
                
            })
            .catch((e) => {
                console.log(e);
                this.setState({ loading: false, inventory: [] });
            });
    }

    async fetchData() {
        try {
            this.setState({ loading: true });
            const [itemsRes, vendorsRes, uomsRes, invoicesRes] = await Promise.all([
                ItemService.getAllItems(),
                VendorService.getAllVendors(),
                UomService.getAllUoms(),
                InvoiceService.getAllInvoices(),
            ]);

            const invoices = invoicesRes?.data?.invoices || [];
            const vendorMap = this.fetchMap(vendorsRes?.data?.vendor);
            const itemMap = this.fetchMap(itemsRes?.data?.items);
            const uomMap = this.fetchMap(uomsRes?.data?.uom);

            this.setState({
                vendorMap,
                itemMap,
                uomMap,
                items: itemsRes?.data?.items,
                vendors: vendorsRes?.data?.vendor,
                uoms: uomsRes?.data?.uom,
                invoices,
            });
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ loading: false }); // Ensure loading is false after all API calls
        }
    }
     
 
    fetchMap = (dataArray) => {
        return dataArray.reduce((acc, item) => {
            acc[item?.id] = item?.itemname || item?.vendorname || item?.uomname;
            return acc;
        }, {});
    };

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage, loading: true }, () => {
            this.getAllInventory(newPage, this.state.rowsPerPage);
        });
    };

    handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        this.setState({ rowsPerPage: newRowsPerPage, loading: true }, () => {
            this.getAllInventory(1, newRowsPerPage);
        });
    };

    render() {
        const { isOwner } = this.props;
        const { inventory, loading, search, vendorMap, itemMap, uomMap, items, vendors, uoms, invoices , currentPage, rowsPerPage, totalInvoices, totalPages } = this.state;
        const filteredInventory = inventory.filter(item =>
            item.invoice_number?.toLowerCase().includes(search.toLowerCase())
        );

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
            <div className='mt-100'>
                <h2 className='text-center'>Inventory Page</h2>
                <CreateInventory
                    fetchInventory={() => this.getAllInventory()}
                    items={items}
                    vendors={vendors}
                    uoms={uoms}
                    invoices={invoices}
                />
                <GetAllInventory 
                    inventory={filteredInventory}
                    loading={loading}
                    search={search}
                    vendorMap={vendorMap}
                    itemMap={itemMap}
                    uomMap={uomMap}
                    items={items}
                    vendors={vendors}
                    uoms={uoms}
                    invoices={invoices}
                    handleSearchChange={this.handleSearchChange}
                    fetchInventory={() => this.getAllInventory()}
                    fetchData={() => this.fetchData()}
                    isOwner={isOwner}

                    totalInvoices={totalInvoices}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    handlePageChange={this.handlePageChange}
                    handleRowsPerPageChange={this.handleRowsPerPageChange}
                />
            </div>
        );
    }
}
