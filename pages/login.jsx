import styled from "styled-components"
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Typography from "@/components/Atoms/Text";
import { StrokedText } from "stroked-text";

import Input from "@/components/Atoms/Input"
import Button from "@/components/Atoms/Button"
import Head from "next/head"
import { SignUp, SignIn, SignOut, ForgotPassword } from "/server";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/router";

import { PopUpWithTab } from "@/components/Atoms/Popup";
import { m, AnimatePresence } from "framer-motion";
import PopupPrompt from "@/components/Molecules/PopupPrompt";


const LoginForm = styled.form`
    display:flex;
    flex-direction:column;
    // width:30%;
    padding: 1em;
    // gap: 1em;
    width: 23.5em;
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
const SpaceDiv = styled.div`
padding:1em;
`
const BtnSpaceDiv = styled.div`
padding-top:1em;
padding-bottom:1em;

`

const TitleDiv = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
`

const StartDiv = styled.div`
    cursor:pointer;
    z-index: 50;
`

export default function Login({

}) {

    const [start, setStart] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [passwordtext, setPasswordText] = useState('password reset')

    const router = useRouter()
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [currentUser, setCurrentUser] = useState({})

    const [ErrorMessage, setErrorMessage] = useState("")
    const [tabs, setTabs] = useState(true)

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };

    const handleRegisterSubmit = async () => {
        try {
            await SignUp(loginInfo);
            setErrorMessage("you have successfully signed up ")
            setTimeout(() => {
                router.push('/')
            }, 2000);
        }
        catch (error) {
            setErrorMessage("ERROR OCCURED")
        }
    }

    const handleLoginSubmit = async () => {
        try {
            await SignIn(loginInfo)
            setErrorMessage("successfully logged in!")
            setTimeout(() => {
                router.push('/')
            }, 2000);
        } catch (error) {
            setErrorMessage("ERROR OCCURED")
        }
    }


    const handleForgotPassword = async () => {
        setPasswordText("sending email...");
        try {
            await ForgotPassword(loginInfo)
            setPasswordText("an email has been sent");
        }
        catch (error) {
            setPasswordText("ERROR OCCURED")
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            setCurrentUser(currentUser);
        })
    }, [])

    return (
        <>
            <Head>
                <title>Login - Neko Teikoku</title>
            </Head>
            <main className="loginBackground">
                <div className={styles.loginCont}>
                    <TitleDiv>
                        <AnimatePresence>
                            <>
                                <ImgCont>
                                    <m.div >
                                        <Image
                                            src={'/icons/nekoTeikokuV2.svg'}
                                            width={500}
                                            height={100}
                                            alt={"Neko Teikoku Logo Horizontal"}
                                        />
                                    </m.div>
                                </ImgCont>
                                <m.div initial={{ y: 5 }} animate={{ y: -5 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 1, ease: 'easeInOut' }}
                                    onClick={() => { setStart(true) }}
                                    id="start"
                                >
                                    <StartDiv

                                    >
                                        <StrokedText fill='var(--white)' stroke='var(--button-medium)' strokeWidth={10} style={{ fontSize: '4rem', fontWeight: "800" }}>
                                            start
                                        </StrokedText>
                                    </StartDiv>
                                </m.div>
                            </>
                        </AnimatePresence>
                    </TitleDiv>

                    <AnimatePresence>
                        {start &&
                            <PopUpWithTab
                                title={"login"}
                                secondTab={"register"}
                                onExit={() => setStart(false)}
                                tabcolor={!tabs}
                                size={"1.2em"}
                                direction="row"
                                initial={{ y: "-100vh" }}
                                animate={{ y: "-5%" }}
                                exit={{ y: "-100vh" }}
                                transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                                exitTab
                                onFirstTabClick={() => { setTabs(true) }}
                                onSecondTabClick={() => { setTabs(false) }}
                                tabs={tabs}
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

                                            {tabs ? <FormCont>
                                                <LoginForm onChange={handleChange} name="login">
                                                    <SpaceDiv>
                                                        <Typography
                                                            text={"Meowcome back!"}
                                                            weight={"600"}
                                                            size={"1.8rem"}
                                                            color={"var(--black)"}
                                                            align={"center"}
                                                        />
                                                        <Typography
                                                            text={"meowmeowmewomeowmeow!"}
                                                            weight={"500"}
                                                            size={"1rem"}
                                                            color={"var(--black)"}
                                                            align={"center"}
                                                        />
                                                    </SpaceDiv>
                                                    <InputDiv>
                                                        <Typography
                                                            text={ErrorMessage && ErrorMessage}
                                                            color={"var(--border-hard)"}
                                                            align={"center"}
                                                            weight={"500"}
                                                        />
                                                        <InputLogin type="text" name="email" placeholder="enter email" />
                                                        <InputLogin type="password" name="password" placeholder="enter password" />
                                                        <Typography id='forgotPass'
                                                            text={"Forgot Your Password?"}
                                                            weight={"500"}
                                                            size={"0.8rem"}
                                                            color={"var(--border-hard)"}
                                                            textHover={"var(--secondary-accent)"}
                                                            align={"left"}
                                                            onClick={() => { setForgot(true) }}
                                                        />

                                                    </InputDiv>
                                                    <BtnSpaceDiv>

                                                        <Button type="button" text="LOGIN" onClick={handleLoginSubmit}
                                                            color={"var(--button-light)"} colorhover={"var(--button-medium)"}
                                                            border={"4px solid var(--button-medium)"} borderradius={"1.5em"}
                                                            textstroke={"1px var(--button-medium)"} width={"100%"} padding={"0.5em"} />

                                                        <Typography
                                                            text={"Need an account? Register!"}
                                                            weight={"500"}
                                                            size={"1rem"}
                                                            color={"var(--border-hard)"}
                                                            textHover={"var(--secondary-accent)"}
                                                            padding={"1em"}
                                                            align={"center"}
                                                            onClick={() => { setTabs(false) }}
                                                        />
                                                    </BtnSpaceDiv>
                                                </LoginForm>


                                            </FormCont> : <FormCont onChange={handleChange} name="register">
                                                <LoginForm>
                                                    <SpaceDiv>
                                                        <Typography
                                                            text={"Create a mew account!"}
                                                            weight={"600"}
                                                            size={"1.8rem"}
                                                            color={"var(--black)"}
                                                            align={"center"}
                                                        />
                                                        <Typography
                                                            text={"meowmeowmewomeowmeow!"}
                                                            weight={"500"}
                                                            size={"1rem"}
                                                            color={"var(--black)"}
                                                            align={"center"}
                                                        />
                                                    </SpaceDiv>
                                                    <InputDiv>
                                                        <Typography
                                                            text={ErrorMessage && ErrorMessage}
                                                            color={"var(--border-hard)"}
                                                            align={"center"}
                                                            weight={"500"}
                                                        />
                                                        <InputLogin type="email" name="email" placeholder="enter email" />
                                                        <InputLogin type="text" name="username" placeholder="enter username" />
                                                        <InputLogin type="password" name="password" placeholder="enter password" />
                                                    </InputDiv>
                                                    <BtnSpaceDiv>
                                                        <Button type="button" text="REGISTER" onClick={handleRegisterSubmit}
                                                            color={"var(--button-light)"} colorhover={"var(--button-medium)"}
                                                            border={"4px solid var(--button-medium)"} borderradius={"1.5em"}
                                                            textstroke={"1px var(--button-medium)"} width={"100%"} padding={"0.5em"} />
                                                        <Typography
                                                            text={"Have an account? Login!"}
                                                            weight={"500"}
                                                            size={"1rem"}
                                                            color={"var(--border-hard)"}
                                                            textHover={"var(--secondary-accent)"}
                                                            padding={"1em"}
                                                            align={"center"}
                                                            onClick={() => { setTabs(true) }}
                                                        />
                                                    </BtnSpaceDiv>
                                                </LoginForm>
                                            </FormCont>
                                            }
                                        </PopCont>
                                    </>
                                }
                            >
                            </PopUpWithTab>
                        }

                        {forgot && <PopupPrompt
                            key="password prompt"
                            type={"input"}
                            cooktext={passwordtext}
                            oneBtn={false}
                            btnText1={"EXIT"}
                            btnText2={"SUBMIT"}
                            onClick={handleForgotPassword}
                            btnClick={() => { setForgot(false) }}
                            btnClick1={handleForgotPassword}
                            onChange={handleChange}
                        />
                        }
                    </AnimatePresence>

                </div>
            </main>
        </>
    )
}