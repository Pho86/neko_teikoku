import styled from "styled-components";
import Image from "next/image";

const TreatArea = styled.div`
position:absolute;
pointer-events:none;
`

const TreatImage = styled(Image)`
pointer-events:none;
transform:translate(10vw, 8vh);
`
export default function Treats({
    image,
    alt
}) {

    return (
        <>
            <TreatArea>
                <TreatImage src={image} height={150} width={150} alt={alt} />
            </TreatArea >
        </>
    )
}