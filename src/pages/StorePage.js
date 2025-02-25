
// import React, { useState, useEffect } from "react";
// import TableComponent from "../Component/SharedComponent/TableComponent";
// import http from "../http-common";
// import ChartComponent from "../Component/SharedComponent/ChartComponent";

// const StorePage = () => {
//   const [items, setItems] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Fetch items with pagination
//   const fetchItems = async () => {
//     try {
//       const response = await http.post("/get-items", {
//         page: currentPage,
//         rowsPerPage,
//       });
//       setItems(response.data.data);
//       setTotalItems(response.data.pagination.totalItems);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   const handlePageChange = (newPage) => setCurrentPage(newPage);

//   const handleRowsPerPageChange = (newRowsPerPage) =>
//     setRowsPerPage(newRowsPerPage);

//   const handleSearchChange = async (keyword) => {
//     if (keyword) {
//       const { data } = await http.get(`/search/${keyword}`);
//       setItems(data.data);
//     } else {
//       fetchItems();
//     }
//   };

//   useEffect(() => {
//     fetchItems(); // Initial fetch
//   }, [currentPage, rowsPerPage]);

//   const chartLabels = items?.map((item) => item.Item.itemname);
//   const chartData = items?.map((item) => item.quantity);

//   const columns = [
//     { key: "Item.itemname", label: "Item Name" },
//     { key: "quantity", label: "Quantity" },
//     { key: "Item.Uom.uomname", label: "UOM" },
//   ];

//   return (
//     <div className="container mt-100">
//       <h2 className="mb-4 text-center">Store Page</h2>
//       <div className="row">
//       <div className="col-md-6">
//           <TableComponent
//             data={items}
//             totalItems={totalItems}
//             columns={columns}
//             currentPage={currentPage}
//             rowsPerPage={rowsPerPage}
//             handleRowsPerPageChange={handleRowsPerPageChange}
//             onPageChange={handlePageChange}
//             handleSearch={handleSearchChange}
//             showSearch={true}
//             pagenation={true}
//             Action={false}
//           />
//         </div>
//         <div className="col-md-6 mt-6 mb-3">
//           <ChartComponent
//             labels={chartLabels}
//             data={chartData}
//             type="bar" 
//           />
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default StorePage;




import React, { useState, useEffect } from "react";
import TableComponent from "../Component/SharedComponent/TableComponent";
import http from "../http-common";
import ChartComponent from "../Component/SharedComponent/ChartComponent";

const StorePage = () => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null); // State for debounce timer

  // Fetch items with pagination
  const fetchItems = async () => {
    try {
      const response = await http.post("/get-items", {
        page: currentPage,
        rowsPerPage,
      });
      setItems(response.data.data);
      setTotalItems(response.data.pagination.totalItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Custom debounce using setTimeout
  const handleSearchChange = (keyword) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer); // Clear the previous timeout
    }

    // Set a new timeout for debounce (500ms delay)
    const timer = setTimeout(async () => {
      if (keyword) {
        const { data } = await http.post("/search", {
          itemname: keyword,
          page: currentPage,
          rowsPerPage,
        });
        setItems(data.data);
        setTotalItems(data.pagination.totalItems);
      } else {
        fetchItems(); // If the search keyword is cleared, reset to pagination fetch
      }
    }, 500); // 500ms delay for debounce

    setDebounceTimer(timer); // Store the timer ID
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to page 1 on rows per page change
  };

  useEffect(() => {
    fetchItems(); // Initial fetch
  }, [currentPage, rowsPerPage]);

  const chartLabels = items?.map((item) => item.Item.itemname);
  const chartData = items?.map((item) => item.quantity);

  const columns = [
    { key: "Item.itemname", label: "Item Name" },
    { key: "quantity", label: "Quantity" },
    { key: "Item.Uom.uomname", label: "UOM" },
  ];

  return (
    <div className="container mt-100">
      <h2 className="mb-4 text-center">Store Page</h2>
      <div className="row">
        <div className="col-md-6">
          <TableComponent
            data={items}
            totalItems={totalItems}
            columns={columns}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            handleSearch={handleSearchChange} // Attach the custom debounced search
            showSearch={true}
            pagenation={true}
            Action={false}
          />
        </div>
        <div className="col-md-6 mt-6 mb-3">
          <ChartComponent
            labels={chartLabels}
            data={chartData}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
};

export default StorePage;
