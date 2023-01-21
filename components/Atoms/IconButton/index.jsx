import styled from "styled-components";
import Image from "next/image";

export default function IconButton({
   image,
   onClick = () => { },
   width = 100,
   height = 100,
   alt
}) {
   return <Image src={image} width={width} height={height} onClick={onClick} alt={alt} style={{cursor:"pointer",}}/>
}