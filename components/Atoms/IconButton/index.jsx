import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import useSound from 'use-sound';
import { useContext } from "react";
import { userContext } from "@/pages";

const Button = styled.button`
outline:none;
border:none;
background:none;
`

const ImageBut = styled(Image)`
cursor:pointer;
transition: all .2s ease-in-out;
filter: drop-shadow(3px 3px 0px var(--border-hard));
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
&:hover{
   // filter: drop-shadow(5px 5px 1px rgba(0, 0, 0, 0.1));
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
   // const { Volume } = useContext(userContext)
   // const [sound] = useSound('/sound/bamboohit.mp3', { volume: Volume, });
   const [ishovering, sethovering] = useState(false);
   return <Button onMouseEnter={() => { sethovering(true) }} onMouseLeave={() => { sethovering(false) }} onClick={onClick} >
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