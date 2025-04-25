function AdminMechAccountViewPage(){
    return (
        <div class="container">
            <div class="header-gradient"></div>
            <div class="title-container">
                <div class="arrow-icon">
                    <div class="arrow-shape"></div>
                </div>
                <div class="title-text">MECHANIC 2</div>
            </div>
            <div class="nav-bar"></div>
            <img class="logo" src="https://placehold.co/367x309" />
            
            <div class="data-table">
                <div class="table-row">
                    <div class="label-cell">ID #</div>
                    <div class="value-cell">20000</div>
                </div>
                <div class="table-row">
                    <div class="label-cell">Year</div>
                    <div class="value-cell alt-bg">03/04/1900</div>
                </div>
                <div class="table-row tall-row">
                    <div class="label-cell">Schedule</div>
                    <div class="value-cell">
                        <div class="schedule-text">Monday, Wednesday, Friday : 8:00 A.M. - 4:00 P.M.<br/>Tuesday and Thursday : 9:00 A.M. - 3:00 P.M.</div>
                    </div>
                </div>
                <div class="table-row">
                    <div class="label-cell">Specialist</div>
                    <div class="value-cell alt-bg">
                        <div class="specialist-text">Oil change<br/>Brake Repairs<br/>Engine Check</div>
                    </div>
                </div>
                <div class="table-row">
                    <div class="label-cell">History</div>
                    <div class="value-cell">
                        <div class="history-text">Ferrari <br/>Fiat<br/>Ford</div>
                    </div>
                </div>
            </div>
            
            <div class="menu-icon" data-property-1="Default">
                <div class="menu-icon-bg"></div>
                <div class="menu-line line-1"></div>
                <div class="menu-line line-2"></div>
                <div class="menu-line line-3"></div>
            </div>
            
            <div class="edit-button" data-has-icon-end="false" data-has-icon-start="false" data-size="Medium" data-state="Default" data-variant="Primary">
                <div class="button-text">Edit</div>
            </div>
        </div>
    )
}

export default AdminMechAccountViewPage