import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css"; // Importing CSS styles

const CustomerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear previous error

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5173/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page-0">
      <div className="login-page-0-child"></div>
      <div className="login-page-0-item"></div>

      {/* 🔹 Logo (Click to go to Home Page) */}
      <img
        className="srs-csc-131-1-icon"
        alt="Company Logo"
        src="/SRS CSC 131.png"
        onClick={() => navigate("/")}
      />

      <div className="login-page-0-inner"></div>
      <div className="log-in">Log In</div>
      <div className="no-account">No account?</div>

      {/* 🔹 Create Account Link */}
      <div className="create-one" onClick={() => navigate("/create-account")}>
        CREATE ONE
      </div>

      <div className="line-div"></div>

      {/* 🔹 Input Fields */}
      <div className="key-field-wrapper">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="key-field"
        />
      </div>

      <div className="password-input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="key-field"
        />
      </div>

      {/* 🔹 Error Message */}
      {error && <p className="error-msg">{error}</p>}

      {/* 🔹 Login Button */}
      <div className="button" onClick={handleLogin}>
        <div className="button1">LOG IN</div>
      </div>

      {/* 🔹 Employee Login Navigation */}
      <div className="employee-login" onClick={() => navigate("/employee-verification")}>
        Employee Login
      </div>

      {/* 🔹 Forgot Password Navigation */}
      <div className="forgot-password" onClick={() => navigate("/forgot-password")}>
        FORGOT PASSWORD
      </div>
    </div>
  );
};

export default CustomerLoginPage;
