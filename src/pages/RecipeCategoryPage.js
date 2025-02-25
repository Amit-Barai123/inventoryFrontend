
import React, { useState, useEffect } from 'react';
import http from '../http-common';
import { toast } from 'react-toastify';
import TableComponent from '../Component/SharedComponent/TableComponent';
import ModalComponent from '../Component/SharedComponent/ModelComponent';

const RecipeCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await http.get('/categories');
      setCategories(response.data.categories);
    } catch (error) {
      toast.error("Error fetching categories!");
      console.error("Error fetching categories!", error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      let response;
      if (editingData) {
        response = await http.put(`/category/${editingData.id}`, data); // Update category
        toast.success("Category updated successfully");
      } else {
        response = await http.post('/category', data); // Create new category
        toast.success("Category created successfully");
      }

      setShowModal(false);
      setEditingData(null);
      setFormData({ category: '' });
      fetchCategories(); // Refresh categories list
    } catch (error) {
      toast.error("Error saving category!");
      console.error("Error saving category!", error);
    }
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setFormData({ category: data.category });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await http.delete(`/category/${id}`); // API endpoint for deleting a category by ID
        fetchCategories();
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Error deleting category!");
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ category: '' });
    setEditingData(null);
  };

  const columns = [
    { key: 'category', label: 'Category' },
  ];

  const formFields = [
    { name: 'category', label: 'Recipe Category', type: 'text', required: true },
  ];

  return (
    <div className="container mt-100">
      <h2 className='text-center'>Category Page</h2>

      <div className="mt-4">
        <button
          onClick={() => {
            setFormData({ category: '' }); // Clear the form data
            setEditingData(null);
            setShowModal(true); // Show the modal
          }}
          className="btn btn-primary mb-3"
        >
          Add New Category
        </button>
      </div>

      {showModal && (
        <ModalComponent
          showModal={showModal}
          header="Recipe Category"
          onClose={handleClose}
          onSubmit={handleFormSubmit}
          isEditing={editingData !== null}
          formData={formData}
          setFormData={setFormData}
          fields={formFields}
        />
      )}

      <TableComponent
        data={categories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        Action={true}
      />
    </div>
  );
};
export default RecipeCategoryPage;