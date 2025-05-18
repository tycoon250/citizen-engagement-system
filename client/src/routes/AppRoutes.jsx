import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CitizenDashboard from '../pages/dashboards/CitizenDashboard';
import AgencyDashboard from '../pages/dashboards/AgencyDashboard';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import SubmitComplaint from '../pages/dashboards/SubmitComplaint';
import MyComplaints from '../pages/dashboards/ComplaintList';
import RespondToComplaint from '../pages/dashboards/RespondToComplaint';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard/citizen"
        element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <CitizenDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/complaint/new"
        element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <SubmitComplaint />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard/citizen/complaints"
        element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <MyComplaints />
          </ProtectedRoute>
        }
      /> 
      <Route
      path="/dashboard/agency/respond/:id"
      element={
        <ProtectedRoute allowedRoles={['agency']}>
          <RespondToComplaint />
        </ProtectedRoute>
        }
        />
      <Route
        path="/dashboard/agency"
        element={
          <ProtectedRoute allowedRoles={['agency']}>
            <AgencyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
