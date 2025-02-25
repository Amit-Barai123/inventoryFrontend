import React, { Component } from 'react';
import GetAllItems from '../components/items/get_all_items';
import CreateItem from '../components/items/create_item';
import { exportToCSV } from "../../../common/csv_methods";
import ItemService from '../../../services/items_service';
import UomService from '../../../services/uom_service';

export default class ItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            uoms: [],
            uomsMap: {},
            loading: true,
            search: "",
            csvFile: null, // To store the selected CSV file
        };
    }

    componentDidMount() {
        this.getAllItems();
        this.getAllUoms();
    }

    getAllItems = () => {
        ItemService.getAllItems()
            .then((response) => {
                this.setState({
                    items: response.data.items || [],
                    loading: false,
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({ loading: false });
            });
    };

    async getAllUoms() {
        const uomsData = await UomService.getAllUoms();
        const uoms = uomsData.data.uom;
        const uomsMap = this.fetchMap(uoms);
        this.setState({
            uoms: uoms,
            uomsMap: uomsMap
        });
    }

    fetchMap = (dataArray) => {
        return dataArray.reduce((acc, uom) => {
            acc[uom.id] = uom.uomname;
            return acc;
        }, {});
    };

    handleExportCSV = () => {
        const data = {
            modelName: "item",
            fields: ["uomid", "itemname"],
        };
        exportToCSV(data, "items.csv");
    };

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    handleFileChange = (event) => {
        this.setState({ csvFile: event.target.files[0] });
    };

    handleImportCSV = () => {
        const { csvFile } = this.state;

        if (!csvFile) {
            alert("Please select a CSV file to import.");
            return;
        }

        const formData = new FormData();
        formData.append('modelName', 'item');
        formData.append('file', csvFile);

        ItemService.importFromCSV(formData)
            .then(response => {
                alert(response.data.message);
                this.getAllItems();
            })
            .catch(error => {
                console.error("Error importing CSV:", error);
                alert("Error importing CSV data.");
            });
    };



    render() {
        const { items, loading, search, uoms, uomsMap } = this.state;
        const filteredItems = items.filter(item =>
            item.itemname?.toLowerCase().includes(search.toLowerCase())
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
            <div style={{ marginTop: "100px" }} className='row mt-80 justify-content-center'>
                <h2 className='text-center mb-5'>Items Page</h2>
                <div className='col-md-10'>
                    <div>
                        {/* Row 1: Export CSV & Choose File */}
                        <div className="row mb-3 align-items-center">
                            <div className=" d-flex justify-content-between gap-2">

                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={this.handleFileChange}
                                    className="form-control w-50"
                                />
                                <button className="btn btn-warning  " onClick={this.handleImportCSV}><span className=' bi bi-table '></span>
                                    <span> Import From CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* Row 2: Search Item, Create Item & Import CSV */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            {/* Search Box */}
                            <div className="col-md-4 col-sm-6">
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Search Items"
                                    value={search}
                                    onChange={this.handleSearchChange}
                                />
                            </div>

                            {/* Create Item Button */}
                            <div className='d-flex gap-2 '>
                                <div className="col-md-4 col-sm-6 text-center w-auto">
                                    <CreateItem uoms={uoms} fetchItems={this.getAllItems} />
                                </div>

                                {/* Import CSV Button */}
                                <div className="col-md-4 text-md-end text-center mt-2 mt-md-0 w-auto">

                                    <button className="btn btn-success w-auto" onClick={this.handleExportCSV}>
                                        <span className=' bi bi-table '></span>
                                        <span> Export To CSV</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <GetAllItems
                        items={filteredItems}
                        uoms={uoms}
                        uomsMap={uomsMap}
                        loading={loading}
                        search={search}
                        fetchItems={this.getAllItems}
                    />

                </div>
            </div>
        );
    }
}
