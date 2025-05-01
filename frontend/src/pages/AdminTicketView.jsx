import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminTicketViewStyles.css';
import HeaderBar from '../components/HeaderBarComponent';

function AdminTicketViewPage() {
    const navigate = useNavigate();
    
    // Sample data for mechanics with their colors
    const mechanics = [
        { id: 1, name: 'Mechanic 1', color: '#FF5733' },
        { id: 2, name: 'Mechanic 2', color: '#33FF57' },
        { id: 3, name: 'Mechanic 3', color: '#3357FF' }
    ];

    // State for tickets
    const [unassignedTickets, setUnassignedTickets] = useState([]);
    const [assignedTickets, setAssignedTickets] = useState([]);
    
    // State for staged assignments before confirmation
    const [stagedAssignments, setStagedAssignments] = useState({});
    
    // State for dropdown visibility
    const [dropdowns, setDropdowns] = useState({
        mechanic: null,
        status: null
    });

    // Simulate receiving new tickets
    useEffect(() => {
        const initialTickets = [
            { id: 1, ticketNumber: '#0001', serviceType: 'Oil Change', mechanic: null, status: 'Pending', estimatedTime: '30 mins' },
            { id: 2, ticketNumber: '#0002', serviceType: 'Tire Rotation', mechanic: null, status: 'Pending', estimatedTime: '1 hr' },
            { id: 3, ticketNumber: '#0003', serviceType: 'Brake Inspection', mechanic: null, status: 'Pending', estimatedTime: '1 hr 30 mins' },
            { id: 4, ticketNumber: '#0004', serviceType: 'Battery Replacement', mechanic: 'Mechanic 1', status: 'In-Progress', estimatedTime: '2 hrs' }
        ];
        
        const unassigned = initialTickets.filter(t => !t.mechanic);
        const assigned = initialTickets.filter(t => t.mechanic);
        
        setUnassignedTickets(unassigned);
        setAssignedTickets(assigned);
    }, []);

    // Stage mechanic selection (doesn't move ticket yet)
    const handleMechanicSelect = (ticketId, mechanicName) => {
        setStagedAssignments({
            ...stagedAssignments,
            [ticketId]: mechanicName
        });
        setDropdowns({ ...dropdowns, mechanic: null });
    };

    // Handle status change (only for assigned tickets)
    const handleStatusChange = (ticketId, newStatus) => {
        setAssignedTickets(assignedTickets.map(ticket => 
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        ));
        setDropdowns({ ...dropdowns, status: null });
    };

    // Finalize staged assignments when Confirm is clicked
    const handleConfirmAssignments = () => {
        if (unassignedTickets.length === 0) return;
        
        // Only process tickets that have staged assignments
        const ticketsToAssign = unassignedTickets.filter(ticket => 
            stagedAssignments[ticket.id]
        );
    
        const updatedUnassigned = unassignedTickets.filter(ticket => 
            !stagedAssignments[ticket.id]
        );
    
        const newlyAssigned = ticketsToAssign.map(ticket => ({
            ...ticket,
            mechanic: stagedAssignments[ticket.id],
            status: 'Pending'
        }));
    
        setAssignedTickets([...assignedTickets, ...newlyAssigned]);
        setUnassignedTickets(updatedUnassigned);
        setStagedAssignments({});
    };

    const handleMechanicChange = (ticketId, newMechanic) => {
        setAssignedTickets(assignedTickets.map(ticket => 
            ticket.id === ticketId 
                ? { ...ticket, mechanic: newMechanic } 
                : ticket
        ));
        setDropdowns({ ...dropdowns, mechanic: null });
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
            <HeaderBar/>
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
                                                        handleMechanicSelect(ticket.id, mechanic.name);
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
                                                        handleMechanicChange(ticket.id, mechanic.name);
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
        </div>
    );
}

export default AdminTicketViewPage;