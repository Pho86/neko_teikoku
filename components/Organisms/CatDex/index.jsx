import CatCard from "@/components/Molecules/CatCard";
import { PopUp, OpacityBackgroundFade, PopUpWithTab, Tab } from "@/components/Atoms/Popup";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
   const [maxPage, setMaxPage] = useState(1);

   useEffect(() => {
      setMaxPage(Math.round((catData.length / pageLimit)));
   }, [catData.length, pageLimit])

   return (
      <AnimatePresence>
         {catDex === true &&
            <>
               <OpacityBackgroundFade key={"CatDex Fade"} onClick={onExit} />
               <PopUpWithTab
                  title={"cat dex"}
                  onExit={onExit}
                  size={"1.2em"}
                  direction="row"
                  initial={{ y: "-100vh" }}
                  animate={{ y: "-5%" }}
                  exit={{ y: "-100vh" }}
                  transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                  exitTab
                  arrows
                  onPrevious={() => {
                     if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        setPageMin(pageMin - 6);
                        setPageLimit(pageLimit - 6);
                     }
                  }}
                  onNext={() => {
                     if (currentPage < maxPage) {
                        setCurrentPage(currentPage + 1);
                        setPageMin(pageMin + 6);
                        setPageLimit(pageLimit + 6);
                     }
                  }}
                  content={<>
                     <PopUpGrid>
                        {catData && catData.slice(pageMin, pageLimit).map((cat, i) => {
                           return (
                              <GridItem key={cat.id}>
                                 <CatCard catData={cat} onClick={() => { selectCatCard(cat.id) }} />
                              </GridItem>
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