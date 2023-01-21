import CatCard from "@/components/Molecules/CatCard";
import CatDexCard from "@/components/Molecules/CatDexCard";
import { PopUp, OpacityBackgroundFade } from "@/components/Atoms/Popup";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
const PopUpDiv = styled(PopUp)`
flex-direction:row;
justify-content:space-between;
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
   catDex
}) {
   const [cardId, setCardID] = useState()
   const [page, setPage] = useState([0, 6, 1])
   const [pageLimit, setPageLimit] = useState(6)
   const [pageMin, setPageMin] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   return (
      <>
         <AnimatePresence>
            {catDex === true &&
               <>
                  <OpacityBackgroundFade key={"Background Fade"} onClick={onExit} />
                  <PopUpDiv
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     width={"60vw"}
                  >
                     <button onClick={() => {
                        if (currentPage > 1) {
                           setCurrentPage(currentPage - 1);
                           setPageMin(pageMin - 6);
                           setPageLimit(pageLimit - 6);
                        }
                     }}>BACK</button>
                     <PopUpGrid>
                        {catData && catData.slice(pageMin, pageLimit).map((cat, i) => {
                           return (
                              <GridItem key={cat.id}>
                                 <CatCard catData={cat} onClick={() => { setCardID(cat.id) }} />
                                 <CatDexCard catData={cat} show={cardId} onExit={() => { setCardID(0) }} />
                              </GridItem>
                           )
                        })}
                     </PopUpGrid>
                     <button onClick={() => {
                        if (currentPage < 14) {
                           setCurrentPage(currentPage + 1);
                           setPageMin(pageMin + 6);
                           setPageLimit(pageLimit + 6);
                        }
                     }}>NEXT</button>
                  </PopUpDiv>
               </>}
         </AnimatePresence>
      </>
   )
}