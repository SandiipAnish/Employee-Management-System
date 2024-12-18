// export const addEmployeeApi = async (employeeData) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/employees/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(employeeData)
//     });

//     // Parse the response text first, as the error might be in text format
//     const responseText = await response.text();

//     // Check if the response is not OK
//     if (!response.ok) {
//       // Try to parse the error as JSON, but fall back to the text if it's not valid JSON
//       let errorMessage = 'Failed to add employee';
//       try {
//         const errorData = JSON.parse(responseText);
//         errorMessage = errorData.message || errorMessage;
//       } catch {
//         errorMessage = responseText || errorMessage;
//       }

//       // Throw an error with the parsed message
//       throw new Error(errorMessage);
//     }

//     // If response is OK, parse and return the JSON
//     return JSON.parse(responseText);
//   } catch (error) {
//     console.error('Error in addEmployeeApi:', error);
    
//     // Re-throw the error with a more informative message
//     throw new Error(`API Error: ${error.message}`);
//   }
// }


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
    
    // Re-throw the error with a more informative message
    throw new Error(`API Error: ${error.message}`);
  }
}