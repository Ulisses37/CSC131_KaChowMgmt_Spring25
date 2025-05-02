import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminTicketViewStyles.css';
import HeaderBar from '../components/HeaderBarComponent';
import BackButton from '../components/BackButtonComponent'; 

function AdminTicketViewPage() {
    const navigate = useNavigate();
    
    const [mechanics, setMechanics] = useState([]);
    const [unassignedTickets, setUnassignedTickets] = useState([]);
    const [assignedTickets, setAssignedTickets] = useState([]);
    const [stagedAssignments, setStagedAssignments] = useState({});
    const [dropdowns, setDropdowns] = useState({
        mechanic: null,
        status: null
    });
    const [isLoading, setIsLoading] = useState(true);

    const assignMechanicToTicket = async (ticketId, mechanicId) => {
        try {
          // Get the authentication token from localStorage
          const token = localStorage.getItem('token');
          
          if (!token) {
            throw new Error('Authentication required. Please log in.');
          }
          
          // Make the PATCH request to assign the mechanic
          const response = await fetch(`http://localhost:5000/api/tickets/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`  // Include auth token for admin authentication
            },
            body: JSON.stringify({ mechanicId })  // Send the mechanicId in the request body
          });
          
          // Check if the response was successful
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to assign mechanic');
          }
          
          // Parse and return the response data
          const data = await response.json();
          return data;
          
        } catch (error) {
          console.error('Error assigning mechanic:', error);
          throw error;  // Re-throw so the calling code can handle it
        }
    };

    const updateTicketStatus = async (ticketId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating ticket status:', error);
        throw error;
    }
    };

    const fetchTickets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tickets`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
    };

    // Fetch initial data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                // Fetch mechanics and tickets in parallel
                const [mechsResponse, ticketsResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/mechanics`).then(res => res.json()),
                    fetchTickets()
                ]);
                
                setMechanics(mechsResponse);
                
                const unassigned = ticketsResponse.filter(t => !t.mechanicId);
                const assigned = ticketsResponse.filter(t => t.mechanicId);
                
                setUnassignedTickets(unassigned);
                setAssignedTickets(assigned);
            } catch (error) {
                console.error('Error loading initial data:', error);
                // Optionally show error to user
            } finally {
                setIsLoading(false);
            }
        };
        
        loadInitialData();
    }, []);

    // Update handleMechanicSelect to use API
    const handleMechanicSelect = async (ticketId, mechanicId) => {
        setStagedAssignments({
            ...stagedAssignments,
            [ticketId]: mechanicId
        });
        setDropdowns({ ...dropdowns, mechanic: null });
    };

    // Update handleConfirmAssignments to use API
    const handleConfirmAssignments = async () => {
        if (unassignedTickets.length === 0) return;
        
        try {
            setIsLoading(true);
            const assignments = Object.entries(stagedAssignments)
                .filter(([ticketId]) => unassignedTickets.some(t => t.id === parseInt(ticketId)));
            
            // Process all assignments in parallel
            await Promise.all(
                assignments.map(async ([ticketId, mechanicId]) => {
                    await assignMechanicToTicket(ticketId, mechanicId);
                })
            );
            
            // Refresh the ticket list
            const updatedTickets = await fetchTickets();
            const unassigned = updatedTickets.filter(t => !t.mechanicId);
            const assigned = updatedTickets.filter(t => t.mechanicId);
            
            setUnassignedTickets(unassigned);
            setAssignedTickets(assigned);
            setStagedAssignments({});
        } catch (error) {
            console.error('Error confirming assignments:', error);
            // Optionally show error to user
        } finally {
            setIsLoading(false);
        }
    };

    // Update handleMechanicChange to use API
    const handleMechanicChange = async (ticketId, newMechanicId) => {
        try {
            setIsLoading(true);
            await assignMechanicToTicket(ticketId, newMechanicId);
            
            // Update local state optimistically
            setAssignedTickets(assignedTickets.map(ticket => 
                ticket.id === ticketId 
                    ? { ...ticket, mechanicId: newMechanicId } 
                    : ticket
            ));
        } catch (error) {
            console.error('Error changing mechanic:', error);
            // Optionally show error to user
        } finally {
            setIsLoading(false);
            setDropdowns({ ...dropdowns, mechanic: null });
        }
    };

    // Update handleStatusChange to use API
    const handleStatusChange = async (ticketId, newStatus) => {
        try {
            setIsLoading(true);
            await updateTicketStatus(ticketId, newStatus);
            
            // Update local state optimistically
            setAssignedTickets(assignedTickets.map(ticket => 
                ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            // Optionally show error to user
        } finally {
            setIsLoading(false);
            setDropdowns({ ...dropdowns, status: null });
        }
    };

    // Toggle dropdown visibility
    const toggleDropdown = (type, ticketId) => {
        // Close other dropdowns when opening a new one
        setDropdowns({
            mechanic: type === 'mechanic' && dropdowns.mechanic !== ticketId ? ticketId : null,
            status: type === 'status' && dropdowns.status !== ticketId ? ticketId : null
        });
    };

    // Navigate to ticket details
    const handleTicketClick = (ticketNumber) => {
        navigate(`/ticket-details/${ticketNumber.substring(1)}`);
    };

    // Get mechanic color
    const getMechanicColor = (mechanicName) => {
        const mechanic = mechanics.find(m => m.name === mechanicName);
        return mechanic ? mechanic.color : '#a2a2a2';
    };

    return (
        <div className="assigning-ticket-page">
            <BackButton text="DASHBOARD"/>
            <HeaderBar/>
            {isLoading ? (
                <div className="loading-indicator">
                    Loading...
                </div>
            ) : (
                <div className="ticket-content-container">
                    <div className="assigning-ticket-adjust">
                        {/* Unassigned Tickets Section */}
                        <div className="unassigned-tickets">
                            <div className="ticket-parent">
                                <div className="ticket">TICKET #</div>
                                <div className="mechanics">MECHANICS</div>
                                <div className="status">STATUS</div>
                                <div className="estimated-time">
                                    <span className="estimated-time-txt-container">
                                        <div className="estimated">ESTIMATED</div>
                                        <div className="estimated">TIME</div>
                                    </span>
                                </div>
                            </div>
                            
                            {unassignedTickets.length === 0 ? (
                                <div className="no-tickets-message">No unassigned tickets</div>
                            ) : (
                                unassignedTickets.map(ticket => (
                                    <div className="instance-parent" key={ticket.id}>
                                        {/* Ticket Number */}
                                    <div 
                                        className="client-name-vin-service-container" 
                                        onClick={() => handleTicketClick(ticket.ticketNumber)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="client-name-vin">{ticket.ticketNumber}</div>
                                    </div>
                                    
                                    {/* Mechanics Dropdown */}
                                    <div className="mech-default-button-frame">
                                        <div 
                                            className="mech-default-button4" 
                                            onClick={() => toggleDropdown('mechanic', ticket.id)}
                                            style={{
                                                backgroundColor: stagedAssignments[ticket.id] 
                                                    ? getMechanicColor(stagedAssignments[ticket.id])
                                                    : '#a2a2a2'
                                            }}
                                        >
                                            <div className="client-name-vin">
                                                {stagedAssignments[ticket.id] || 'Assign Mechanic'}
                                            </div>
                                            <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"/>
                                        </div>
                                        
                                        {dropdowns.mechanic === ticket.id && (
                                            <div className="mechanic-dropdown-menu">
                                                {mechanics.map(mechanic => (
                                                    <div 
                                                        key={mechanic.id}
                                                        className="mechanic-dropdown-item"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMechanicSelect(ticket.id, mechanic.id);
                                                        }}
                                                        style={{ backgroundColor: mechanic.color }}
                                                    >
                                                        {mechanic.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Status */}
                                    <div className="status-drop-down-menu">
                                        <div className="mech-default-button1">
                                            <div className="client-name-vin">{ticket.status}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Estimated Time */}
                                    <div className="time-wrapper">
                                        <div className="client-name-vin">{ticket.estimatedTime}</div>
                                    </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <div 
                            className={`button1 ${unassignedTickets.length === 0 ? 'disabled' : ''}`} 
                            onClick={unassignedTickets.length > 0 ? handleConfirmAssignments : undefined}
                        >
                            <div className="button2">Confirm</div>
                        </div>
                        <img className="assigning-ticket-adjust-child" alt="" src="Line 3.svg"/>
                        
                        {/* Assigned Tickets Section */}
                        <div className="assigned-tickets">
                            <div className="ticket-group">
                                <div className="ticket1">TICKET #</div>
                                <div className="mechanics1">MECHANICS</div>
                                <div className="status1">STATUS</div>
                                <div className="estimated-time">
                                    <span className="estimated-time-txt-container">
                                        <div className="estimated">ESTIMATED</div>
                                        <div className="estimated">TIME</div>
                                    </span>
                                </div>
                            </div>
                            
                            {assignedTickets.map(ticket => (
                                <div className="instance-parent" key={ticket.id}>
                                    {/* Ticket Number - Clickable */}
                                    <div 
                                        className="client-name-vin-service-container" 
                                        onClick={() => handleTicketClick(ticket.ticketNumber)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="client-name-vin">{ticket.ticketNumber}</div>
                                    </div>
                                    
                                    {/* Editable Mechanic Dropdown */}
                                    <div className="mech-default-button-frame">
                                        <div 
                                            className="mech-default-button4"
                                            onClick={() => toggleDropdown('mechanic', ticket.id)}
                                            style={{ backgroundColor: getMechanicColor(ticket.mechanic) }}
                                        >
                                            <div className="mechanic-wrapper">
                                                <div className="client-name-vin">{ticket.mechanic}</div>
                                            </div>
                                            <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"/>
                                        </div>
                                        
                                        {dropdowns.mechanic === ticket.id && (
                                            <div className="mechanic-dropdown-menu">
                                                {mechanics.map(mechanic => (
                                                    <div 
                                                        key={mechanic.id}
                                                        className="mechanic-dropdown-item"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMechanicSelect(ticket.id, mechanic.id);
                                                        }}
                                                        style={{ backgroundColor: mechanic.color }}
                                                    >
                                                        {mechanic.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Status Dropdown */}
                                    <div className="status-drop-down-menu">
                                        <div 
                                            className="mech-default-button5"
                                            onClick={() => toggleDropdown('status', ticket.id)}
                                        >
                                            <div className="client-name-vin">{ticket.status}</div>
                                            <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"/>
                                        </div>
                                        
                                        {dropdowns.status === ticket.id && (
                                            <div className="status-dropdown-menu">
                                                <div 
                                                    className="status-dropdown-item"
                                                    onClick={() => handleStatusChange(ticket.id, 'Pending')}
                                                >
                                                    Pending
                                                </div>
                                                <div 
                                                    className="status-dropdown-item"
                                                    onClick={() => handleStatusChange(ticket.id, 'In-Progress')}
                                                >
                                                    In-Progress
                                                </div>
                                                <div 
                                                    className="status-dropdown-item"
                                                    onClick={() => handleStatusChange(ticket.id, 'Completed')}
                                                >
                                                    Completed
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Estimated Time */}
                                    <div className="time-wrapper">
                                        <div className="client-name-vin">{ticket.estimatedTime}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminTicketViewPage;