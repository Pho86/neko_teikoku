import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import useSound from 'use-sound';
import { useContext } from "react";
import { GameContext } from "@/pages/_app";

const Button = styled.button`
outline:none;
border:none;
background:none;
`

const ImageBut = styled(Image)`
cursor:pointer;
transition: all .2s ease-in-out;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
filter: drop-shadow(3px 3px 0px var(--border-hard));
&:hover{
   filter: drop-shadow(0px 0px 0px var(--border-hard));
   transform: ${props => props.menu || ""};
}
`
/**
 * 
 * @param {*} image expects a string of an image path
 * @param {*} alt expects a string of the image alt text
 * @param {*} hover expects a boolean value if the image changes on hover, *optional*
 * @param {*} secondImage expects a string of the second image *optional only add if using hover*
 * @returns an image button
 */
export default function IconButton({
   image,
   onClick = () => { },
   width = 100,
   height = 100,
   alt,
   hover,
   secondImage,
   type
}) {
   const { Volume } = useContext(GameContext)
   const [sound] = useSound('/sound/page.mp3', { volume: Volume-.3, });
   const [ishovering, sethovering] = useState(false);
   return <Button onMouseEnter={() => { sethovering(true) }} onMouseLeave={() => { sethovering(false) }} onClick={()=>{ onClick(); sound() }} >
      {hover ?
         <>
            {
               !ishovering ? <ImageBut src={image} width={width} height={height} alt={alt} /> : <ImageBut src={secondImage} width={width} height={height}  alt={alt} />
            }
         </>
         :
         type === "menu" ?
            <ImageBut src={image} width={width} height={height} alt={alt} menu={"rotate(-15deg)"} />
            :
            <ImageBut src={image} width={width} height={height} alt={alt} />}
   </Button>

}