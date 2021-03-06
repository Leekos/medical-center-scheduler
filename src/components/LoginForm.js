import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  FormHelperText,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const themeOptions = createTheme({
  palette: {
    mode: "dark",
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

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "red" };
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <form onSubmit={submitHandler}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <MedicalServicesIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <Grid container direction="column" spacing={3}>
              {error != "" ? (
                <Grid item>
                  <FormHelperText
                    sx={{ color: "red", fontSize: 14 }}
                    className="error"
                  >
                    {error}
                  </FormHelperText>
                </Grid>
              ) : (
                ""
              )}
              <Grid item>
                <TextField
                  label="Username"
                  template="Enter username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                  value={details.name}
                  id="name"
                  name="name"
                />
              </Grid>
              <Grid item>
                <TextField
                  label="E-mail"
                  template="Enter e-mail"
                  type="e-mail"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                  value={details.email}
                  id="email"
                  name="email"
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  template="Enter password"
                  fullWidth
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                  id="password"
                  name="password"
                />
              </Grid>

              <Grid item>
                <Button
                  startIcon={<LoginIcon />}
                  size="medium"
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
export default LoginForm;
