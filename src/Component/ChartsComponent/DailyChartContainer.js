import React, { useEffect, useState } from "react";
import ChartComponent from "../SharedComponent/ChartComponent";
import http from "../../http-common";

const DailyChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1); // Pagination state
  const [limit, setLimit] = useState(10); // Limit state
  const [totalPages, setTotalPages] = useState(1);
  const [chartType, setChartType] = useState("bar");
  

  useEffect(() => {
    // Fetch API Data
    const fetchData = async () => {
      try {
        const response = await http.post("/item-credit-data", {
          "date": date,
          "page": page,
          "limit": limit

        });

        const responseData = response.data;
        const data = responseData.data;

        // Process API Data for Chart
        const itemNames = data.map((item) => item.itemName);
        const quantities = data.map((item) => item.totalDebitQuantity);

        setLabels(itemNames); // Set labels
        setChartData(quantities); // Set data
        setTotalPages(responseData.metadata.totalPages);

        setLoading(false); // Mark as loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    
  }, [date, page, limit]);


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
      <div className="card-header d-flex justify-content-between">
        <h5>Select  Consumption Date</h5>
        <div className="d-flex flex-column flex-sm-row align-items-start gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control date-input w-100 w-sm-auto date-input"
          />
        </div>
     
      </div>
      <ChartComponent
        data={chartData}
        labels={labels}
        type={chartType} // You can change this to "line" or "pie"
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
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-1">
        <nav className="mt-3 d-flex justify-content-start align-items-center">
        {/* Pagination */}
        <ul className="pagination mb-0">
          {/* Previous Page */}
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <li
                key={pageNum}
                className={`page-item ${page === pageNum ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}

          {/* Next Page */}
          <li
            className={`page-item ${page === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>

        {/* Rows Per Page */}
        <div className="d-flex align-items-center ms-2">

          <select
            id="rowsPerPage"
            value={limit}
            onChange={handleLimitChange}
            className="form-select w-auto"
          >
            <option value={10}>10 Rows</option>
            <option value={2}> 2 Rows</option>
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

export default DailyChartContainer;



// import React, { useEffect, useState } from "react";
// import ChartComponent from "../SharedComponent/ChartComponent";
// import http from "../../http-common";

// const DailyChartContainer = () => {
//   const [chartData, setChartData] = useState([]);
//   const [labels, setLabels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [chartType, setChartType] = useState("bar"); // Chart type state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await http.post("/item-credit-data", {
//           date: date,
//           page: page,
//           limit: limit
//         });

//         const responseData = response.data;
//         const data = responseData.data;
//         const itemNames = data.map((item) => item.itemName);
//         const quantities = data.map((item) => item.totalDebitQuantity);

//         setLabels(itemNames);
//         setChartData(quantities);
//         setTotalPages(responseData.metadata.totalPages);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [date, page, limit]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value));
//     setPage(1);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="card-header d-flex justify-content-between">
//         <h5>Select Consumption Date</h5> 
//         <select
//             value={chartType}
//             onChange={(e) => setChartType(e.target.value)}
//             className="form-select w-auto"
//           >
//             <option value="bar">Bar Chart</option>
//             <option value="line">Line Chart</option>
//             <option value="pie">Pie Chart</option>
//             <option value="doughnut">Doughnut Chart</option>
//           </select>
//         <div className="d-flex flex-column flex-sm-row align-items-start gap-2">
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="form-control date-input w-100 w-sm-auto"
//           />
        
//         </div>
//       </div>
//       <ChartComponent
//         data={chartData}
//         labels={labels}
//         type={chartType}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               display: true,
//               position: "top",
//             },
//           },
//         }}
//       />
//       <nav className="mt-3 d-flex justify-content-start align-items-center">
//         <ul className="pagination mb-0">
//           <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//             <button className="page-link" onClick={() => handlePageChange(page - 1)}>
//               Previous
//             </button>
//           </li>
//           {Array.from({ length: totalPages }).map((_, index) => {
//             const pageNum = index + 1;
//             return (
//               <li key={pageNum} className={`page-item ${page === pageNum ? "active" : ""}`}>
//                 <button className="page-link" onClick={() => handlePageChange(pageNum)}>
//                   {pageNum}
//                 </button>
//               </li>
//             );
//           })}
//           <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
//             <button className="page-link" onClick={() => handlePageChange(page + 1)}>
//               Next
//             </button>
//           </li>
//         </ul>
//         <div className="d-flex align-items-center ms-2">
//           <select id="rowsPerPage" value={limit} onChange={handleLimitChange} className="form-select w-auto">
//             <option value={10}>10 Rows</option>
//             <option value={20}>20 Rows</option>
//             <option value={25}>25 Rows</option>
//           </select>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default DailyChartContainer;
