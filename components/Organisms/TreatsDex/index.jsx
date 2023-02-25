import CatCard from "@/components/Molecules/CatCard";
import FoodCard from "@/components/Molecules/FoodCard";
import { PopUp, OpacityBackgroundFade, PopUpWithTab, Tab } from "@/components/Atoms/Popup";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import Treats from "@/data/treats.json"
import Image from "next/image";
import IconButton from "@/components/Atoms/IconButton";

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
    const [page, setPage] = useState([0, 6, 1])
    const [pageLimit, setPageLimit] = useState(2)
    const [pageMin, setPageMin] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    return (
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
                        animate={{ y: "20vh" }}
                        exit={{ y: "-100vh" }}
                        transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                        exitTab
                        arrows
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
                                        <FoodCard key={id} onClick={() => { }} treatname={treat.name} treatimg={treat.image} aing={"x1"} bing={"x1"} aimg={"/treats/bento.svg"} bimg={"/treats/bento.svg"} />
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

    )
}