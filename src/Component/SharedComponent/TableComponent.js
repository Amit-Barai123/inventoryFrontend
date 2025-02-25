
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

// Helper function to get nested values from an object
const getNestedValue = (key, obj) => {
  return key.split('.').reduce((value, part) => value && value[part], obj);
};

const TableComponent = ({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  totalItems,
  currentPage,
  handleRowsPerPageChange,
  rowsPerPage,
  onPageChange,
  handleSearch,
  showSearch,
  pagenation,
  Action,
  placeholder
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmationModal(true); // Show the modal
  }; 
  const handleConfirmDelete = () => {
    if (onDelete && deleteId) {
      onDelete(deleteId); // Call the delete function passed as a prop
    }
    setShowConfirmationModal(false); // Hide the modal
    setDeleteId(null); // Reset the delete ID
  };
  // handle print
    const handlePrint = () => {
      window.print();
    };
  return (
    <>
      {/* Search Bar */}
      
        {
          showSearch && (
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <input
          type="text"
          className="form-control w-50"
          placeholder={placeholder ? placeholder :  "Search..."}
          onChange={(e) =>  handleSearch(e.target.value)} // Trigger page change with search term
        />
        <button onClick={handlePrint} className="btn btn-success">
       <span className="bi bi-printer-fill" ></span> Print
      </button>
            </div>
          )
        }
      

      {/* Table */}
      <table className="table table-bordered text-center table-striped table-responsive">
        <thead className="bg-dark text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
           {
            Action && ( <th>Actions</th>)
           }
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((row) => (
              <tr key={row?.id}>
                {columns?.map((col) => (
                  <td key={col?.key}>
                    {col?.render
                      ? col?.render(getNestedValue(col?.key, row), row)
                      : getNestedValue(col?.key, row)}
                  </td>
                ))}
               {
               Action && (
                  <td>
                  {onEdit && (
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => onEdit(row)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDeleteClick(row.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  )}
                  {onView && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeleteClick(row.id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  )}
                </td>
                )
               }
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {
        pagenation && (
          <nav aria-label="Page navigation d-flex justify-content-start">
        <ul className="pagination">
          {/* Previous Page */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: Math.ceil(totalItems / rowsPerPage) }).map(
            (_, index) => {
              const page = index + 1;
              return (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            }
          )}

          {/* Next Page */}
          <li
            className={`page-item ${
              currentPage === Math.ceil(totalItems / rowsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
          <li>
          <select
          className="form-select ms-2 w-auto"
          value={rowsPerPage}
          onChange={(e) =>handleRowsPerPageChange(parseInt(e.target.value, 10))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={999}>All</option>
        </select>
          </li>
          
        </ul>
        
      </nav>
        )
      }
        

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this record?"
        header="Delete Item"
      />
    </>
  );
};

export default TableComponent;