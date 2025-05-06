import React, { useState } from 'react';
import './Customers.css';

const Customers = () => {
  const [formData, setFormData] = useState({
    Customer_id: '',
    Name: '',
    DOB: '',
    E_mail: '',
    Phone: '',
    Address: '',
    PAN: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fetchCustomerDetails = async (customerId) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/customer/${customerId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Customer not found');
        }
        throw new Error(`Server error: ${response.status}`);
      }
      
      const customerData = await response.json();
      
      // Format the date to match input[type="date"] format (YYYY-MM-DD)
      const formattedDOB = customerData.DOB ? customerData.DOB.split('T')[0] : '';
      
      setFormData({
        Customer_id: customerData.Customer_id,
        Name: customerData.Name || '',
        DOB: formattedDOB,
        E_mail: customerData.E_mail || '',
        Phone: customerData.Phone || '',
        Address: customerData.Address || '',
        PAN: customerData.PAN || ''
      });
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching customer:', error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    const customerId = prompt("Enter Customer ID to edit:");
    if (customerId && customerId.trim() !== '') {
      fetchCustomerDetails(customerId.trim());
    } else if (customerId !== null) {
      alert("Please enter a valid Customer ID");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = isEditing 
        ? `http://localhost:5000/customer/update/${formData.Customer_id}`
        : 'http://localhost:5000/new_customer';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} customer`);
      }

      alert(`Customer ${isEditing ? 'updated' : 'created'} successfully!`);

      // Reset form
      setFormData({
        Customer_id: '',
        Name: '',
        DOB: '',
        E_mail: '',
        Phone: '',
        Address: '',
        PAN: ''
      });
      setIsEditing(false);

    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} customer:`, error);
      setError(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='form'>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {isEditing && (
          <>
            <label>Customer ID</label>
            <input 
              type="text" 
              name="Customer_id" 
              placeholder="Customer ID" 
              value={formData.Customer_id} 
              onChange={handleChange} 
              required 
              disabled
            />
          </>
        )}
        <label>Name</label>
        <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required />
        <label>DOB</label>
        <input type="date" name="DOB" placeholder="Date of Birth" value={formData.DOB} onChange={handleChange} required />
        <label>E_mail</label>
        <input type="email" name="E_mail" placeholder="Email" value={formData.E_mail} onChange={handleChange} required />
        <label>Phone</label>
        <input type="text" name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} required />
        <label>Address</label>
        <input type="text" name="Address" placeholder="Address" value={formData.Address} onChange={handleChange} required />
        <label>PAN</label>
        <input type="text" name="PAN" placeholder="PAN" value={formData.PAN} onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : isEditing ? 'Update Customer' : 'Create Customer'}
        </button>
      
        <button type="submit" onClick={handleEditClick} className="edit-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Edit Customer Details'}
        </button>
      </form>
    </div>
  );
};

export default Customers;