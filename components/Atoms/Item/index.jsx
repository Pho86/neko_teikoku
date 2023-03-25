import { m } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

const ItemArea = styled.div`
position:absolute;
// width:100vw;
// height:100vh;
pointer-events:none;
`

const ItemImgArea = styled(m.div)`
pointer-events:auto;
position:relative;
cursor:pointer;
`

const ItemImage = styled(Image)`
pointer-events:none;

`
export default function Item({
    image,
    alt
}) {

    return (
        <>
            <ItemArea>
                <ItemImgArea
                    drag
                    dragMomentum={false}
                    transition={{ duration: .2 }}
                    whileHover={{
                        scale: 1.15,
                        transition: { duration: .15 },
                    }}>
                    <ItemImage src={image} height={150} width={150} alt={alt} />
                </ItemImgArea>
            </ItemArea>
        </>
    )
}