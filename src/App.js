import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import React, { useState } from "react";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import Schedule from "./components/Schedule";
import { ThemeProvider, createTheme, Grid } from "@mui/material";
import { Box, palette } from "@mui/system";
const themeOptions = createTheme({
  palette: {
    mode: "dark",
    bgcolor: {
      main: "#222222",
    },
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#8e24aa",
    },
    warning: {
      main: "#f50057",
    },
  },
});

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
    <ThemeProvider theme={themeOptions}>
      <Box className="App" sx={{ bgcolor: "text.disabled" }}>
        {user.email != "" ? (
          <div className="welcome">
            <h2>
              Welcome,<span>{user.name}</span>
            </h2>
            <div className="scheduleHolder">
              <Schedule />
            </div>
            <Button color="red" text="Log out" onClick={Logout} />
          </div>
        ) : (
          <LoginForm Login={Login} error={error} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
