// const connection = require('../config/db');
// exports.addEmployee = (req, res) => {
//     const {name, employee_id, email, phone, department, date_of_joining, role} = req.body;
//     const query = `INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//     connection.query(query, [name, employee_id, email, phone, department, date_of_joining, role], (err) => {
//         if (err){
//             if (err.code==='ER_DUP_ENTRY') {
//                 return res.status(400).json({message:'Employee ID or Email already exists.'});
//             }
//             return res.status(500).json({message:'Database error.', error: err });
//         }
//         res.status(201).json({message:'Employee added successfully!'});
//     });
// };

// exports.getAllEmployees= (req, res) => {
//     connection.query('SELECT * FROM employees', (err, results) => {
//         if (err){
//             return res.status(500).json({message:'Database error.', error: err });
//         }
//         res.status(200).json(results);
//     });
// };


const connection = require('../config/db');

// Validate input before database insertion
const validateEmployeeData = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
  }

  // Employee ID validation
  if (!data.employee_id || data.employee_id.trim() === '') {
    errors.push('Employee ID is required');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.push('Valid email is required');
  }

  // Phone validation (assuming 10 digit phone number)
  const phoneRegex = /^\d{10}$/;
  if (!data.phone || !phoneRegex.test(data.phone.trim())) {
    errors.push('Valid 10-digit phone number is required');
  }

  // Department validation
  const validDepartments = ['ece', 'cse', 'it'];
  if (!data.department || !validDepartments.includes(data.department.trim().toLowerCase())) {
    errors.push('Valid department is required');
  }

  // Date validation
  if (!data.date_of_joining || isNaN(Date.parse(data.date_of_joining))) {
    errors.push('Valid join date is required');
  }

  // Role validation
  const validRoles = ['engineer', 'manager', 'technician'];
  if (!data.role || !validRoles.includes(data.role.trim().toLowerCase())) {
    errors.push('Valid role is required');
  }

  return errors;
};

exports.addEmployee = (req, res) => {
  // Validate input first
  const validationErrors = validateEmployeeData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationErrors
    });
  }

  const {name, employee_id, email, phone, department, date_of_joining, role} = req.body;
  
  // Check for existing employee with same ID or email
  const checkQuery = 'SELECT * FROM employees WHERE employee_id = ? OR email = ?';
  connection.query(checkQuery, [employee_id, email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing employee:', checkErr);
      return res.status(500).json({
        message: 'Database error during employee check',
        error: checkErr.toString()
      });
    }

    // If employee with same ID or email exists
    if (checkResults.length > 0) {
      const existingEmployee = checkResults[0];
      const errorMessages = [];
      
      if (existingEmployee.employee_id === employee_id) {
        errorMessages.push('Employee ID already exists');
      }
      
      if (existingEmployee.email === email) {
        errorMessages.push('Email already exists');
      }

      return res.status(400).json({
        message: 'Duplicate employee data',
        errors: errorMessages
      });
    }

    // If no existing employee, proceed with insertion
    const query = `INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query(query, [name, employee_id, email, phone, department, date_of_joining, role], (err, result) => {
      if (err) {
        console.error('Error inserting employee:', err);
        return res.status(500).json({
          message: 'Database error during employee insertion',
          error: err.toString(),
          errorCode: err.code
        });
      }
      
      res.status(201).json({
        message: 'Employee added successfully!',
        employeeId: result.insertId
      });
    });
  });
};

exports.getAllEmployees = (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({
        message: 'Database error while fetching employees',
        error: err.toString()
      });
    }
    res.status(200).json(results);
  });
};