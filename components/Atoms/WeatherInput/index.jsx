import styled from "styled-components";
import Button from "../Button";
import { useState } from "react";
const Input = styled.input`
padding:1em;
background-color:var(--primary);
border-radius:1.3em;
border: 3px solid var(--border);
pointer-events:auto;
width:100%;
outline:none;
::placeholder,
::-webkit-input-placeholder {
  color: var(--border-hard);
  font-weight: 500;
}
:-ms-input-placeholder {
    color: var(--border-hard);
    font-weight: 500;
}
`
const WeatherForm = styled.form`
display:flex;
pointer-events:auto;
gap: .5em;
`
const WeatherButton = styled(Button)`
`
export default function WeatherInput({
    onSubmit,
    onWeatherChange = () => { },
}) {
    const [location, setLocation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(location)
        setLocation('')
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
                <WeatherButton type="submit" text="GO!" colorhover="var(--border)" border="4px solid var(--border)" borderradius={"2.2em"} padding={"0.3em 2em"} />
            </WeatherForm>
        </>
    )
}