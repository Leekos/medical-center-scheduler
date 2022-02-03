import React, { useState } from "react";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const Login = (details) => {
    console.log(details);
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("Zalogowano");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Dane się nie zgadzają");
    }
  };
  const Logout = () => {
    setUser({ name: "", email: "" });
  };
  return (
    <div className="App">
      {user.email != "" ? (
        <div className="welcome">
          <h2>
            Welcome,<span>{user.name}</span>
          </h2>
          <Button color="red" text="Wyloguj" onClick={Logout} />
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
