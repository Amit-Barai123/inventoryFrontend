
import React, { useState, useEffect, useCallback } from 'react';
import http from '../http-common';
import TableComponent from '../Component/SharedComponent/TableComponent';
import { toast } from 'react-toastify';
import { DateFormatter } from '../hooks/DateTimeFormatter';
const TranscationPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [totaltransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // For debounce
  const [searchOption, setSearchOption] = useState("item_name");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch transactions with pagination and search
  const fetchItems = async (page = currentPage, limit = rowsPerPage, search = debouncedSearchTerm) => {
    try {
      const payload = { page, limit };

      if (search) {
        payload[searchOption] = search;
      }
      if (startDate && endDate) {
        payload.startDate = startDate;
        payload.endDate = endDate;
      }

      const response = await http.post("/transactions/search", payload);
      setTransactions(response.data.data);
      setTotalTransactions(response.data.pagination.total);
    } catch (error) {
      toast.error("Error fetching items:" || error);
    }
  };

  // Debounce function to delay API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler); // Cleanup function to prevent unnecessary API calls
    };
  }, [searchTerm]);

  // Fetch data when debounced search term changes
  useEffect(() => {
    fetchItems(1, rowsPerPage, debouncedSearchTerm);
  }, [debouncedSearchTerm, rowsPerPage, currentPage]);

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle pagination change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to page 1 when changing rows per page
  };

  // Handle date range search
  const handleDateRangeSearch = async () => {
    if (startDate && endDate) {
      fetchItems(1, rowsPerPage, searchTerm); // Fetch with date range and search term
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  }, [searchOption]);

  const handlePrint = () => {
    window.print();
  };

  const columns = [
   { 
         key: 'date', 
         label: 'Date', 
         render: (value) => DateFormatter(value) // Apply DateFormatter to the date value
       },
    { key: "Item.itemname", label: "Item" },
    { key: "credit_quantity", label: "Credit Quantity" },
    { key: "debit_quantity", label: "Debit Quantity" },
    { key: "invoice_no", label: "Invoice No" },
    { key: "Vendor.vendorname", label: "Vendor" },
    { key: "Recipe.recipe_name", label: "Recipe" },
    { key: "RecipeCategory.category", label: "Category" },
    { key: "Uom.uomname", label: "UOM" },
  ];

  return (
    <div className='container mt-100'>
      <h2 className='text-center'>Transaction Page</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <select
            className="form-select w-auto"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="item_name">Item Name</option>
            <option value="invoice_no">Invoice No</option>
            <option value="vendor_name">Vendor Name</option>
            <option value="date">Date</option>
            <option value="date-range">Date Range</option>
          </select>

          {searchOption === "date" ? (
            <input
              type="date"
              className="form-control w-100 ms-2"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          ) : searchOption === "date-range" ? (
            <>
              <input
                type="date"
                className="form-control w-auto ms-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="form-control w-auto ms-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleDateRangeSearch}>
                Search
              </button>
            </>
          ) : (
            <input
              type="text"
              className="form-control w-100 ms-2"
              value={searchTerm}
              placeholder={`Search by ${searchOption.replace("_", " ")}...`}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          )}
              
        </div>
        <button onClick={handlePrint} className="btn btn-success">
       <span className="bi bi-printer-fill" ></span> Print
      </button>
      </div>

      <TableComponent
        data={transactions}
        columns={columns}
        totalItems={totaltransactions}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handleSearch={handleSearchChange}
        showSearch={false}
        pagenation={true}
        placeholder={`Search by ${searchOption.replace("_", " ")}...`}
      />
    </div>
  );
};

export default TranscationPage;
