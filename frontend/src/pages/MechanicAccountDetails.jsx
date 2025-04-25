function MechanicAccountDetailsPage(){
    return (
        <div class="container">
            <div class="header-gradient"></div>
            <div class="nav-bar"></div>
            <img class="logo" src="https://placehold.co/367x309" />
            
            <div class="account-title">
                <div class="arrow-icon">
                    <div class="arrow-shape"></div>
                </div>
                <div class="title-text">Account</div>
            </div>
            
            <div class="menu-icon" data-property-1="Default">
                <div class="menu-icon-bg"></div>
                <div class="menu-line line-1"></div>
                <div class="menu-line line-2"></div>
                <div class="menu-line line-3"></div>
            </div>
            
            <div class="account-details">
                <div class="detail-row">
                    <div class="detail-label">Name</div>
                    <div class="detail-value">Mechanic 3</div>
                </div>
                
                <div class="detail-row alt-bg">
                    <div class="detail-label">Employee ID</div>
                    <div class="detail-value">000003</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Schedule</div>
                    <div class="detail-value">
                        Monday, Wednesday, Friday        8am - 5pm<br/>
                        Tuesday, Thursday                         9am-  5pm
                    </div>
                </div>
                
                <div class="detail-row alt-bg">
                    <div class="detail-label">Specialties</div>
                    <div class="detail-value">Brakes, Transmissions</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Contact Info</div>
                    <div class="detail-value">
                        123 Apple Street, Somewhere City, CA<br/>
                        (123) 123-5678
                    </div>
                </div>
                
                <div class="payment-info-row">
                    <div class="detail-label">Payment Info</div>
                    <div class="payment-details">
                        <div class="payment-line">
                            <span class="payment-label">Bank Acct#</span>
                            <span class="payment-value">****************************</span>
                        </div>
                        <div class="payment-line">
                            <span class="payment-label">Bank Rout#</span>
                            <span class="payment-value">1234567890</span>
                        </div>
                    </div>
                    <button class="reveal-button" data-property-1="Default">
                        Reveal Info
                    </button>
                </div>
                
                <div class="action-buttons">
                    <button class="edit-button">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MechanicAccountDetailsPage