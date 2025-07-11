import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import logo from '../../../src/assets/images/logo.png';
import {
  FaHome, FaMoneyCheckAlt, FaUserEdit, FaBoxOpen, FaShippingFast,
  FaUserCheck, FaUserClock, FaUserShield, FaMotorcycle,
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Show loading until role is fetched
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  const baseLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard/paymentHistory', label: 'Payment History', icon: <FaMoneyCheckAlt /> },
    { to: '/dashboard/assignRider', label: 'Assign Rider', icon: <FaMotorcycle /> },
    { to: '/dashboard/trackPackage', label: 'Track Package', icon: <FaShippingFast /> },
    { to: '/dashboard/updateProfile', label: 'Update Profile', icon: <FaUserEdit /> },
    { to: '/dashboard/myParcels', label: 'My Parcels', icon: <FaBoxOpen /> },
  ];

  const adminLinks = [
    { to: '/dashboard/activeRider', label: 'Active Rider', icon: <FaUserCheck /> },
    { to: '/dashboard/pendingRider', label: 'Pending Rider', icon: <FaUserClock /> },
    { to: '/dashboard/makeAdmin', label: 'Make Admin', icon: <FaUserShield /> },
  ];

  const navLinks = role === 'admin' ? [...baseLinks, ...adminLinks] : baseLinks;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Toggle Button (Mobile) */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#CAEB66] text-black px-3 py-2 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:static w-64 bg-[#F6FDF4] p-6 border-r transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-300 z-40`}>
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src={logo} alt="logo" className="h-10" />
          <h1 className="text-xl font-bold mt-3 -ml-5">Profast</h1>
        </Link>

        {/* User Info */}
        <div className="text-center mb-6">
          <img
            src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
            className="w-16 h-16 rounded-full mx-auto mb-2 border"
            alt="user"
          />
          <p className="font-semibold">{user?.displayName || 'User'}</p>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          <p className="text-xs italic text-green-600">({role})</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm ${isActive
                  ? 'bg-lime-200'
                  : 'hover:bg-lime-100 text-gray-700'}`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
