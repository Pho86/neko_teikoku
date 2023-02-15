import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Button from "@/components/Atoms/Button";

import { SignUp, SignIn, SignOut, ForgotPassword } from "/server";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/router";

const PopupCont = styled.div`
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1.2em;
    border: 3px solid var(--border);
    border-bottom: 8px solid var(--border);
    width: 320px;
    min-height: 245px;
    justify-content: space-around;
`

const PopupText = styled.div`
    display: flex;
    // align-items: center;
    // justify-content: center;
    margin: 0.5em;
`
const BtnCont = styled.div`
    margin: 1em;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1em;
`
const CusHr = styled.div`
    width: 18em;
    height: 3px;
    background-color: var(--button-light);
    margin: 0.5em;
    border-radius: 2px;
    border: 0;
`
const BotCont = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 0.5em 0;
    // gap: 1em;
`
const AudCont = styled.div`
display:flex;
flex-direction: column;
align-items: flex-star;
`

const AudBar = styled.div`
    width: 9em;
    height:0.5em;
    background-color: var(--button-light);
    margin-top: 0.5em;
    border-radius: 5px;
    border: 0;
`

const DisplayEmail = styled.div`
    width: fit-content;
    height: 3em;
    padding: 1.5em;

    background-color: rgba(248, 215, 168, 0.4);;
    margin-top: 0.5em;
    border-radius: 1.5em;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonDiv = styled.div`
    pointer-events:auto;
    margin: 2% 1% 1% 2%;
`

const PopupDiv = styled.div`
    display: flex;
`

export default function SettingsPopup(
    {
        exit,
        onExit = ()=>{ }
}){

    const [currentUser, setCurrentUser] = useState({})
    const [ErrorMessage, setErrorMessage] = useState("")

    const handleSignOut = async () => {
        await SignOut(auth)
    }

    return(
        <>
        <PopupDiv>
            <PopupCont 
                exit={exit}
            >
            
                <BtnCont>
                    <AudCont>
                        <Typography
                            text={"sound"}
                            weight={"400"}
                            size={"1.3rem"}
                            color={"var(--black)"}
                        />
                        <AudBar/>
                    </AudCont>

                    {/* <Button text={`NAH`} color={"var(--button-red)"} colorhover={"var(--border-hard)"} border={"4px solid var(--border-hard)"} borderradius={"1.5em"} padding={"0.5em 2em"} textstroke={"1px var(--border-hard)"} /> */}

                    {/* need mute and unmute audio functions */}
                    <Button text={`MUTE`} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.2em 1.5em"} textstroke={"1px var(--button-medium)"}/>
                </BtnCont>

                <DisplayEmail>
                    <Typography
                        text={"JMeowster123@gmail.com"}
                        weight={"400"}
                        size={"1.2rem"}
                        color={"var(--button-medium)"}
                        align={"center"}
                    />
                </DisplayEmail>

                <BotCont>
                    <CusHr/>
                    {currentUser ? <>
                        <Button type="button" text="LOGOUT" onClick={handleSignOut}  
                            color={"var(--button-red)"} colorhover={"var(--border-hard)"}
                            border={"4px solid var(--border-hard)"} borderradius={"1.5em"}
                            textstroke={"1px var(--button-medium)"} padding={"0.5em 6em"} />
                    </>
                        : <></>}
                </BotCont>
            </PopupCont>
            <ButtonDiv>
                    <Button onClick={onExit} image="/icons/exit.svg" color="var(--border-light)" alt="exit button" colorhover="var(--border-hard)" />
            </ButtonDiv>
        </PopupDiv>
        </>
    )
}