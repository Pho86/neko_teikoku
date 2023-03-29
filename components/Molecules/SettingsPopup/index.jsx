import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Button from "@/components/Atoms/Button";
import { SignOut } from "/server";
import { useState, useContext } from "react";
import { auth } from "@/firebase/firebase.config";
import { AnimatePresence } from "framer-motion";
import { GameContext } from "@/pages/_app";
import { userContext } from "@/pages";

const PopupCont = styled.div`
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1.2em;
    border: 3px solid var(--border);
    border-bottom: 8px solid var(--border);
    min-height: 245px;
    justify-content: space-around;
    cursor:auto;
`

const BtnCont = styled.div`
    margin: 1em;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1em;
    align-self:flex-start;
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
`
const AudCont = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
`

const AudBar = styled.div`
    width: 7.5em;
    height:0.2em;
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
    margin: 0em 1em;
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
    cursor: auto;
`

const PopupDiv = styled.div`
    display: flex;
`

export default function SettingsPopup(
    {
        exit,
        onExit = () => { }
    }) {

    const [currentUser, setCurrentUser] = useState({})
    const { Volume, setVolume, BGMVolume, setBGMVolume } = useContext(GameContext)
    const { bgm, bgmController, } = useContext(userContext)

    const handleSignOut = async () => {
        await SignOut(auth)
    }


    return (
        <AnimatePresence>
            <PopupDiv>
                <PopupCont
                    exit={exit}
                >
                    <BtnCont>
                        <AudCont>
                            <Typography
                                text={"bgm"}
                                weight={"400"}
                                size={"1.3rem"}
                                color={"var(--black)"}
                            />
                            <AudBar />
                        </AudCont>

                        {BGMVolume > 0 ?
                            <Button text={`MUTE`} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.2em 1.5em"} textstroke={"1px var(--button-medium)"} onClick={() => { setBGMVolume(0); bgmController.stop() }} />
                            :
                            <Button text={`UNMUTE`} color={"var(--button-red)"} colorhover={"var(--border-hard)"} border={"4px solid var(--border-hard)"} borderradius={"1.5em"} padding={"0.2em 1.5em"} textstroke={"1px var(--button-medium)"} onClick={() => { setBGMVolume(.2); bgm(); }} />
                        }
                    </BtnCont>
                    <BtnCont>
                        <AudCont>
                            <Typography
                                text={"sound fx"}
                                weight={"400"}
                                size={"1.3rem"}
                                color={"var(--black)"}
                            />
                            <AudBar />
                        </AudCont>

                        {Volume > 0 ?
                            <Button text={`MUTE`} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.2em 1.5em"} textstroke={"1px var(--button-medium)"} onClick={() => { setVolume(0) }} />
                            :
                            <Button text={`UNMUTE`} color={"var(--button-red)"} colorhover={"var(--border-hard)"} border={"4px solid var(--border-hard)"} borderradius={"1.5em"} padding={"0.2em 1.5em"} textstroke={"1px var(--button-medium)"} onClick={() => { setVolume(.5) }} />
                        }

                    </BtnCont>

                    <DisplayEmail>
                        <Typography
                            text={auth.currentUser.email}
                            weight={"400"}
                            size={"1rem"}
                            color={"var(--button-medium)"}
                            align={"center"}
                        />
                    </DisplayEmail>

                    <BotCont>
                        <CusHr />
                        {currentUser ? <>
                            <Button type="button" text="LOGOUT" onClick={handleSignOut}
                                color={"var(--button-red)"} colorhover={"var(--border-hard)"}
                                border={"4px solid var(--border-hard)"} borderradius={"1.5em"}
                                textstroke={"1px var(--button-medium)"} padding={"0.5em 6em"} id="logoutbtn"/>
                        </>
                            : <></>
                        }
                    </BotCont>
                </PopupCont>
                <ButtonDiv>
                    <Button onClick={onExit} image="/icons/exit.svg" color="var(--border-light)" alt="exit button" colorhover="var(--border-hard)" />
                </ButtonDiv>
            </PopupDiv>
        </AnimatePresence>
    )
}