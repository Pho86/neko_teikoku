import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
const ImageBut = styled(Image)`
cursor:pointer;
&:hover{
   filter: drop-shadow(5px 5px 1px rgba(0, 0, 0, 0.1));
}
`

export default function IconButton({
   image,
   onClick = () => { },
   width = 100,
   height = 100,
   alt,
   hover,
   secondImage
}) {
   const [ishovering, sethovering] = useState(false);
   return <div onMouseEnter={() => { sethovering(true) }} onMouseLeave={() => { sethovering(false) }} >

      {hover ?
         <>
            {
               !ishovering ? <ImageBut src={image} width={width} height={height} onClick={onClick} alt={alt} /> : <ImageBut src={secondImage} width={width} height={height} onClick={onClick} alt={alt} />
            }
         </>
         :
         <ImageBut src={image} width={width} height={height} onClick={onClick} alt={alt} />}
   </div>

}