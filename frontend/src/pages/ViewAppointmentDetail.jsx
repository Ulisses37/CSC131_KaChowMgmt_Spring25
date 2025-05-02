import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderBar from '../components/HeaderBarComponent';

const ViewAppointmentDetail = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching appointment details from an API or local storage
    const fetchAppointmentDetail = async () => {
      try {
        // Mock data for testing
        const mockData = [
          {
            id: 1,
            ticketNumber: 'TCK12345',
            title: 'Engine Repair',
            date: '2025-05-10T10:00:00.000Z',
            makeModel: 'Toyota Corolla',
            vin: '1HGCM82633A123456',
            employee: 'John Doe',
            progress: '50%', // Progress of the ticket
          },
          {
            id: 2,
            ticketNumber: 'TCK12346',
            title: 'Oil Change',
            date: '2025-04-20T14:00:00.000Z',
            makeModel: 'Honda Civic',
            vin: '2HGCM82633A654321',
            employee: 'Jane Smith',
            progress: 'Completed', // Progress of the ticket
          },
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find the appointment by ID
        const appointmentDetail = mockData.find((appt) => appt.id === parseInt(id));
        setAppointment(appointmentDetail);
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

  const appointmentDate = new Date(appointment.date);
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
          <p>
            <strong>Ticket #:</strong> {appointment.ticketNumber}
          </p>
          <p>
            <strong>Repair Type:</strong> {appointment.title}
          </p>
          <p>
            <strong>Make/Model:</strong> {appointment.makeModel}
          </p>
          <p>
            <strong>VIN #:</strong> {appointment.vin}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Time:</strong> {formattedTime}
          </p>
          <p>
            <strong>Employee Working:</strong> {appointment.employee}
          </p>
          <p>
            <strong>Progress:</strong> {appointment.progress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentDetail;