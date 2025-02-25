
import React, { useState, useEffect } from 'react';
import http from '../http-common';
import TableComponent from '../Component/SharedComponent/TableComponent';
import { toast } from 'react-toastify';

const UserStatusPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, rowsPerPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await http.post('/users-status', {
        page: currentPage,
        limit: rowsPerPage,
      });

      setUsers(response.data.users);
      setTotalItem(response.data.pagination.totalUsers);
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

  const handleSearchChange = async (keyword) => {
    setSearchTerm(keyword);
    if (keyword) {
      const { data } = await http.get(`/search-users/${keyword}`);
      setUsers(data.users);
    } else { 
      fetchUsers();
    }
  };

  const handleStatusChange = async (id, isActive) => {
    try {
      const response = await http.put('/update-users-status', {
        id,
        isActive,
      });

      if (response.data.success) {
        toast.success(`User ${isActive ? 'activated' : 'deactivated'} successfully!`);
        fetchUsers(); // Refresh the user list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating user status!');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    {
      key: 'isActive',
      label: 'Status',
      render: (isActive, row) => (
        <button
          className={`btn btn-sm ${isActive ? 'btn-success' : 'btn-danger'}`}
          onClick={() => handleStatusChange(row.id, !isActive)}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '20vh' }} className="container">
      <h2 className='text-center'>User Status Management page</h2>

      <TableComponent
        data={users}
        columns={columns}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        handleSearch={handleSearchChange}
        showSearch={false}
        totalItems={totalItem}
        pagenation={true}
        Action={false} // No edit/delete actions needed
      />
    </div>
  );
};

export default UserStatusPage;