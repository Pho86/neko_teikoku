import styled from "styled-components"
import Input from "@/components/Atoms/Input"
import Button from "@/components/Atoms/Button"
import Head from "next/head"
import { SignUp } from "/server";
import { use, useState } from "react";
const LoginForm = styled.form`
display:flex;
flex-direction:column;
width:25%;
`

export default function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        username: "",
        password: ""
    })
    const [ErrorMessage, setErrorMessage] = useState("")
    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        SignUp(loginInfo)
        // console.log(loginInfo.username)
        try {
            setErrorMessage("")
        }
        catch (error) {
            setErrorMessage("ERROR OCCURED")
        }
    }
    return (
        <>
            <Head>
                <title>Login - Neko Teikoku</title>
            </Head>
            <div>
                <LoginForm onChange={handleChange}>
                    <Input type="email" name="email" placeholder="enter email" />
                    <Input type="text" name="username" placeholder="enter username" />
                    <Input type="password" name="password" placeholder="enter password" />
                </LoginForm>
                <div>
                    <Button text="NAH" color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} textstroke={"5px var(--border-hard)"} />
                    <Button text="YAH" onClick={handleSubmit} colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"} textstroke={"5px var(--border)"} />
                </div>
                {ErrorMessage && ErrorMessage}
            </div>
        </>
    )
}