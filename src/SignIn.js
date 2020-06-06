import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Typical from "react-typical";
import styled from "styled-components";

const Component = styled.div``;

const Typ = styled.div`
  position: absolute;
  top: 12%;
  left: 50%;
  font-size: 30px;
  font-family: roboto;
  transform: translate(-50%, -50%);

  color: #e9eeeb;
`;

const Mainsection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e9eeeb;

  .login-box {
    width: 440px;
    @media (max-width: 600px) {
      width: 340px;
    }
  }

  .login-box h1 {
    font-size: 40px;
    border-bottom: 6px solid #e9eeeb;
    margin-bottom: 50px;
    padding: 13px 0;
  }

  .textbox {
    display: flex;
    width: 100%;
    overflow: hidden;
    font-size: 20px;
    padding: 8px 0;
    margin: 8px 0;
    border-bottom: 1px solid #e9eeeb;
  }

  .textbox i {
    width: 26px;
    float: left;
    text-align: center;
  }

  .textbox input {
    margin-left: 20px;
    border: none;
    outline: none;
    background: none;
    color: white;
    font-size: 22px;
    width: 100%;
    float: left;
  }

  button {
    width: 100%;
    height: 40px;
    font-size: 22px;
    background: none;
    border: 3px solid #e9eeeb;
    color: #e9eeeb;
  }
`;

export default function SignIn(props) {
  const [logIn, setLogIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const logInSubmit = (event) => {
    event.preventDefault();
    fetch("https://filter-newss.herokuapp.com/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          props.logInUser(data.token, data.user_id);
        }
      });
  };

  const onChangeUsername = (event) => {
    console.log("username", event.target.value);
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    console.log("password", event.target.value);

    setPassword(event.target.value);
  };

  return (
    <Component>
      <Typ>
        The News from{" "}
        <Typical
          loop={5}
          wrapper="b"
          steps={[
            "Anywhere",
            2000,
            "CNN",
            3000,
            "FoxNews",
            3000,
            "WashingtonPost",
            3000,
            "AbcNews",
            3000,
          ]}
        />
      </Typ>

      <Mainsection>
        <div className="login-box">
          <h1>Login</h1>
          <h6>Username:guest Password:guest</h6>

          <form onSubmit={(e) => logInSubmit(e)}>
            <div className="textbox">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                placeholder="Username"
                onChange={onChangeUsername}
              />
            </div>
            <div className="textbox">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </Mainsection>
    </Component>
  );
}

// import React, { Component } from "react";
// import "./css/signin.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
// import Typical from "react-typical";
// import Typist from "react-typist";

// export default class SignIn extends Component {

//   state={
//     logIn:false,
//     username:"",
//     password:"",
//     errors:[]
//   }

//   //   const [logIn, setLogIn] = useState(false);
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState([]);

//   logInSubmit = (event) => {
//         event.preventDefault();
//         fetch("https://filter-newss.herokuapp.com/tokens", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: username,
//             password: password,
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.errors) {
//               set(data.errors);
//             } else {
//               this.props.logInUser(data.token, data.user_id);
//             }
//           });
//       };

//   render() {
//     return (
//       <div>
//         <p className="typical">
//           The News from{" "}
//           <Typical
//             loop={5}
//             wrapper="b"
//             steps={[
//               "Anywhere",
//               2000,
//               "CNN",
//               3000,
//               "FoxNews",
//               3000,
//               "WashingtonPost",
//               3000,
//               "AbcNews",
//               3000,
//             ]}
//           />
//         </p>

//         <section className="main">
//           <div className="login-box">
//             <h1>Login</h1>
//             <div className="textbox">
//               <FontAwesomeIcon icon={faUser} />
//               <input type="text" placeholder="Username" />
//             </div>
//             <div className="textbox">
//               <FontAwesomeIcon icon={faLock} />
//               <input type="password" placeholder="Password" />
//             </div>
//             <button>Sign In</button>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// import React, { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   "@global": {
//     body: {
//       backgroundColor: theme.palette.common.white,
//     },
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignIn(props) {
//   const classes = useStyles();

//   const [logIn, setLogIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   const logInSubmit = (event) => {
//     event.preventDefault();
//     fetch("https://filter-newss.herokuapp.com/tokens", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.errors) {
//           setErrors(data.errors);
//         } else {
//           props.logInUser(data.token, data.user_id);
//         }
//       });
//   };

//   const onChangeUsername = (event) => {
//     //   console.log("username", event.target.value)
//     setUsername(event.target.value);
//   };

//   const onChangePassword = (event) => {
//     // console.log("password", event.target.value)

//     setPassword(event.target.value);
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <br></br>
//         <h5>Username:guest</h5>
//         <h5>Password:guest</h5>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={onChangeUsername}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             onChange={onChangePassword}
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={logInSubmit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }
