
import React, { useState, useEffect, useCallback } from 'react';
import http from '../http-common';
import TableComponent from '../Component/SharedComponent/TableComponent';
import ModalComponent from '../Component/SharedComponent/ModelComponent';
import { toast } from 'react-toastify';
import { DateFormatter } from '../hooks/DateTimeFormatter';
const ConsumptionDaysPage = () => {
  const [consumptionDays, setConsumptionDays] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItem, setTotalItem] = useState(0);

  const [formData, setFormData] = useState({
    date: "",
    adults_count: "",
    children_count: "",
  });

  useEffect(() => {
    fetchConsumptionDays();
  }, [currentPage, rowsPerPage, searchTerm]);

  const fetchConsumptionDays = async () => {
    try {
      const response = await http.post('/getconsumption-days', {
        page: currentPage,
        pageSize: rowsPerPage,
      });

      setConsumptionDays(response.data.consumptionDays);
      setTotalItem(response.data.pagination.totalRecords);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  const handleFormSubmit = async (data) => {
    try {
      const date = new Date(data.date);
      const updatedData = { ...data, date: date };
      let response;
      if (editingData) {
        response = await http.put(`/consumption-days/${editingData.id}`, updatedData);
      } else {
        response = await http.post(`/consumption-days`, updatedData);
      }
      fetchConsumptionDays();
      setShowModal(false);
      setEditingData(null);
      toast.success(response?.data?.message || "Consumption day saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving the consumption day!");
    }
  };

  const handleEdit = (data) => {
    const date = new Date(data.date);
    date.setDate(date.getDate());

    setEditingData({
      ...data,
      date: date.toISOString().split('T')[0],
    });

    setFormData({
      date: date.toISOString().split('T')[0],
      adults_count: data.adults_count,
      children_count: data.children_count,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await http.delete(`/consumption-days/${id}`);
      fetchConsumptionDays();
      toast.success("Consumption day deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting consumption day!");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({});
    setEditingData(null);
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (keyword) => {
      if (keyword) {
        try {
          const { data } = await http.post('/getconsumption-date', {
            date: keyword,
            page: currentPage,
            pageSize: rowsPerPage,
          });

          setConsumptionDays(data.consumptionDays);
          setTotalItem(data.pagination.totalRecords);
        } catch (error) {
          toast.error(error.response?.data?.message || "Error searching consumption days!");
        }
      } else {
        fetchConsumptionDays();
      }
    }, 500),
    [currentPage, rowsPerPage]
  );

  const handleSearchChange = (keyword) => {
    setSearchTerm(keyword);
    debouncedSearch(keyword);
  };

  const columns = [
    { 
      key: 'date', 
      label: 'Date', 
      render: (value) => DateFormatter(value) // Apply DateFormatter to the date value
    },
    { key: 'adults_count', label: 'Adults Count' },
    { key: 'children_count', label: 'Children Count' },
  ];

  const formFields = [
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'adults_count', label: 'Adults Count', type: 'number', required: true },
    { name: 'children_count', label: 'Children Count', type: 'number', required: true },
  ];

  return (
    <div style={{ marginTop: '20vh' }} className="container">
      <h2 className='text-center'>Consumption Days</h2>

      <div>
        <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
          Add Consumption Day
        </button>

        {showModal && (
          <ModalComponent
            showModal={showModal}
            header={"Daily Consumption"}
            onClose={handleClose}
            onSubmit={handleFormSubmit}
            isEditing={editingData !== null}
            formData={formData}
            setFormData={setFormData}
            fields={formFields}
          />
        )}

        <TableComponent
          data={consumptionDays}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          onPageChange={handlePageChange}
          handleSearch={handleSearchChange}
          showSearch={true}
          totalItems={totalItem}
          pagenation={true}
          Action={true}
          placeholder={"YYYY-MM-DD"}
        />
      </div>
    </div>
  );
};

export default ConsumptionDaysPage;



