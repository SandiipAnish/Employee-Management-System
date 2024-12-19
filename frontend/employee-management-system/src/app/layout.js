import './globals.css';

export const metadata = {
  title: 'Employee Management System',
  description: 'Manage your employees efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">Employee Management</div>
            <div className="space-x-4">
              <a href="/" className="hover:text-gray-300">Add Employee</a>
              <a href="/employees" className="hover:text-gray-300">View Employees</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}