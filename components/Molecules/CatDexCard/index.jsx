import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from 'framer-motion';
import { EmptySpace } from "@/components/Atoms/EmptySpacer";
import Image from "next/image";
import { OpacityBackgroundFade, PopUp as CatDexCardDiv } from "@/components/Atoms/Popup";

const CatDexCardTitle = styled.div`
background-color:white;
display:flex;
justify-content:space-between;
padding:1em 2em;
border-radius:2em;
box-shadow: 4px 8px 4px 0px #D9D9D9;
width:95%;
`
const CatDexCardContent = styled.div`
display:grid;
grid-template-columns:45% 55%;
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
background-color:#D9D9D9;
padding:1em 1.5em;
border-radius:2em;
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
               <CatDexCardDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  width={"100%"}
               >
                  <CatDexCardTitle>
                     <Typography
                        text={`no. ${catData.id}`}
                     />
                     <Typography
                        text={catData.breedName}
                        weight={"bold"}
                        size={"1.2em"}
                     />
                     <EmptySpace axis={"horizontal"} size={30} />
                  </CatDexCardTitle>
                  <EmptySpace axis={"vertical"} size={35}/>
                  <CatDexCardContent>
                     <CatDexImage>
                        <Image src={`${catData.imgThumb}`} width={300} height={300} alt="cat" style={{ borderRadius: "50%", textAlign: "center" }} />
                     </CatDexImage>
                     <CatDexCardText>
                        <div>
                           <Typography
                              text={"Cat Breed"}
                              weight={"bold"}
                              size={"1.2em"}
                           />
                           <CatDexCardContentText>
                              <Typography
                                 text={catData.breedName}
                                 size={"1"}
                              />
                           </CatDexCardContentText>
                        </div>
                        <div>
                           <Typography
                              text={"Native Country"}
                              weight={"bold"}
                              size={"1.2em"}
                           />
                           <CatDexCardContentText>
                              <Typography
                                 text={catData.origin}
                                 size={"1"}
                              />
                           </CatDexCardContentText>
                        </div>
                        <div>
                           <Typography
                              text={"Cat Breed"}
                              weight={"bold"}
                              size={"1.2em"}
                           />
                           <CatDexCardContentText>
                              <Typography
                                 text={catData.breedDescription}
                                 size={"1"}
                              />
                           </CatDexCardContentText>
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