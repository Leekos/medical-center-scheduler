import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import React, { useState } from "react";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import Schedule from "./components/Schedule";
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
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Wrong details");
      setError("E-mail adress or password incorrect");
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
          <Schedule />
          <Button color="red" text="Log out" onClick={Logout} />
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
