import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0B0F19]">
      {/* Admin Sidebar fixe à gauche */}
      <AdminSidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Header */}
        <AdminHeader />
        
        {/* Contenu principal scrollable */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
