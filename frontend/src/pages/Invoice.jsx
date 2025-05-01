import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBarComponent'; 
import BackButton from '../components/BackButtonComponent';
import { EmployeeDropdown } from '../components/DropMenuComp';  
import '../styles/InvoiceStyles.css';

function InvoicePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // API call to fetch unpaid tickets by client name
    const fetchUnpaidTickets = (clientName) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            setError(null);
            
            fetch(`/api/tickets?client=${encodeURIComponent(clientName)}&paid=false`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setIsLoading(false);
                    resolve(data);
                })
                .catch(err => {
                    setIsLoading(false);
                    setError(err.message);
                    reject(err);
                });
        });
    };

    // API call to send invoice
    const sendInvoice = (ticketId) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            
            fetch(`/api/tickets/${ticketId}/send-invoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticketId })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setIsLoading(false);
                    resolve(data);
                })
                .catch(err => {
                    setIsLoading(false);
                    setError(err.message);
                    reject(err);
                });
        });
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === '') return;
        
        try {
            const foundTickets = await fetchUnpaidTickets(searchTerm);
            setTickets(foundTickets);
            setShowDropdown(foundTickets.length > 0);
        } catch (err) {
            console.error('Error fetching tickets:', err);
        }
    };

    const handleTicketSelect = (ticket) => {
        setSelectedTicket(ticket);
        setShowDropdown(false);
    };

    const handleSendInvoice = async () => {
        if (!selectedTicket) return;
        
        try {
            await sendInvoice(selectedTicket.id);
            setShowSuccessPopup(true);
            // Optionally refresh the ticket list
            const updatedTickets = await fetchUnpaidTickets(searchTerm);
            setTickets(updatedTickets);
        } catch (err) {
            console.error('Error sending invoice:', err);
        }
    };

    const handleEditInvoice = () => {
        // Add edit functionality here
        console.log('Edit invoice for ticket:', selectedTicket.id);
    };

    return (
        <div className="invoicing">
            <BackButton text="DASHBOARD"/>
            <EmployeeDropdown/>
            <HeaderBar />
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
            
            <div className="invoice-content">
                <div className="search-section">
                    <div className="car-vin-input">
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <div className="go-container" onClick={handleSearch}>
                        <div className="go-background"></div>
                        <div className="go-text">Go</div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    {showDropdown && (
                        <div className="ticket-dropdown">
                            {tickets.map(ticket => (
                                <div 
                                    key={ticket.id} 
                                    className="ticket-dropdown-item"
                                    onClick={() => handleTicketSelect(ticket)}
                                >
                                    Ticket #{ticket.id} - {ticket.clientName}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedTicket && (
                    <div className="ticket-details">
                        <div className="id-box">
                            <div className="mechanic-id">
                                <div className="ticket">Client Name</div>
                            </div>
                            <div className="id1">
                                <div className="ticket">{selectedTicket.clientName}</div>
                            </div>
                        </div>
                        
                        <div className="year-box">
                            <div className="mechanic-year">
                                <div className="ticket">Appointment ID #</div>
                            </div>
                            <div className="year1">
                                <div className="ticket">{selectedTicket.id}</div>
                            </div>
                        </div>
                        
                        <div className="schedule-box">
                            <div className="working-hours">
                                <div className="ticket">Appointment Time</div>
                            </div>
                            <div className="working-dates">
                                <div className="days-of-the">{selectedTicket.appointmentTime}</div>
                            </div>
                        </div>
                        
                        <div className="profession-box">
                            <div className="mechanic-profession">
                                <div className="ticket">Mechanic</div>
                            </div>
                            <div className="mechanic-skills">
                                <div className="skill-list">{selectedTicket.mechanic}</div>
                            </div>
                        </div>
                        
                        <div className="profession-box1">
                            <div className="mechanic-profession">
                                <div className="profession1">Maintenance Done</div>
                            </div>
                            <div className="mechanic-skills1">
                                <div className="skill-list">{selectedTicket.services}</div>
                            </div>
                        </div>
                        
                        <div className="id-box2">
                            <div className="mechanic-id2">
                                <div className="ticket">Total Payment</div>
                            </div>
                            <div className="id1">
                                <div className="ticket">${selectedTicket.cost}</div>
                            </div>
                        </div>
                        
                        <div className="invoice-actions">
                            <div className="button1" onClick={handleSendInvoice}>
                                <div className="button2">Send</div>
                            </div>
                            <div className="button3" onClick={handleEditInvoice}>
                                <div className="button2">Edit</div>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccessPopup && (
                    <div className="success-popup">
                        <div className="popup-content">
                            <p>Invoice sent successfully!</p>
                            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InvoicePage;