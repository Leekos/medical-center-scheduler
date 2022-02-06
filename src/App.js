import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Schedule from "./components/Schedule";
import {
  ThemeProvider,
  createTheme,
  Grid,
  Button,
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import { Box, palette } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
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
  typography: {
    fontFamily: "Poppins",
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
      {user.email != "" ? (
        <>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Typography sx={{ flexGrow: 1 }}>Welcome, {user.name}</Typography>
              <Button startIcon={<LogoutIcon />} color="error" onClick={Logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Schedule />

          {/* Welcome,<span>{user.name}</span> */}
        </>
      ) : (
        // <Button
        //   startIcon={<Logout />}
        //   size="medium"
        //   variant="contained"
        //   color="error"
        //   variant="contained"
        //   onClick={Logout}
        // >
        //   Log Out
        // </Button>

        <LoginForm Login={Login} error={error} />
      )}
    </ThemeProvider>
  );
}

export default App;
