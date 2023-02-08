import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from 'next/image';

const CatCardDiv = styled.div`
background-color:var(--white);
padding:1em 1.5em 1.4em 1.5em;
display:flex;
justify-content:space-between;
border-radius:1.2em;
min-width:285px;
cursor:pointer;
transition:all .1s ease-in-out;
border: 3px solid var(--border-hard);
border-bottom: 9px solid var(--border-hard);
&:hover {
   background-color:var(--primary);
}
`
const CatTextDiv = styled.div`
display:flex;
flex-direction:column;
gap:.5em;
text-align:left;
`
const CatCardHighlight = styled.div`
position: absolute;
width: 265px;
height: 10px;
transform:translate(-17.5px, 60px);
border-radius: 0px 0px 1.2em 1.2em;
background-color: var(--light-accent);
`
export default function CatCard({
   catData,
   onClick = () => { },
}) {
   return (
      <CatCardDiv onClick={onClick}>
         <CatTextDiv>
            <Typography
               text={`no. ${catData.id}`}
               color={"var(--secondary-accent)"}
               weight={"500"}
            />
            <Typography
               text={catData.breedName}
               weight={"500"}
               size={"1.2rem"}
            />
         </CatTextDiv>
         <Image src={`${catData.imgThumb}`} width={50} height={50} alt="cat" style={{ borderRadius: 50 }} />
         <CatCardHighlight />
      </CatCardDiv>
   )
}