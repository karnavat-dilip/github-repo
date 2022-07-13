import React, { useState } from 'react'
import './App.css'
import { Submit_Page } from './Submit_Page'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TextField, IconButton, InputLabel } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useHistory } from 'react-router';
export const Loginpage = () => {

    const history = useHistory()

    const [user, setuser] = useState()
    const [usern, setusern] = useState()
    const [passw, setpassw] = useState()

    try {
        !user && fetch('http://localhost:9898/login',{
            method:"GET",
            // credentials:'include',
            headers:{"Content-Type": "application/json"},
            // body:JSON.stringify(user)
        }).then((res) => {
                res.json().then((d) => {
                    setuser(d);
                    // console.log(d.rows);
                });
            });
    } catch (error) {
        console.log("###",error.message)
    }
        function username(e) {
            setusern(e.target.value)
        }
    function password(e) {
        setpassw(e.target.value)
    }
    console.log(user);
    function clickme() {
        console.log()
        user.rows.map((info) => {
            console.log(info);
            if (usern === info.username && passw === info.password) {
                history.push('/home')
            }
            else {
                document.getElementById('invalid-user').innerHTML = "Invalid username...";
                document.getElementById('invalid-password').innerHTML = "Invalid password...";
            }
        })
    }
    function back() { window.history.forward(); }
    setTimeout(back(), 0);
    // window.onunload = function () { };
    // window.onbeforeunload = function () {}
    window.history.pushState(null, null, Location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
    let v = document.getElementById('password');
    function visibility() {
        if (v.type === "password") {
            v.type = "text"
        } else {
            v.type = "password"
        }
    }
    return (
        <div className="login">
            <label id="title">LOG IN</label>
            <div className="lable">
                <label >Username: </label>
                <TextField type="text" name="" placeholder="Enter username" className="text" onChange={username} style={{ marginLeft: '2px' }} />
                <span id="invalid-user" className="invalid"></span>
            </div>
            <div className="lable">
                <label className="lable">Password: </label>
                <TextField type="password" name="" placeholder="Enter password" className="text" onChange={password} id='password' InputProps={{
                    endAdornment: (
                        <IconButton>
                            <VisibilityOutlinedIcon onClick={visibility} style={{ cursor: "pointer" }} />
                        </IconButton>
                    )
                }} />

                <span id="invalid-password" className="invalid"></span>

            </div>
            <button type="submit" className="btn" onClick={() => clickme()}>Log in</button>
        </div>
    )
}
