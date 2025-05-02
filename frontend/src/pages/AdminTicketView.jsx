import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminTicketViewStyles.css';
import HeaderBar from '../components/HeaderBarComponent';
import BackButton from '../components/BackButtonComponent';

const API_BASE_URL = 'http://localhost:5000/api';

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
    const [error, setError] = useState(null);

    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem('employeeToken');
            const response = await fetch(`${API_BASE_URL}/tickets`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch tickets');
            }
            
            const tickets = await response.json();
            return tickets.map(ticket => ({
                ...ticket,
                id: ticket._id,
                mechanic: ticket.mechanicId ? 
                    mechanics.find(m => m._id === ticket.mechanicId)?.name : 
                    'Unassigned'
            }));
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setError(error.message);
            throw error;
        }
    };

    const assignMechanicToTicket = async (ticketId, mechanicId) => {
        try {
            const token = localStorage.getItem('employeeToken');
            const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ mechanicId })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to assign mechanic');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error assigning mechanic:', error);
            setError(error.message);
            throw error;
        }
    };

    const updateTicketStatus = async (ticketId, status) => {
        try {
            const token = localStorage.getItem('employeeToken');
            const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
                method: 'PATCH', // make sure this is PATCH, not PUT
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
    
            const data = await response.json();
            console.log('Status update response:', data); // ← add this
            return data;
        } catch (error) {
            console.error('Error updating ticket status:', error);
            setError(error.message);
            throw error;
        }
    };
    

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const token = localStorage.getItem('employeeToken');
    
                const mechsResponse = await fetch(`${API_BASE_URL}/employees?role=mechanic`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const mechsData = await mechsResponse.json();
                setMechanics(mechsData.data || []);
    
                const tickets = await fetch(`${API_BASE_URL}/tickets`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(res => res.json());
    
                const ticketsWithNames = tickets.map(ticket => ({
                    ...ticket,
                    id: ticket._id,
                    mechanic: ticket.mechanicId ?
                        mechsData.data.find(m => m._id === ticket.mechanicId)?.name :
                        'Unassigned'
                }));
    
                setUnassignedTickets(ticketsWithNames.filter(t => !t.mechanicId));
                setAssignedTickets(ticketsWithNames.filter(t => t.mechanicId));
            } catch (error) {
                console.error('Error loading initial data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        loadInitialData();
    }, []);
    
    const handleMechanicSelect = (ticketId, mechanicId) => {
        const mechanic = mechanics.find(m => m._id === mechanicId);
        if (!mechanic) return;
    
        setStagedAssignments(prev => ({
            ...prev,
            [ticketId]: mechanic._id // store ID, not name
        }));
    
        setDropdowns({ ...dropdowns, mechanic: null });
    };
    

    const handleConfirmAssignments = async () => {
        if (Object.keys(stagedAssignments).length === 0) return;
    
        try {
            setIsLoading(true);
            setError(null);
    
            await Promise.all(
                Object.entries(stagedAssignments).map(async ([ticketId, mechanicId]) => {
                    await assignMechanicToTicket(ticketId, mechanicId);
                })
            );
    
            const updatedTickets = await fetchTickets();
            console.log('Updated tickets:', updatedTickets); // <-- add this
            const unassigned = updatedTickets.filter(t => !t.mechanicId);
            const assigned = updatedTickets.filter(t => t.mechanicId);
    
            setUnassignedTickets(unassigned);
            setAssignedTickets(assigned);
            setStagedAssignments({}); // only clear AFTER reloading
        } catch (error) {
            console.error('Error confirming assignments:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMechanicChange = async (ticketId, newMechanicId) => {
        try {
            setIsLoading(true);
            setError(null);
            await assignMechanicToTicket(ticketId, newMechanicId);
            
            const updatedTickets = await fetchTickets();
            const unassigned = updatedTickets.filter(t => !t.mechanicId);
            const assigned = updatedTickets.filter(t => t.mechanicId);
            
            setUnassignedTickets(unassigned);
            setAssignedTickets(assigned);
        } catch (error) {
            console.error('Error changing mechanic:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
            setDropdowns({ ...dropdowns, mechanic: null });
        }
    };

    const handleStatusChange = async (ticketId, newStatus) => {
        try {
            setIsLoading(true);
            setError(null);
            await updateTicketStatus(ticketId, newStatus);
            
            setAssignedTickets(assignedTickets.map(ticket => 
                ticket.id === ticketId ? { ...ticket, completionStatus: newStatus } : ticket
            ));
            
        } catch (error) {
            console.error('Error updating status:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
            setDropdowns({ ...dropdowns, status: null });
        }
    };

    const toggleDropdown = (type, ticketId) => {
        setDropdowns({
            mechanic: type === 'mechanic' && dropdowns.mechanic !== ticketId ? ticketId : null,
            status: type === 'status' && dropdowns.status !== ticketId ? ticketId : null
        });
    };

    const handleTicketClick = (ticketId) => {
        navigate(`/ticket/${ticketId}`);
    };
    

    const getMechanicColor = (mechanicName) => {
        const mechanic = mechanics.find(m => m.name === mechanicName);
        return mechanic ? mechanic.color : '#a2a2a2';
    };

    return (
        <div className="assigning-ticket-page">
            <BackButton text="DASHBOARD"/>
            <HeaderBar/>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}
            
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
                            </div>
                            
                            {unassignedTickets.length === 0 ? (
                                <div className="no-tickets-message">No unassigned tickets</div>
                            ) : (
                                unassignedTickets.map(ticket => (
                                    <div className="instance-parent" key={ticket.id}>
                                        <div 
                                            className="client-name-vin-service-container" 
                                            onClick={() => handleTicketClick(ticket.ticketId)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="client-name-vin">{ticket.ticketId}</div>
                                        </div>
                                        
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
                                                    {
                                                        stagedAssignments[ticket.id]
                                                            ? mechanics.find(m => m._id === stagedAssignments[ticket.id])?.name || 'Assign Mechanic'
                                                            : mechanics.find(m => m._id === ticket.mechanicId)?.name || 'Assign Mechanic'
                                                    }
                                                </div>

                                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"/>
                                            </div>
                                            
                                            {dropdowns.mechanic === ticket.id && (
                                                <div className="mechanic-dropdown-menu">
                                                    {mechanics.map(mechanic => (
                                                        <div 
                                                            key={mechanic._id}
                                                            className="mechanic-dropdown-item"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMechanicSelect(ticket.id, mechanic._id);
                                                            }}
                                                            style={{ backgroundColor: mechanic.color || '#a2a2a2' }}
                                                        >
                                                            {mechanic.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="status-drop-down-menu">
                                            <div className="mech-default-button1">
                                                <div className="client-name-vin">{ticket.completionStatus}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <div 
                            className="assign-button"
                            onClick={handleConfirmAssignments}
                            style={{ opacity: Object.keys(stagedAssignments).length === 0 ? 0.5 : 1, cursor: Object.keys(stagedAssignments).length === 0 ? 'not-allowed' : 'pointer' }}
                        >
                            <div className="assign-button-text">Confirm</div>
                        </div>
                        
                        <img className="assigning-ticket-adjust-child" alt="" src="Line 3.svg"/>
                        
                        {/* Assigned Tickets Section */}
                        <div className="assigned-tickets">
                            <div className="ticket-group">
                                <div className="ticket1">TICKET #</div>
                                <div className="mechanics1">MECHANICS</div>
                                <div className="status1">STATUS</div>
                            </div>
                            
                            {assignedTickets.map(ticket => (
                                <div className="instance-parent" key={ticket.id}>
                                    <div 
                                        className="client-name-vin-service-container" 
                                        onClick={() => handleTicketClick(ticket.ticketId)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="client-name-vin">{ticket.ticketId}</div>
                                    </div>
                                    
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
                                                        key={mechanic._id}
                                                        className="mechanic-dropdown-item"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMechanicChange(ticket.id, mechanic._id);
                                                        }}
                                                        style={{ backgroundColor: mechanic.color || '#a2a2a2' }}
                                                    >
                                                        {mechanic.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="status-drop-down-menu">
                                        <div 
                                            className="mech-default-button5"
                                            onClick={() => toggleDropdown('status', ticket.id)}
                                        >
                                            <div className="client-name-vin">{ticket.completionStatus}</div>
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
                                                    onClick={() => handleStatusChange(ticket.id, 'Assigned')}
                                                >
                                                    Assigned
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