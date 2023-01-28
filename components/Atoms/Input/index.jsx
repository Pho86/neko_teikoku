import styled from "styled-components";

const InputCont = styled.input`
padding:2em;
border-radius:2em;
`
export default function Input({
    value,
    onChange,
    placeholder,
    type,
    name
}) {
    return (
        <InputCont onChange={onChange} type={type} placeholder={placeholder} value={value} name={name}>

        </InputCont>
    )
}