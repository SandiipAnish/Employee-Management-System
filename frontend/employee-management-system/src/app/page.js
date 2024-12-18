'use client';

import { useState } from 'react';
import { addEmployeeApi } from './api/employeeApi';

export default function EmployeeForm() {
  const initialState = {
    name: '',
    employee_id: '',
    email: '',
    phone: '',
    department: '',
    joinDate: '',
    role: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const result = await addEmployeeApi(formData);
      console.log('Employee added:', result);
      setFormData(initialState);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An unexpected error occurred');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Employee Registration</h1>
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            id="name" 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-input" 
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="employee_id" className="form-label">Employee ID</label>
          <input 
            id="employee_id" 
            type="number" 
            name="employee_id" 
            value={formData.employee_id} 
            onChange={handleChange} 
            className="form-input" 
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="form-input" 
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input 
            id="phone" 
            type="number" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="form-input" 
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="department" className="form-label">Department</label>
          <select 
            id="department" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
            className="form-input form-select" 
            required
          >
            <option value="">Select Department</option>
            <option value="ece">ECE</option>
            <option value="cse">CSE</option>
            <option value="it">IT</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="joinDate" className="form-label">Join Date</label>
          <input 
            id="joinDate" 
            type="date" 
            name="joinDate" 
            value={formData.joinDate} 
            onChange={handleChange} 
            className="form-input" 
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="role" className="form-label">Role</label>
          <select 
            id="role" 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className="form-input form-select" 
            required
          >
            <option value="">Select Role</option>
            <option value="engineer">Engineer</option>
            <option value="manager">Manager</option>
            <option value="technician">Technician</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}