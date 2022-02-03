import { useState } from "react";
import { useActionData, json, redirect } from "remix";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

export const action = async ({ request }: any) => {
  const form = await request.formData();
  console.log("--------form", form);
};

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    console.log("--------values", values);

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    console.log("--------response", response);

    const content = await response.json();
    console.log("--------content", content);
  };

  return (
    <div>
      <h1>Login</h1>

      <div>
        <form method="POST">
          <label>
            <input type="radio" name="loginType" value="login" /> Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>

          <br />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="hello@example.com"
            value={values.email}
            onChange={handleChange("email")}
            sx={{ m: 1, width: "25ch" }}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
            />
          </FormControl>

          <Button
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            // type="submit"
            onClick={onSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
