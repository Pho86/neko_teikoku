import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ItemCard from "@/components/Atoms/ItemCard";
import Typography from "@/components/Atoms/Text";
import { useState, useContext } from "react";
import { SliderTab } from "@/components/Atoms/Slider";
import { userContext } from "@/pages";
import { GameContext } from "@/pages/_app";
import useSound from "use-sound";

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
export default function ItemsSlider({
   active,
   onExit = () => { },
   onActiveClick = (item) => { return item },
}) {
   const { currentItems, currentOfferings } = useContext(userContext)
   const [pageLimit, setPageLimit] = useState(6)
   const [pageMin, setPageMin] = useState(0)
   const [currentPage, setCurrentPage] = useState(1);
   const [tab, setTab] = useState(true);
   const [maxPage, setMaxPage] = useState(1);

   const { Volume } = useContext(GameContext);
   const [sound] = useSound('/sound/bamboohit.mp3', { volume: Volume, });

   
   return (
      <AnimatePresence>
         {active &&
            <SliderTab
               initial={{ y: "50vh" }}
               animate={{ y: 10 }}
               exit={{ y: "50vh" }}
               transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
               tab={"items"}
               secondtab={"ingredients"}
               onExit={onExit}
               tabcolor={tab}
               onTab={() => { setTab(true); setCurrentPage(1); setPageMin(0); setPageLimit(6) }}
               onSecondTab={() => { setTab(false); setCurrentPage(1); setPageMin(0); setPageLimit(6); }}
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
                  <Grid>
                     {tab
                        ?
                        <>
                           {
                              currentItems.slice(pageMin, pageLimit).map((item, i) => {
                                 return <GridItem key={i} onClick={() => { onActiveClick(item); }}>
                                    <ItemCard image={item.image} alt={item.name} />
                                    <Typography text={`x${item.count ? item.count : 0}`} weight={"400"} size={".9rem"} />
                                    <Typography text={item.name} weight={"500"} size={"1.2rem"} />
                                 </GridItem>
                              })
                           }
                        </>
                        :
                        currentOfferings.slice(pageMin, pageLimit).map((item, i) => {
                           return <GridItem key={i}>
                              <ItemCard image={item.image} alt={item.name} />
                              <Typography text={`x${item.count ? item.count : 0}`} weight={"400"} size={".9rem"} />
                              <Typography text={item.name} weight={"500"} size={"1.2rem"} />
                           </GridItem>
                        })
                     }
                  </Grid>
               </>}
            >

            </SliderTab>
         }
      </AnimatePresence>
   )
}