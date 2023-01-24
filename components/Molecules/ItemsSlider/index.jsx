import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ItemCard from "@/components/Atoms/ItemCard";
import Typography from "@/components/Atoms/Text";
import { useState } from "react";
import ItemData from "@/data/items.json"

const SliderDiv = styled(motion.div)`
position:fixed;
bottom:0;
left:0;
width:100vw;
padding:3em;
background-color:#ECECEC;
z-index:51;
display:flex; 
justify-content:space-between;
`
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
const CloseButton = styled.button`
position:fixed;
padding:1em 2em;
border-radius:1em;
border:none;
top:-25%;
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
               <SliderDiv
                  initial={{ opacity: 0, y: 150 }}
                  animate={{ opacity: 1, y: 10 }}
                  exit={{ opacity: 0, y: 150 }}
               >
                  <CloseButton onClick={onExit}>Close</CloseButton>
                  <button onClick={() => {
                     if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        setPageMin(pageMin - 6);
                        setPageLimit(pageLimit - 6);
                     }
                  }}>BACK</button>

                  <Grid>
                     {ItemData && ItemData.slice(pageMin, pageLimit).map((item, i) => {
                        return <GridItem key={i}>
                           <ItemCard image={item.image} alt="MEOW MEOW" />
                           <Typography text={item.name} weight={"bold"} size={"1.2em"} />
                        </GridItem>
                     })}
                  </Grid>
                  <button onClick={() => {
                     if (currentPage < 2) {
                        setCurrentPage(currentPage + 1);
                        setPageMin(pageMin + 6);
                        setPageLimit(pageLimit + 6);
                     }
                  }}>Forward</button>
               </SliderDiv>
            }
         </AnimatePresence>
      </>
   )
}