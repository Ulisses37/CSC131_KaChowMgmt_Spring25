import React, { useState } from 'react';
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

    // Sample initial tickets
    const [unassignedTickets, setUnassignedTickets] = useState([
        { id: 3, ticketNumber: '#0003', mechanic: null, status: 'Pending', estimatedTime: '1 hr(s)' },
        { id: 4, ticketNumber: '#0004', mechanic: null, status: 'Pending', estimatedTime: '30 mins' }
    ]);

    const [assignedTickets, setAssignedTickets] = useState([
        { id: 1, ticketNumber: '#0001', mechanic: 'Mechanic 1', status: 'In-Progress', estimatedTime: '3 hr(s)' },
        { id: 2, ticketNumber: '#0002', mechanic: 'Mechanic 3', status: 'In-Progress', estimatedTime: '30 mins' }
    ]);

    // State for dropdown visibility
    const [dropdowns, setDropdowns] = useState({
        mechanic: null,
        status: null
    });

    // Handle mechanic selection
    const handleMechanicSelect = (ticketId, mechanicName) => {
        const ticketIndex = unassignedTickets.findIndex(t => t.id === ticketId);
        if (ticketIndex !== -1) {
            const updatedTicket = {
                ...unassignedTickets[ticketIndex],
                mechanic: mechanicName,
                status: 'Pending' // Reset status when assigned
            };
            
            // Move to assigned tickets
            setAssignedTickets([...assignedTickets, updatedTicket]);
            
            // Remove from unassigned
            setUnassignedTickets(unassignedTickets.filter(t => t.id !== ticketId));
        }
        
        // Close dropdown
        setDropdowns({ ...dropdowns, mechanic: null });
    };

    // Handle status change
    const handleStatusChange = (ticketId, newStatus) => {
        setAssignedTickets(assignedTickets.map(ticket => 
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        ));
        setDropdowns({ ...dropdowns, status: null });
    };

    // Navigate to ticket details
    const handleTicketClick = (ticketNumber) => {
        navigate(`/ticket-details/${ticketNumber.substring(1)}`);
    };

    return (
        <div className="assigning-ticket-page">
            <HeaderBar/>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
            {/* <div className="assigning-ticket-page-banner">
                 <div className="client-name-vin-service-wrapper">
                     <div className="client-name-vin">#0001</div>
                 </div>
                 <div className="background-red"></div>
                <div className="background-black"></div>
                 <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
                 <div className="account-button">
                     {/* <div className="button"></div> */}
                     {/* <div className="account-button-child"></div>
                     <div className="account-button-item"></div>
                     <div className="account-button-inner"></div>
                 </div>
                 <div className="play-arrow-filled-parent" id="frameContainer1">
                     <img className="play-arrow-filled-icon" alt="" src="play_arrow_filled.svg"></img>
                     <div className="text">TICKETS</div>
                 </div>
                    div> */}
            
            <div className="assigning-ticket-adjust">
                {/* UNASSIGNED TICKETS TABLE */}
                <div className="unassigned-tickets">
                    <div className="ticket-parent">
                        <div className="ticket">TICKET #</div>
                        <div className="mechanics">MECHANICS</div>
                        <div className="status">STATUS</div>
                        <div className="estimated-time">
                            <span className="estimated-time-txt-container">
                                <p className="estimated">ESTIMATED</p>
                                <p className="estimated">TIME</p>
                            </span>
                        </div>
                    </div>

                    {unassignedTickets.map(ticket => (
                        <div className="instance-parent" key={ticket.id}>
                            {/* Clickable Ticket Number */}
                            <div 
                                className="client-name-vin-service-container"
                                onClick={() => handleTicketClick(ticket.ticketNumber)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="client-name-vin">{ticket.ticketNumber}</div>
                            </div>

                            {/* Mechanic Dropdown */}
                            <div className="mech-default-button-wrapper">
                                <div 
                                    className="mech-default-button"
                                    onClick={() => setDropdowns({ ...dropdowns, mechanic: ticket.id })}
                                >
                                    <div className="client-name-vin">
                                        {ticket.mechanic || 'Select Mechanic'}
                                    </div>
                                    <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg" />
                                </div>
                                
                                {dropdowns.mechanic === ticket.id && (
                                    <div className="mechanic-dropdown-menu">
                                        {mechanics.map(mechanic => (
                                            <div 
                                                key={mechanic.id}
                                                className="mechanic-option"
                                                style={{ backgroundColor: mechanic.color }}
                                                onClick={() => handleMechanicSelect(ticket.id, mechanic.name)}
                                            >
                                                {mechanic.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Status (disabled for unassigned) */}
                            <div className="status-drop-down-menu">
                                <div className="mech-default-button1 disabled">
                                    <div className="client-name-vin">{ticket.status}</div>
                                </div>
                            </div>

                            {/* Estimated Time */}
                            <div className="time-wrapper">
                                <div className="client-name-vin">{ticket.estimatedTime}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ASSIGNED TICKETS TABLE */}
                <div className="assigned-tickets">
                    <div className="ticket-group">
                        <div className="ticket1">TICKET #</div>
                        <div className="mechanics1">MECHANICS</div>
                        <div className="status1">STATUS</div>
                        <div className="estimated-time1">
                            <span className="estimated-time-txt-container">
                                <p className="estimated">ESTIMATED</p>
                                <p className="estimated">TIME</p>
                            </span>
                        </div>
                    </div>
                    {assignedTickets.map(ticket => (
                        <div className="instance-parent" key={ticket.id}>
                            {/* Clickable Ticket Number */}
                            <div 
                                className="client-name-vin-service-container"
                                onClick={() => handleTicketClick(ticket.ticketNumber)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="client-name-vin">{ticket.ticketNumber}</div>
                            </div>

                            {/* Mechanic with color */}
                            <div className="mech-default-button-frame">
                                <div className="mech-default-button4">
                                    <div className="mechanic-wrapper">
                                        <div 
                                            className="client-name-vin"
                                            style={{ 
                                                color: mechanics.find(m => m.name === ticket.mechanic)?.color || '#000'
                                            }}
                                        >
                                            {ticket.mechanic}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Dropdown */}
                            <div className="status-drop-down-menu">
                                <div 
                                    className="mech-default-button5"
                                    onClick={() => setDropdowns({ ...dropdowns, status: ticket.id })}
                                >
                                    <div className="client-name-vin">{ticket.status}</div>
                                    <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg" />
                                </div>
                                
                                {dropdowns.status === ticket.id && (
                                    <div className="status-dropdown-menu">
                                        {['Pending', 'In-Progress', 'Completed'].map(status => (
                                            <div 
                                                key={status}
                                                className="status-option"
                                                onClick={() => handleStatusChange(ticket.id, status)}
                                            >
                                                {status}
                                            </div>
                                        ))}
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
    );
}

export default AdminTicketViewPage;

// function AdminTicketViewPage() {
//     return (
//         <div className="assigning-ticket-page">
//             <div className="assigning-ticket-page-banner">
//                 <div className="client-name-vin-service-wrapper">
//                     <div className="client-name-vin">#0001</div>
//                 </div>
//                 <div className="background-red"></div>
//                 <div className="background-black"></div>
//                 <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
//                 <div className="account-button">
//                     <div className="button"></div>
//                     <div className="account-button-child"></div>
//                     <div className="account-button-item"></div>
//                     <div className="account-button-inner"></div>
//                 </div>
//                 <div className="play-arrow-filled-parent" id="frameContainer1">
//                     <img className="play-arrow-filled-icon" alt="" src="play_arrow_filled.svg"></img>
//                     <div className="text">TICKETS</div>
//                 </div>
//             </div>
//             <div className="assigning-ticket-adjust">
//                 <div className="unassigned-tickets">
//                     <div className="ticket-parent">
//                         <div className="ticket">TICKET #</div>
//                         <div className="mechanics">MECHANICS</div>
//                         <div className="status">STATUS</div>
//                         <div className="estimated-time">
//                             <span className="estimated-time-txt-container">
//                                 <p className="estimated">ESTIMATED</p>
//                                 <p className="estimated">TIME</p>
//                             </span>
//                         </div>
//                     </div>
//                     <div className="instance-parent">
//                         <div className="client-name-vin-service-container">
//                             <div className="client-name-vin">#0003</div>
//                         </div>
//                         <div className="mech-default-button-wrapper">
//                             <div className="mech-default-button">
//                                 <div className="client-name-vin">Mechanic</div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="status-drop-down-menu">
//                             <div className="mech-default-button1">
//                                 <div className="client-name-vin">Pending</div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="time-wrapper">
//                             <div className="client-name-vin">1 hr(s)</div>
//                         </div>
//                     </div>
//                     <div className="instance-group">
//                         <div className="client-name-vin-service-container">
//                             <div className="client-name-vin">#0004</div>
//                         </div>
//                         <div className="mech-default-button-wrapper">
//                             <div className="mech-default-button">
//                                 <div className="client-name-vin">Mechanic</div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="status-drop-down-menu">
//                             <div className="mech-default-button1">
//                                 <div className="client-name-vin">Pending</div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="time-wrapper">
//                             <div className="client-name-vin">30 mins</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="button1">
//                     <div className="button2">Confirm</div>
//                 </div>
//                 <img className="assigning-ticket-adjust-child" alt="" src="Line 3.svg"></img>
//                 <div className="assigned-tickets">
//                     <div className="ticket-group">
//                         <div className="ticket1">TICKET #</div>
//                         <div className="mechanics1">MECHANICS</div>
//                         <div className="status1">STATUS</div>
//                         <div className="estimated-time1">
//                             <span className="estimated-time-txt-container">
//                                 <p className="estimated">ESTIMATED</p>
//                                 <p className="estimated">TIME</p>
//                             </span>
//                         </div>
//                     </div>
//                     <div className="instance-parent">
//                         <div className="client-name-vin-service-container">
//                             <div className="client-name-vin">#0001</div>
//                         </div>
//                         <div className="mech-default-button-frame">
//                             <div className="mech-default-button4">
//                                 <div className="mechanic-wrapper">
//                                     <div className="client-name-vin">Mechanic 1</div>
//                                 </div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="status-drop-down-menu">
//                             <div className="mech-default-button5">
//                                 <div className="client-name-vin">In-Progress</div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="time-wrapper">
//                             <div className="client-name-vin">3 hr(s)</div>
//                         </div>
//                     </div>
//                     <div className="instance-group">
//                         <div className="client-name-vin-service-container">
//                         <div className="client-name-vin">#0002</div>
//                         </div>
//                         <div className="mech-default-button-frame">
//                             <div className="frame">
//                                 <div className="mechanic-container">
//                                     <div className="client-name-vin">Mechanic 3</div>
//                                 </div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="status-drop-down-menu">
//                             <div className="mech-default-button5">
//                                 <div className="client-name-vin">In-Progress</div>
//                                 <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
//                             </div>
//                         </div>
//                         <div className="time-wrapper">
//                             <div className="client-name-vin">30 mins</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>      
//     );
// }

// export default AdminTicketViewPage