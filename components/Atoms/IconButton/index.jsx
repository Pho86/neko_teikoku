import styled from "styled-components";
import Image from "next/image";

export default function IconButton({
   image,
   onClick = () => { },
}) {
   return <Image src={image} width={100} height={100} onClick={onClick} />
}