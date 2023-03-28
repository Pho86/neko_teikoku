import FoodCard from "@/components/Molecules/FoodCard";
import { OpacityBackgroundFade, PopUpWithTab } from "@/components/Atoms/Popup";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState, useContext } from "react";
import Treats from "@/data/treats.json"
import Ingredients from "@/data/ingredients.json";
import { userContext } from "@/pages";
import PopupPrompt from "@/components/Molecules/PopupPrompt";
import { makeTreat } from "@/server";
import useSound from "use-sound";
import { GameContext } from "@/pages/_app";
const PopUpGrid = styled.div`
display:grid;
grid-template-columns: repeat(2, 1fr);
justify-items:center;
gap:3em;
@media (max-width: 1280px) {
   // grid-template-columns: repeat(1, 1fr);
 }
`

export default function TreatsDex({
    onExit = () => { },
    active,

}) {
    const [pageLimit, setPageLimit] = useState(2)
    const [pageMin, setPageMin] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [activePop, setActivePop] = useState(false)
    const [treat, setTreat] = useState("")
    const [cooked, setCooked] = useState(false)
    const [popText, setPopText] = useState("missing")
    const { currentOfferings, setCurrentOfferings, setCurrentTreats, fetchTreats, fetchOfferings } = useContext(userContext);
    const { Volume } = useContext(GameContext);

    const [sound] = useSound('/sound/bamboohit.mp3', { volume: Volume, });

    const cookTreat = async (treat) => {
        const treats = await makeTreat(treat, currentOfferings)
        if (treats === 1) {
            setPopText(`Missing x1 ${currentOfferings[treat.ing1].name}`)
            setCooked(true)
            return
        }
        else if (treats === 2) {
            setPopText(`Missing x1 ${currentOfferings[treat.ing2].name}`)
            setCooked(true)
            return
        }
        else {
            setPopText(`${treat.name} acquired!`)
            setCooked(true)
            const offerings = await fetchOfferings();
            const treats = await fetchTreats();
            setCurrentOfferings(offerings);
            setCurrentTreats(treats)
        }
    }
    return (
        <>
            <AnimatePresence>
                {active === true &&
                    <>
                        <OpacityBackgroundFade key={"CatDex Fade"} onClick={onExit} />
                        <PopUpWithTab
                            title={"treats"}
                            onExit={onExit}
                            size={"1.2em"}
                            direction="row"
                            initial={{ y: "-100vh" }}
                            animate={{ y: "0" }}
                            exit={{ y: "-100vh" }}
                            transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                            exitTab
                            arrows
                            pos="relative"
                            onPrevious={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                    setPageMin(pageMin - 2);
                                    setPageLimit(pageLimit - 2);
                                }
                            }}
                            onNext={() => {
                                if (currentPage < 2) {
                                    setCurrentPage(currentPage + 1);
                                    setPageMin(pageMin + 2);
                                    setPageLimit(pageLimit + 2);
                                }
                            }}
                            content={<>
                                <PopUpGrid>
                                    {Treats && Treats.slice(pageMin, pageLimit).map((treat, id) => {
                                        return (
                                            <FoodCard key={id} onClick={() => { setActivePop(!activePop); setTreat(treat); setCooked(false) }} treatname={treat.name} treatimg={treat.image} aing={"x1"} bing={"x1"} aimg={Ingredients[treat.ing1].image} bimg={Ingredients[treat.ing2].image} />
                                        )
                                    })}
                                </PopUpGrid>
                            </>
                            }
                        >

                        </PopUpWithTab>
                    </>
                }


            </AnimatePresence>
            <AnimatePresence>
                {activePop && <>
                    <OpacityBackgroundFade key={"Treats"} onClick={() => { setActivePop(false) }} />
                    {cooked ?
                        <PopupPrompt type="treats" oneBtn btnText1="OKAY" poptext={popText} treat={treat.name} initial={{ y: -500 }} animate={{ y: "35vh" }} transition={{ duration: .8, ease: "easeInOut" }} exit={{ y: -500 }} btnClick={() => { setActivePop(false) }} btnClick1={() => cookTreat(treat)} />
                        :
                        <PopupPrompt type="treats" btnText1="NO" btnText2="YES" poptext={`cook a ${treat.name}`} treat={treat.name} initial={{ y: -500 }} animate={{ y: "35vh" }} transition={{ duration: .8, ease: "easeInOut" }} exit={{ y: -500 }} btnClick={() => { setActivePop(false) }} btnClick1={() => cookTreat(treat)} />
                    }
                </>}
            </AnimatePresence>

        </>
    )
}