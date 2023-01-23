import styled from "styled-components";
import Image from "next/image";

const ImageBut = styled(Image)`
cursor:pointer;
&:hover{
   filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
}
`

export default function IconButton({
   image,
   onClick = () => { },
   width = 100,
   height = 100,
   alt
}) {
   return <ImageBut src={image} width={width} height={height} onClick={onClick} alt={alt} />
}