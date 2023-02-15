import styled from "styled-components"
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Typography from "@/components/Atoms/Text";

import Input from "@/components/Atoms/Input"
import Button from "@/components/Atoms/Button"
import Head from "next/head"
import { SignUp, SignIn, SignOut, ForgotPassword } from "/server";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/router";

import { PopUpWithTab } from "@/components/Atoms/Popup";

const LoginForm = styled.form`
    display:flex;
    flex-direction:column;
    // width:30%;
    padding: 1em;
    // gap: 1em;
`
const InputLogin = styled.input`
    padding:1em;
    font-size:1rem;
    background-color:var(--white);
    border-radius:1em;
    border: 3px solid var(--border);
    pointer-events:auto;
    width:100%;
    outline:none;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: var(--border);
    font-weight: 500;
    }
    :-ms-input-placeholder {
        color: var(--border);
        font-weight: 500;
    }
    ${props => props.type === 'password' && `
    font: small-caption;
    font-size:1rem;
    `}
    
`
const PopCont = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`
const FormCont = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:1em;
`
const ImgCont = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:4em;
`
const InputDiv = styled.div`
display:flex;
flex-direction:column;
// width:30%;
padding: 1em 0;
gap: 1em;
`

export default function Login({
    onExit = () => { }
}) {

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
        catch (error) {
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
            <main className="loginBackground">
                <div className={styles.loginCont}>

                    {/* <LoginForm onChange={handleChange} name="register">
                        <Input type="email" name="email" placeholder="enter email" />
                        <Input type="text" name="username" placeholder="enter username" />
                        <Input type="password" name="password" placeholder="enter password" />
                        <Button type="button" text="Register" onClick={handleRegisterSubmit} colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"} />
                    </LoginForm>
                    {ErrorMessage && ErrorMessage} */}

                    <PopUpWithTab
                        title={"login"}
                        secondTab={"register"}
                        onExit={onExit}
                        size={"1.2em"}
                        direction="row"
                        initial={{ y: "-100vh" }}
                        animate={{ y: "-5%" }}
                        exit={{ y: "-100vh" }}
                        transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                        exitTab
                        onFirstTabClick={() => { }}
                        onSecondTabClick={() => { }}
                        content={
                            <>
                                <PopCont>
                                    <ImgCont>
                                        <Image
                                            src={'/icons/nekoTeikoku.svg'}
                                            width={300}
                                            height={300}
                                            alt={"Neko Teikoku Logo"}
                                        />
                                    </ImgCont>

                                    <hr />

                                    <FormCont>

                                        <Typography
                                            text={"Meowcome back!"}
                                            weight={"600"}
                                            size={"2rem"}
                                            color={"var(--black)"}
                                        />
                                        <Typography
                                            text={"meowmeowmewomeowmeow!"}
                                            weight={"500"}
                                            size={"1rem"}
                                            color={"var(--black)"}
                                        />
                                        <LoginForm onChange={handleChange} name="login">
                                            <InputDiv>
                                                <InputLogin type="text" name="email" placeholder="enter email" />
                                                <InputLogin type="password" name="password" placeholder="enter password" />
                                            </InputDiv>

                                            <Button type="button" text="LOGIN" onClick={handleLoginSubmit}
                                                color={"var(--button-light)"} colorhover={"var(--button-medium)"}
                                                border={"4px solid var(--button-medium)"} borderradius={"1.5em"}
                                                textstroke={"1px var(--button-medium)"} padding={"0.5em 10em"} />

                                            <Typography
                                                text={"Need an account? Register!"}
                                                weight={"500"}
                                                size={"1rem"}
                                                color={"var(--border-hard)"}
                                                textHover={"var(--secondary-accent)"}
                                                padding={"1em"}
                                                align={"center"}
                                            />
                                        </LoginForm>
                                    </FormCont>
                                </PopCont>
                            </>}
                    >
                    </PopUpWithTab>
                    {ErrorMessage && ErrorMessage}
                    <div>

                        {currentUser ? currentUser.displayName : 'Not logged in'}


                        {currentUser ? <>
                            <Button type="button" text="Logout" onClick={handleSignOut} color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} />
                            <Button type="button" text="GO HOME" onClick={() => { router.push('/') }} colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"} />
                        </>
                            : <></>}
                    </div>
                    {/* <LoginForm onChange={handleChange} name="forgot">
                        <Input type="text" name="email" placeholder="enter email" />
                        <Button type="button" text="Forgot Password" onClick={handleForgotPassword} color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} />
                    </LoginForm> */}
                </div>

            </main>
        </>
    )
}