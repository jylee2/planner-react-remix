import { useState, useCallback } from "react";
import { useActionData, json, redirect, Link } from "remix";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

import { login, createUserSession } from "~/utils/auth";
import { ActionType } from "~/types/types";

export const action = async ({ request }: ActionType) => {
  const form = await request.formData();

  const email = form.get("email")
  const password = form.get("password")
  if (!email || !password) {
    return {
      message: 'Please enter your email and password.'
    }
  }

  const fields = { email, password }

  const res = await login(fields)

  if (res.success) {
    return createUserSession(res.userUuid, '/')
  }

  return res
};

const Login = () => {
  const actionData = useActionData()

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = useCallback((prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  }, [values])

  const handleClickShowPassword = useCallback(() => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  }, [values])

  const handleMouseDownPassword = useCallback((event: any) => {
    event.preventDefault();
  }, [])

  return (
    <Box>
      <Typography variant="h5" gutterBottom component="div" sx={{ m: 1 }}>
        Login
      </Typography>

      <form method="POST">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          placeholder="hello@example.com"
          value={values.email}
          onChange={handleChange("email")}
          sx={{ m: 1, width: "100%" }}
          name="email"
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>

        {
          actionData?.message &&
          <Typography variant="subtitle1" gutterBottom component="div" sx={{ m: 1 }}>
            {actionData?.message}
          </Typography>
        }
        
        <Button
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          type="submit"
        >
          Login
        </Button>
      </form>


      <Box sx={{ m: 1 }}>
        <Link to="/auth/register" color="secondary">
          Register
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
