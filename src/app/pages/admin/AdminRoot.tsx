import { Outlet } from 'react-router';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export default function AdminRoot() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}