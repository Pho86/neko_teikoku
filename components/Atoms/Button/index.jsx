import styled from "styled-components";
import Typography from "../Text";
import Image from "next/image";
const ButtonDiv = styled.button`
padding:1em 2em;
background-color:${props => props.color || "var(--button-light)"};
border: ${props => props.border || "none"};
border-radius: 1.5em;
cursor:pointer;
transition:all .1s ease-in-out;
&:hover {
    background-color:${props => props.colorhover || "var(--button-hard)"};
}
`
export default function Button({
    text,
    textcolor,
    border,
    color,
    colorhover,
    image,
    alt,
    onClick = () => { },
}) {
    return (
        <ButtonDiv color={color} border={border} onClick={onClick} colorhover={colorhover}>
            {text && <Typography text={text} />}
            {image && <Image src={image} width={47} height={44} alt={alt} />}
        </ButtonDiv>
    )
}