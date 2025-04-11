function AdminTicketViewPage() {
    return (
        <div className="assigning-ticket-page">
            <div className="assigning-ticket-page-banner">
                <div className="client-name-vin-service-wrapper">
                    <div className="client-name-vin">#0001</div>
                </div>
                <div className="background-red"></div>
                <div className="background-black"></div>
                <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
                <div className="account-button">
                    <div className="button"></div>
                    <div className="account-button-child"></div>
                    <div className="account-button-item"></div>
                    <div className="account-button-inner"></div>
                </div>
                <div className="play-arrow-filled-parent" id="frameContainer1">
                    <img className="play-arrow-filled-icon" alt="" src="play_arrow_filled.svg"></img>
                    <div className="text">TICKETS</div>
                </div>
            </div>
            <div className="assigning-ticket-adjust">
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
                    <div className="instance-parent">
                        <div className="client-name-vin-service-container">
                            <div className="client-name-vin">#0003</div>
                        </div>
                        <div className="mech-default-button-wrapper">
                            <div className="mech-default-button">
                                <div className="client-name-vin">Mechanic</div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="status-drop-down-menu">
                            <div className="mech-default-button1">
                                <div className="client-name-vin">Pending</div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="time-wrapper">
                            <div className="client-name-vin">1 hr(s)</div>
                        </div>
                    </div>
                    <div className="instance-group">
                        <div className="client-name-vin-service-container">
                            <div className="client-name-vin">#0004</div>
                        </div>
                        <div className="mech-default-button-wrapper">
                            <div className="mech-default-button">
                                <div className="client-name-vin">Mechanic</div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="status-drop-down-menu">
                            <div className="mech-default-button1">
                                <div className="client-name-vin">Pending</div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="time-wrapper">
                            <div className="client-name-vin">30 mins</div>
                        </div>
                    </div>
                </div>
                <div className="button1">
                    <div className="button2">Confirm</div>
                </div>
                <img className="assigning-ticket-adjust-child" alt="" src="Line 3.svg"></img>
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
                    <div className="instance-parent">
                        <div className="client-name-vin-service-container">
                            <div className="client-name-vin">#0001</div>
                        </div>
                        <div className="mech-default-button-frame">
                            <div className="mech-default-button4">
                                <div className="mechanic-wrapper">
                                    <div className="client-name-vin">Mechanic 1</div>
                                </div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="status-drop-down-menu">
                            <div className="mech-default-button5">
                                <div className="client-name-vin">In-Progress</div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="time-wrapper">
                            <div className="client-name-vin">3 hr(s)</div>
                        </div>
                    </div>
                    <div className="instance-group">
                        <div className="client-name-vin-service-container">
                        <div className="client-name-vin">#0002</div>
                        </div>
                        <div className="mech-default-button-frame">
                            <div className="frame">
                                <div className="mechanic-container">
                                    <div className="client-name-vin">Mechanic 3</div>
                                </div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="status-drop-down-menu">
                            <div className="mech-default-button5">
                                <div className="client-name-vin">In-Progress</div>
                                <img className="arrow-drop-down-icon" alt="" src="arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div className="time-wrapper">
                            <div className="client-name-vin">30 mins</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    );
}

export default AdminTicketViewPage