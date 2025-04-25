function InvoicePage(){
    return (
        <div class="container">
            <div class="header-gradient"></div>
            <div class="nav-bar"></div>
            <img class="logo" src="https://placehold.co/367x309" />
            
            <div class="menu-icon" data-property-1="Default">
                <div class="menu-icon-bg"></div>
                <div class="menu-line line-1"></div>
                <div class="menu-line line-2"></div>
                <div class="menu-line line-3"></div>
            </div>
            
            <div class="title-container">
                <div class="arrow-icon">
                    <div class="arrow-shape"></div>
                </div>
                <div class="title-text">INVOICE</div>
            </div>
            
            <div class="ticket-search" data-property-1="Default">
                <div class="ticket-input">
                    <div class="ticket-label">Ticket #</div>
                    <div class="ticket-arrow">
                        <div class="arrow-line"></div>
                    </div>
                </div>
            </div>
            
            <div class="go-button">
                <div class="go-text">Go</div>
            </div>
            
            <div class="client-name-input" data-state="Placeholder text">
                <div class="placeholder-text">Client Name</div>
            </div>
            
            <div class="invoice-details">
                <div class="detail-row">
                    <div class="detail-label">Client Name</div>
                    <div class="detail-value">Bob</div>
                </div>
                
                <div class="detail-row alt-bg">
                    <div class="detail-label">Appointment ID #</div>
                    <div class="detail-value">0001</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Appointment Time</div>
                    <div class="detail-value">January 1, 1990 at 10:00A.M.</div>
                </div>
                
                <div class="detail-row alt-bg">
                    <div class="detail-label">Mechanic</div>
                    <div class="detail-value">Mechanic #1</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Maintenance Done</div>
                    <div class="detail-value">Oil Change</div>
                </div>
                
                <div class="detail-row alt-bg">
                    <div class="detail-label">Maintenance Cost</div>
                    <div class="detail-value">Oil Change : $50</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Total Payment</div>
                    <div class="detail-value">$50</div>
                </div>
            </div>
            
            <div class="action-button send-button" data-has-icon-end="false" data-has-icon-start="false" data-size="Medium" data-state="Default" data-variant="Primary">
                <div class="button-text">Send</div>
            </div>
            
            <div class="action-button edit-button" data-has-icon-end="false" data-has-icon-start="false" data-size="Medium" data-state="Default" data-variant="Primary">
                <div class="button-text">Edit</div>
            </div>
        </div>
    )
}

export default InvoicePage