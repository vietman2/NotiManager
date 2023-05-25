import { Stack, Grid, InputLabel, TextField } from "@mui/material";
import "./email.css";
import { GoogleButton, IAuthorizationOptions } from "react-google-oauth2";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/slices/auth";

export const EmailForm = () => {
  const auth = useSelector(authSelector);

  const options: IAuthorizationOptions = {
    clientId:
      "857740213815-e07aikaf41mia75u98l19i5d1fng9cd2.apps.googleusercontent.com",
    redirectUri: "https://noti-manager.site/oauth-callback",
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
    includeGrantedScopes: true,
    accessType: "offline",
  };

  const googleButton = (
    <>
      <GoogleButton
        className="google-btn"
        placeholder="demo/search.png" // Optional
        options={options}
        apiUrl="https://noti-manager.site:8000/"
        defaultStyle={false} // Optional
      >
        Register Email
      </GoogleButton>
    </>
  );

  const form = (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {/* <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      > */}
        <Stack spacing={2} sx={{ width: "50%" }}>
          <Grid container justifyContent={"center"}>
            <h1>User Information</h1>
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label">Email</InputLabel>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              inputProps={{ "data-testid": "email-name-input" }}
              value={auth.user?.email}
              disabled={true}
              required
            />
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label">Username</InputLabel>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              value={auth.user?.username}
              rows={1}
              disabled={true}
              required
            />
          </Grid>
          <Grid item>
            <InputLabel id="demo-simple-select-label" margin="dense">
              Gmail Access
            </InputLabel>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              inputProps={{ "data-testid": "email-message-input" }}
              value={auth.user?.oauth?.toString()}
              disabled={true}
              required
            />
          </Grid>
          <Grid container justifyContent="flex-end">
            <div>
              <link
                rel="stylesheet"
                type="text/css"
                href="//fonts.googleapis.com/css?family=Open+Sans"
              />
              <div className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    alt="Google sign-in"
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                {googleButton}
              </div>
            </div>
          </Grid>
        </Stack>
        {/* </Box> */}
      </Grid>
    </>
  );

  return form;
};
