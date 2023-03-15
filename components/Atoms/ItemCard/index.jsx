import styled from "styled-components";
import Image from "next/image";

const ImageBut = styled(Image)`
cursor:pointer;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
&:hover{
   filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.2));
}
`
const Button = styled.button`
outline:none;
border:none;
background:none;
`
export default function ItemCard({
   image,
   onClick = () => { },
   width = 125,
   height = 125,
   alt
}) {
   return <Button>
      <ImageBut src={image} width={width} height={height} onClick={onClick} alt={alt} />
   </Button>
}