import styled from "styled-components";
import Image from "next/image";
import { StrokedText } from "stroked-text";
import useSound from 'use-sound';
import { useContext } from "react";
import { GameContext } from "@/pages/_app";
import { userContext } from "@/pages";
const ButtonDiv = styled.button`
padding:${props => props.padding || "1em 2em"};
background-color:${props => props.color || "var(--button-light)"};
width: ${props => props.width || "inherit"};
border: ${props => props.border || "none"};
border-radius: ${props => props.borderradius || "1.5em"};
cursor:pointer;
transition:all .15s ease-in-out;
&:hover {
    background-color:${props => props.colorhover || "var(--border-hard)"};
}
`
/**
 * @desc a button component
 * @param {*} text expects a string, this is the text of your button *optional*
 * @param {*} image expects the url of an image, this is a replacement for text *optional*
 * @param {*} alt if using an image, add alt text, expects a string *optional*
 * @param {*} color expects a string of a color, use a css variable, color of the button
 * @param {*} textcolor expects a string of a color, use a css variable, color of the button's text
 * @param {*} type expects a button type ex. submit | button | undefined *optional*
 * @returns a button component
 */
export default function Button({
    text,
    textcolor = "var(--white)",
    size = "1.5rem",
    weight = 600,
    border,
    borderradius,
    padding,
    color,
    colorhover,
    image,
    alt,
    onClick = () => { },
    type,
    imgwidth = 37,
    imgheight = 33,
    width,
    id
}) {
    const { Volume } = useContext(GameContext )
    const [sound] = useSound('/sound/bamboohit.mp3', { volume: Volume, });

    return (
        <ButtonDiv color={color} border={border} onClick={() => { onClick(); sound() }} colorhover={colorhover} padding={padding} borderradius={borderradius} type={type} width={width} id={id}>
            {text && <StrokedText fill={textcolor} stroke={colorhover} strokeWidth={5} style={{
                fontSize: size, fontWeight: weight
            }} >

                {text}
            </StrokedText>}
            {image && <Image src={image} width={imgwidth} height={imgheight} alt={alt} />}
        </ButtonDiv>
    )
}
