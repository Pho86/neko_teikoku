import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from 'framer-motion';
import { EmptySpace } from "@/components/Atoms/EmptySpacer";
import Image from "next/image";
import { OpacityBackgroundFade, PopUp } from "@/components/Atoms/Popup";

const CatDexCardTitle = styled.div`
background-color:#B4B0E3;
display:flex;
justify-content:space-between;
padding:1em 2em;
border-radius:2em;
box-shadow: 0px 4px 2px 0px #D9D9D9;
width:95%;
color:white;
`
const CatDexCardDiv = styled(PopUp)`
`
const CatDexCardHead = styled.div`
text-shadow: -1px -1px 0 #4D4699, 1px -1px 0 #4D4699, -1px 1px 0 #4D4699, 1px 1px 0 #4D4699;
`
const CatDexCardContent = styled.div`
display:grid;
grid-template-columns:45% 55%;
@media (max-width: 1280px) {
   display:grid;
   grid-template-columns:1fr;
}
`
const CatDexImage = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const CatDexCardText = styled.div`
display:flex;
flex-direction:column;
gap:2em;
`
const CatDexCardContentText = styled.div`
background-color:white;
padding:1em 1.5em;
border-radius:1.5em;
text-align:center;
border-bottom: 4px solid var(--accent);
`
const CatDexCardContentDescription = styled(CatDexCardContentText)`
text-align:left;
`
const CatDexCardTab = styled.div`
position:absolute;
width:125px;
height:50px;
border-radius: 1.5em 1.5em 0 0;
background-color:var(--border);
z-index:55;
display:flex;
justify-content:center;
align-items:center;
`
export default function CatDexCard({
   catData,
   show,
   onExit = () => { },
}) {
   return (
      <>
         <AnimatePresence>


            {catData.id === show && <>
               <OpacityBackgroundFade onClick={onExit} />
               {/* <CatDexCardTab>
                  <Typography
                     text="cat dex"
                     color="var(--white)"
                     weight="500" />
               </CatDexCardTab> */}
               <CatDexCardDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  width={"65%"}
               >
                  <CatDexCardTitle>
                     <Typography
                        text={`no. ${catData.id}`}
                     />
                     <CatDexCardHead>
                        <Typography
                           text={catData.breedName}
                           weight={"bold"}
                           size={"1.2em"}
                        />
                     </CatDexCardHead>
                     <EmptySpace axis={"horizontal"} size={30} />
                  </CatDexCardTitle>
                  <EmptySpace axis={"vertical"} size={35} />
                  <CatDexCardContent>
                     <CatDexImage>
                        <Image src={`${catData.imgThumb}`} width={300} height={300} alt="cat" style={{ borderRadius: "50%", textAlign: "center" }} />
                     </CatDexImage>
                     <CatDexCardText>
                        <div>
                           <Typography
                              text={"Cat Breed"}
                              size={"1.2em"}
                              padding={"0 0 0 .5em"}
                              color={"var(--secondary-accent)"}
                           />
                           <CatDexCardContentText>
                              <Typography
                                 text={catData.breedName}
                                 size={"1.2em"}
                              />
                           </CatDexCardContentText>
                        </div>
                        <div>
                           <Typography
                              text={"Native Country"}
                              size={"1.2em"}
                              padding={"0 0 0 .5em"}
                              color={"var(--secondary-accent)"}
                           />
                           <CatDexCardContentText>
                              <Typography
                                 text={catData.origin}
                                 size={"1.2em"}
                              />
                           </CatDexCardContentText>
                        </div>
                        <div>
                           <Typography
                              text={"Description"}
                              size={"1.2em"}
                              padding={"0 0 0 .5em"}
                              color={"var(--secondary-accent)"}
                           />
                           <CatDexCardContentDescription>
                              <Typography
                                 text={catData.breedDescription}
                                 size={"1em"}
                              />
                           </CatDexCardContentDescription>
                        </div>
                     </CatDexCardText>
                  </CatDexCardContent>
               </CatDexCardDiv>
            </>
            }
         </AnimatePresence>
      </>
   )
}