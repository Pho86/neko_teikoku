import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ItemCard from "@/components/Atoms/ItemCard";
import Typography from "@/components/Atoms/Text";
import { useState, useEffect } from "react";
import TreatsData from "@/data/treats.json"
import IconButton from "@/components/Atoms/IconButton";
import { SliderTab } from "@/components/Atoms/Slider";
import Ingredients from "@/data/ingredients.json";


const Grid = styled.div`
display:grid;
grid-template-columns:repeat(6, 1fr);
gap:2em;
// @media (max-width: 1280px) {
//    grid-template-columns:repeat(3, 1fr);
// }
`
const GridItem = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;

`
export default function TreatsSlider({
    active,
    treats,
    onExit = () => { },
    onTreatClick = (treat) => { return treat }
}) {
    const [pageLimit, setPageLimit] = useState(6)
    const [pageMin, setPageMin] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [tab, setTab] = useState(true);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        setMaxPage(Math.round((pageLimit / TreatsData.length)))
    }, [pageLimit])

    return (
        <AnimatePresence>
            {active &&
                <SliderTab
                    initial={{ y: "50vh" }}
                    animate={{ y: 10 }}
                    exit={{ y: "50vh" }}
                    transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                    tab={"treats"}
                    onExit={onExit}
                    tabcolor={tab}
                    onPrevious={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            setPageMin(pageMin - 6);
                            setPageLimit(pageLimit - 6);
                        }
                    }}
                    onNext={() => {
                        () => {
                            if (currentPage < maxPage) {
                                setCurrentPage(currentPage + 1);
                                setPageMin(pageMin + 6);
                                setPageLimit(pageLimit + 6);
                            }
                        }
                    }}
                    content={<>
                        <Grid>
                            {tab && TreatsData.slice(pageMin, pageLimit).map((item, i) => {
                                return <GridItem key={i} onClick={()=>onTreatClick(item)}>
                                    <ItemCard image={item.image} alt="MEOW MEOW" />
                                    <Typography text={"x1"} weight={"400"} size={".9rem"} />
                                    <Typography text={item.name} weight={"500"} size={"1.2rem"} />
                                </GridItem>
                            })}
                        </Grid>
                    </>}
                >
                </SliderTab>
            }
        </AnimatePresence>
    )
}