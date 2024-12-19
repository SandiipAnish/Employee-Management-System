// Function to add an employee
export const addEmployeeApi = async (employeeData) => {
  try {
    // Ensure phone is a string of digits
    const formattedData = {
      name: employeeData.name.trim(),
      employee_id: employeeData.employee_id.toString().trim(),
      email: employeeData.email.trim(),
      phone: employeeData.phone.toString().trim(),
      department: employeeData.department.trim(),
      date_of_joining: employeeData.joinDate,
      role: employeeData.role.trim()
    };

    const response = await fetch('http://localhost:5000/api/employees/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData)
    });

    // Parse the response text first
    const responseText = await response.text();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch {
      throw new Error('Invalid server response');
    }

    // Check if the response is not OK
    if (!response.ok) {
      // Handle different types of error responses
      if (parsedResponse.errors) {
        // Validation errors
        throw new Error(parsedResponse.errors.join(', '));
      }
      
      // Generic error message
      throw new Error(parsedResponse.message || 'Failed to add employee');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error in addEmployeeApi:', error);
    throw new Error(`API Error: ${error.message}`);
  }
};

// Function to get all employees
export const getAllEmployeesApi = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/employees/all');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch employees');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error(`Failed to fetch employees: ${error.message}`);
  }
};