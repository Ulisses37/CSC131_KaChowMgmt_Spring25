import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderBar from '../components/HeaderBarComponent';

const ViewAppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets/${id}`);
        if (!response.ok) throw new Error('Failed to fetch appointment details');

        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetail();
  }, [id]);

  if (loading) {
    return <div>Loading appointment details...</div>;
  }

  if (!appointment) {
    return <div>Appointment not found.</div>;
  }

  const appointmentDate = new Date(appointment.appDate);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointmentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      <HeaderBar />
      <div className="appointment-detail-container">
        <h1>Appointment Details</h1>
        <div className="appointment-detail">
          <p><strong>Ticket #:</strong> {appointment.ticketId}</p>
          <p><strong>Repair Type:</strong> {appointment.ticketType}</p>
          <p><strong>Make/Model:</strong> {appointment.makeModel || 'N/A'}</p>
          <p><strong>VIN #:</strong> {appointment.vechVIN}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Time:</strong> {formattedTime}</p>
          <p><strong>Employee Working:</strong> {appointment.mechanicId?.name || 'Unassigned'}</p>
          <p><strong>Status:</strong> {appointment.completionStatus}</p>
          <p><strong>Progress:</strong> {appointment.progress || 'In Progress'}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentDetail;