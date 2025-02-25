
import React, { useEffect, useState } from "react";
import ChartComponent from "../SharedComponent/ChartComponent";
import http from "../../http-common";

const InventoryDateRangeItemsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartType, setChartType] = useState("bar"); // Default chart type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.post("/inventory-items-byDateRange", {
          startDate,
          endDate,
          page,
          limit,
        });

        const responseData = response.data;
        const data = responseData.data;

        if (!data || data.length === 0) {
          setLabels(["No Data"]);
          setChartData([0]);
          setLoading(false);
          return;
        }

        const itemNames = data.map((item) => item.itemName);
        const quantities = data.map((item) => item.totalQuantity);

        setLabels(itemNames);
        setChartData(quantities);
        setTotalPages(responseData.pagination.totalPages);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, page, limit]);

  // Handle Pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle Limit Change
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset to the first page when limit changes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h5 className="mb-3 mb-md-0">Select Inventory Date Range</h5>
        <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      {/* Chart Type Selection */}
     

      {/* Chart Component */}
      <ChartComponent
        data={chartData}
        labels={labels}
        type={chartType} // Dynamic chart type
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />

      {/* Pagination and Rows Per Page */}
   <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-1">
   <nav className="mt-3 d-flex justify-content-start align-items-center">
        <ul className="pagination mb-0">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(page - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <li key={pageNum} className={`page-item ${page === pageNum ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                  {pageNum}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(page + 1)}>
              Next
            </button>
          </li>
        </ul>

        <div className="d-flex align-items-center ms-2">
          <select id="rowsPerPage" value={limit} onChange={handleLimitChange} className="form-select w-auto">
            <option value={10}>10 Rows</option>
            <option value={15}>15 Rows</option>
            <option value={20}>20 Rows</option>
            <option value={25}>25 Rows</option>
          </select>
        </div>
      </nav>
      
      <div className="mt-3">
        <label className="me-2 fw-bold">Select Chart Type:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="form-select w-auto d-inline-block"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
      </div>
   </div>
      </div>
    
  );
};

export default InventoryDateRangeItemsChart;
