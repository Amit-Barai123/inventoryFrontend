
import React, { useState, useEffect } from "react";
import TableComponent from "../Component/SharedComponent/TableComponent";
import http from "../http-common";
const LowStockPage = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch low stock items with pagination
  const fetchLowStockItems = async () => {
    try {
      const response = await http.post("/low-stock", {
        page: currentPage,
        rowsPerPage,
        search: searchTerm,
      });
      setLowStockItems(response.data.data);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error("Error fetching low stock items:", error);
    }
  };

  // Handle pagination change
  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const handleRowsPerPageChange = (newRowsPerPage) => setRowsPerPage(newRowsPerPage);

  // Handle search functionality
  const handleSearchChange = (keyword) => {
    setSearchTerm(keyword);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Fetch data on mount & when dependencies change
  useEffect(() => {
    fetchLowStockItems();
  }, [currentPage, rowsPerPage, searchTerm]);

  // Table column definitions
  const columns = [
    { key: "Item.itemname", label: "Item Name" },
    { key: "quantity", label: "Quantity" },
    { key: "Item.Uom.uomname", label: "UOM" },
  ];

  return (
    <div style={{marginTop:"100px"}} className="container mt-80">
      <h2 className="mb-4">Low Stock Items</h2>
      <TableComponent
        data={lowStockItems}
        totalItems={totalItems}
        columns={columns}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        handleSearch={handleSearchChange}
        showSearch={false}
        pagenation={true}
        Action={false}
      />
    </div>
  );
};

export default LowStockPage;
