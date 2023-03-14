import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from "next/image";
import Button from "@/components/Atoms/Button";
import { motion, AnimatePresence } from "framer-motion";
import { PopUpWithTab } from "@/components/Atoms/Popup";
import CatCard from "../CatCard";
import OfferCard from "../OfferingCard";
import { OpacityBackgroundFade } from "@/components/Atoms/Popup";

const BtnCont = styled.div`
    // margin-top: 1em;
    display: flex;
    align-items: center;
    flex-direction: column;
    // gap: 1em;
`

const InvCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 25em;
    padding-left: 2em;
    padding-right: 2em;
    overflow-y:scroll;
`

export default function Offerings(
    {
        btnText,
        btnClick = () => { },
        onChange,
        exit,
        onExit = () => { },
        active,
    }
) {

    return (
        <>
            <AnimatePresence>
                {active &&
                    <>
                        <OpacityBackgroundFade key={"CatDex Fade"} onClick={onExit} />
                        <PopUpWithTab
                            title={"offerings"}
                            size={"1.2em"}
                            direction="column"
                            initial={{ y: "-100vh", x: 60 }}
                            animate={{ y: "20%", x: 60 }}
                            exit={{ y: "-100vh" }}
                            transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                            onExit={onExit}
                            exitTab
                            content={
                                <>
                                    <InvCont>
                                        <OfferCard />
                                        <OfferCard />
                                        <OfferCard />
                                        <OfferCard />
                                    </InvCont>
                                    <BtnCont>
                                        <Button text={btnText} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.3em 2em"} textstroke={"1px var(--button-medium)"} onClick={btnClick} />
                                    </BtnCont>
                                </>
                            }>
                        </PopUpWithTab>
                    </>
                }
            </AnimatePresence>
        </>
    )
}