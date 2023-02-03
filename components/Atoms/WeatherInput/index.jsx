import styled from "styled-components";
import Button from "../Button";
import { useState } from "react";
const Input = styled.input`
padding:1em;
background-color:var(--primary);
border-radius:1em;
border: 3px solid var(--border);
pointer-events:auto;
width:100%;
outline:none;
::placeholder,
::-webkit-input-placeholder {
  color: var(--border-hard);
  font-weight: 700;
}
:-ms-input-placeholder {
    color: var(--border-hard);
    font-weight: 700;
}
`
const WeatherForm = styled.form`
display:flex;
pointer-events:auto;
`
const WeatherButton = styled(Button)`
// position:absolute;
`
export default function WeatherInput({
    onSubmit,
    onWeatherChange = () => { },
}) {
    const [location, setLocation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('x')
        onSubmit(location)
    }

    const handleWeatherChange = (value) => {
        setLocation(value.target.value)
        onWeatherChange?.(value)
    }
    return (
        <>
            <WeatherForm onSubmit={handleSubmit}>
                <Input onChange={handleWeatherChange} value={location} placeholder="change location..." name="location">
                </Input>
                <WeatherButton type="submit" text="GO!" colorhover="var(--border)" border="6px solid var(--border)" borderradius={"2.2em"} padding={"1em 3em"} />
            </WeatherForm>
        </>
    )
}