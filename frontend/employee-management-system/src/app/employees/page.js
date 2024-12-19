'use client';

import { useState, useEffect } from 'react';
import { getAllEmployeesApi } from '../api/employeeApi';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployeesApi();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Employee List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Employee ID</th>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Phone</th>
              <th className="px-6 py-3 border-b text-left">Department</th>
              <th className="px-6 py-3 border-b text-left">Join Date</th>
              <th className="px-6 py-3 border-b text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{employee.name}</td>
                <td className="px-6 py-4 border-b">{employee.employee_id}</td>
                <td className="px-6 py-4 border-b">{employee.email}</td>
                <td className="px-6 py-4 border-b">{employee.phone}</td>
                <td className="px-6 py-4 border-b capitalize">{employee.department}</td>
                <td className="px-6 py-4 border-b">
                  {new Date(employee.date_of_joining).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b capitalize">{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}