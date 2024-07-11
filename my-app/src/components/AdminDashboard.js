import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, deleteAppointment } from '../services/api';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      await deleteAppointment(id);
      fetchAppointments();
    }
  };

  return (
    <div className="container">
      <h2>List of Appointments</h2>
      <Link to="/add-appointment" className="btn btn-primary mb-3">Add Appointment</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Disease</th>
            <th>Appointment Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.firstName}</td>
              <td>{appointment.lastName}</td>
              <td>{appointment.mobileNumber}</td>
              <td>{appointment.birthDate}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.disease}</td>
              <td>{appointment.appointmentDateTime}</td>
              <td>
                <Link to={`/edit-appointment/${appointment.id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(appointment.id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
