import React, { useState } from "react";
import classes from "./Login.module.css";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { login } from "../../store/redux/auth-reducer";
import { useDispatch } from "react-redux";
import { Link as LinkRRD } from "react-router-dom";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import Link from "@material-ui/core/Link";

export const Login = React.memo(function () {
  // const selector = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const { handleSubmit, errors: fieldsErrors, control } = useForm();

  const [togglePassword, setTogglePassword] = useState(true);

  const onSubmit = (formData: { email: string; password: string }) => {
    dispatch(login(formData.email, formData.password));
  };

  // if (selector.auth.isAuth) {
  //   return <Redirect to={"/profile"} />;
  // }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined">
            <Controller
              name="email"
              as={
                <TextField
                  margin="normal"
                  id="email"
                  helperText={
                    fieldsErrors.email ? fieldsErrors.email.message : ""
                  }
                  variant="outlined"
                  label="Email"
                  error={!!fieldsErrors.email}
                  autoComplete="email"
                  name="email"
                  fullWidth
                  autoFocus
                  // style={{ pointerEvents: "auto" }}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              }}
            />
            <Controller
              name="password"
              as={
                <TextField
                  id="password"
                  margin="normal"
                  fullWidth
                  type={togglePassword ? "password" : "text"}
                  helperText={
                    fieldsErrors.password ? fieldsErrors.password.message : ""
                  }
                  variant="outlined"
                  label="Password"
                  name="password"
                  error={!!fieldsErrors.password}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setTogglePassword(!togglePassword)}
                          edge="end"
                        >
                          {togglePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: "Required",
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <ForgotPassword />
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                <LinkRRD to="/register">Don't have an account? Sign Up</LinkRRD>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});
