import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ItemCard from "@/components/Atoms/ItemCard";
import Typography from "@/components/Atoms/Text";
import { useState } from "react";
import ItemData from "@/data/items.json"
import Button from "@/components/Atoms/Button";
import IconButton from "@/components/Atoms/IconButton";
import { Slider } from "@/components/Atoms/Slider";

const Grid = styled.div`
display:grid;
grid-template-columns:repeat(6, 1fr);
gap:2em;
@media (max-width: 1280px) {
   grid-template-columns:repeat(3, 1fr);
}
`
const GridItem = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
`
const CloseButtonCont = styled.div`
position:fixed;
top:calc(-25% - 3em);
right:3%;
`
export default function ItemsSlider({
   active,
   Items,
   onExit = () => { }
}) {
   const [pageLimit, setPageLimit] = useState(6)
   const [pageMin, setPageMin] = useState(0)
   const [currentPage, setCurrentPage] = useState(1);

   return (
      <>
         <AnimatePresence>
            {active &&
               <Slider
                  initial={{ y: "30vh" }}
                  animate={{ y: 10 }}
                  exit={{ y: "30vh" }}
                  transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
               >
                  <CloseButtonCont>
                     <Button onClick={onExit} image="/icons/exit.svg" color="var(--border-hard)" alt="exit button"/>
                  </CloseButtonCont>
                  <IconButton
                     image="/icons/leftarrowlight.svg"
                     hover
                     secondImage="/icons/leftarrow.svg"
                     alt="Go backwards" width={75} height={75} onClick={() => {
                        if (currentPage > 1) {
                           setCurrentPage(currentPage - 1);
                           setPageMin(pageMin - 6);
                           setPageLimit(pageLimit - 6);
                        }
                     }} />

                  <Grid>
                     {ItemData && ItemData.slice(pageMin, pageLimit).map((item, i) => {
                        return <GridItem key={i}>
                           <ItemCard image={item.image} alt="MEOW MEOW" />
                           <Typography text={"x1"} weight={"400"} size={".9em"} />
                           <Typography text={item.name} weight={"500"} size={"1.2em"} />
                        </GridItem>
                     })}
                  </Grid>
                  <IconButton
                     image="/icons/rightarrowlight.svg"
                     hover
                     secondImage="/icons/rightarrow.svg"
                     alt="Go forward" width={75} height={75}
                     onClick={() => {
                        if (currentPage < 2) {
                           setCurrentPage(currentPage + 1);
                           setPageMin(pageMin + 6);
                           setPageLimit(pageLimit + 6);
                        }
                     }}
                  />
               </Slider>
            }
         </AnimatePresence>
      </>
   )
}