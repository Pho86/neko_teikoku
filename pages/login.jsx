import styled from "styled-components"
import Input from "@/components/Atoms/Input"
import Button from "@/components/Atoms/Button"
import Head from "next/head"
import { SignUp, SignIn, SignOut, ForgotPassword } from "/server";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/router";
const LoginForm = styled.form`
display:flex;
flex-direction:column;
width:30%;
`

export default function Login() {
    const router = useRouter()
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [currentUser, setCurrentUser] = useState({})

    const [ErrorMessage, setErrorMessage] = useState("")

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
        // if (event.target.form.name === "register") {
        //     setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
        // }
        // if (event.target.form.name === "login") {
        //     setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
        // }
        // if (event.target.form.name === "forgot") {
        //     setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
        // }
    };
    const handleRegisterSubmit = async () => {
        try {
            await SignUp(loginInfo);
            setErrorMessage("you have successfuly signed up ")
        }
        catch (error) {
            setErrorMessage("ERROR OCCURED")
        }
    }
    const handleLoginSubmit = async () => {
        try {
            await SignIn(loginInfo)
            setErrorMessage("you have successfuly logged in ")
        } catch (error) {
            setErrorMessage("ERROR OCCURED")
        }
    }
    const handleSignOut = async () => {
        await SignOut(auth)
    }
    const handleForgotPassword = async () => {
        try {
            await ForgotPassword(loginInfo)
            setErrorMessage("an email has been sent")
        }
        catch(error) {
            setErrorMessage("ERROR OCCURED")
        }
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            setCurrentUser(currentUser);
            console.log(currentUser)
        })
    }, [])
    return (
        <>
            <Head>
                <title>Login - Neko Teikoku</title>
            </Head>
            <div>
                <LoginForm onChange={handleChange} name="register">
                    <Input type="email" name="email" placeholder="enter email" />
                    <Input type="text" name="username" placeholder="enter username" />
                    <Input type="password" name="password" placeholder="enter password" />
                    <Button type="button" text="Register" onClick={handleRegisterSubmit} colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"} />
                </LoginForm>
                {ErrorMessage && ErrorMessage}

                <LoginForm onChange={handleChange} name="login">
                    <Input type="text" name="email" placeholder="enter email" />
                    <Input type="password" name="password" placeholder="enter password" />
                    <Button type="button" text="Login" onClick={handleLoginSubmit} color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} />
                </LoginForm>
                {ErrorMessage && ErrorMessage}
                <div>

                    {currentUser ? currentUser.displayName : 'Not logged in'}

                    
                    {currentUser ? <>
                    <Button type="button" text="Logout" onClick={handleSignOut} color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} /> 
                    <Button type="button" text="GO HOME" onClick={()=>{router.push('/')}}  colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"}  /> 
                    </>
                    : <></>}
                </div>
                <LoginForm onChange={handleChange} name="forgot">
                    <Input type="text" name="email" placeholder="enter email" />
                    <Button type="button" text="Forgot Password" onClick={handleForgotPassword} color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} />
                </LoginForm>
            </div>
        </>
    )
}