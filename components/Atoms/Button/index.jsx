import styled from "styled-components";
import Typography from "../Text";
import Image from "next/image";
const ButtonDiv = styled.button`
padding:1em 2em;
background-color:${props => props.color || "red"};
border: ${props => props.border || "none"};
border-radius: 1.5em;
cursor:pointer;
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
        <ButtonDiv color={color} border={border} onClick={onClick}>
            {text && <Typography text={text} />}
            {image && <Image src={image} width={47} height={44} alt={alt} />}
        </ButtonDiv>
    )
}