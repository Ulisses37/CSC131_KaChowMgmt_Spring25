function TicketHistoryPage(){
    return (
        <div className="container">
        <div className="header-container">
          <div className="ticket-box yellow-box">
            <div className="ticket-number">#0001</div>
          </div>
          <div className="header-gradient"></div>
          <div className="header-bar"></div>
          <img className="header-image" src="https://placehold.co/367x309" alt="placeholder" />
          <div className="menu-button">
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
          </div>
          <div className="ticket-history-button">
            <div className="arrow-icon">
              <div className="arrow-body"></div>
            </div>
            <div className="button-text">TICKET HISTORY</div>
          </div>
        </div>
  
        <div className="history-body">
          <div className="history-header">
            <div className="header-text" style={{ left: '108.5px' }}>Ticket #</div>
            <div className="header-text" style={{ left: '784.5px' }}>Job Status</div>
            <div className="header-text" style={{ left: '1097.5px' }}>Time Spent</div>
            <div className="header-text" style={{ left: '1454.5px' }}>Customer<br />Feedback</div>
            <div className="header-text" style={{ left: '397.5px' }}>Appointment<br />Data</div>
          </div>
  
          <div className="history-row">
            <div className="data-box">#0001</div>
            <div className="data-box">03/07/25</div>
            <div className="data-box">Complete</div>
            <div className="data-box">3 hours</div>
            <div className="data-box">Needs Met: Yes<br />Customer Satisfaction: 4</div>
          </div>
          <div className="history-row">
            <div className="data-box">#0025</div>
            <div className="data-box">03/07/25</div>
            <div className="data-box">Complete</div>
            <div className="data-box">45 minutes</div>
            <div className="data-box">Needs Met: No<br />Customer Satisfaction: 2</div>
          </div>
        </div>
      </div>
    )
}