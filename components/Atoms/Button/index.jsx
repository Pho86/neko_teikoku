import styled from "styled-components";
import Typography from "../Text";
import Image from "next/image";
import { StrokedText } from "stroked-text";
const ButtonDiv = styled.button`
padding:${props => props.padding || "1em 2em"};
background-color:${props => props.color || "var(--button-light)"};
border: ${props => props.border || "none"};
border-radius: ${props => props.borderradius || "1.5em"};
cursor:pointer;
transition:all .1s ease-in-out;
&:hover {
    background-color:${props => props.colorhover || "var(--border-hard)"};
}
`
export default function Button({
    text,
    textcolor = "var(--white)",
    size = "1.2rem",
    weight = 800,
    border,
    borderradius,
    padding,
    color,
    colorhover,
    image,
    alt,
    onClick = () => { },
    type,
    imgwidth = 47,
    imgheight = 44
}) {
    return (
        <ButtonDiv color={color} border={border} onClick={onClick} colorhover={colorhover} padding={padding} borderradius={borderradius} type={type}>
            {text && <StrokedText fill='var(--white)' stroke={colorhover} strokeWidth={5} style={{
                fontSize: '1.5rem', fontWeight:"600"
            }}>
                {text}
            </StrokedText>}
            {image && <Image src={image} width={imgwidth} height={imgheight} alt={alt} />}
        </ButtonDiv>
    )
}

/* Yes Button */
export function test() {
    return (
        <>
            <Button text="YAH" colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"} onClick={() => { }} />

            <Button text="NAH" color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} onClick={() => { }} />
        </>

    )
}
