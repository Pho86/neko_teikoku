import CatCard from "@/components/Molecules/CatCard";
import { PopUp, OpacityBackgroundFade } from "@/components/Atoms/Popup";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import IconButton from "@/components/Atoms/IconButton";

const PopUpDiv = styled(PopUp)`
flex-direction:row;
justify-content:space-between;
gap:2em;
`
const PopUpGrid = styled.div`
display:grid;
grid-template-columns: repeat(2, 1fr);
justify-items:center;
gap:3em;
@media (max-width: 1280px) {
   grid-template-columns: repeat(1, 1fr);
 }
`

const GridItem = styled.div`
display:grid
`
export default function CatDex({
   catData,
   onExit = () => { },
   catDex,
   selectCatCard = (id) => { return id; },

}) {
   const [page, setPage] = useState([0, 6, 1])
   const [pageLimit, setPageLimit] = useState(6)
   const [pageMin, setPageMin] = useState(0)
   const [currentPage, setCurrentPage] = useState(1);
   return (
      <>
         <AnimatePresence>
            {catDex === true &&
               <>
                  <OpacityBackgroundFade key={"CatDex Fade"} onClick={onExit} />
                  <PopUpDiv
                     initial={{ opacity: 0, x: "-50%", y: "-100vh" }}
                     animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                     exit={{ opacity: 0, y: "-150%" }}
                     transition={{ delay: .05, duration: .5 }}
                     width={"65vw"}
                  >
                     <IconButton
                        image="/icons/leftarrow.svg"
                        alt="Go back" width={75} height={75}
                        onClick={() => {
                           if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                              setPageMin(pageMin - 6);
                              setPageLimit(pageLimit - 6);
                           }
                        }} />
                     <PopUpGrid>
                        {catData && catData.slice(pageMin, pageLimit).map((cat, i) => {
                           return (
                              <GridItem key={cat.id}>
                                 <CatCard catData={cat} onClick={() => { selectCatCard(cat.id) }} />
                                 {/* <CatDexCard catData={cat} show={cardId} onExit={() => { setCardID(0) }} /> */}
                              </GridItem>
                           )
                        })}
                     </PopUpGrid>
                     <IconButton
                        image="/icons/rightarrow.svg"
                        alt="Go forward" width={75} height={75}
                        onClick={() => {
                           if (currentPage < 14) {
                              setCurrentPage(currentPage + 1);
                              setPageMin(pageMin + 6);
                              setPageLimit(pageLimit + 6);
                           }
                        }} />
                  </PopUpDiv>
               </>
            }
         </AnimatePresence>

      </>
   )
}