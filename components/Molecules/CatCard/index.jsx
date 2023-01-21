import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from 'next/image';

const CatCardDiv = styled.div`
background-color:var(--secondary);
padding:1.2em 2em;
display:flex;
justify-content:space-between;
border-radius:1em;
min-width:325px;
cursor:pointer;
transition:all .1s ease-in-out;
&:hover {
   box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
}

`
const CatTextDiv = styled.div`
display:flex;
flex-direction:column;
gap:.5em;
text-align:left;
`
export default function CatCard({
   catData,
   onClick = () => { },
}) {
   return (
      <>
         <CatCardDiv onClick={onClick}>
            <CatTextDiv>
               <Typography
                  text={`no. ${catData.id}`}
               />
               <Typography
                  text={catData.breedName}
                  weight={"bold"}
                  size={"1.2em"}
               />
            </CatTextDiv>
            <Image src={`${catData.imgThumb}`} width={50} height={50} alt="cat" style={{ borderRadius: 50 }} />
         </CatCardDiv>
      </>
   )
}