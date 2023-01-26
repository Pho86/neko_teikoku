import styled from "styled-components"
// import "../firebase"
const LoginForm = styled.form`
display:flex;
flex-direction:column;
width:50%;
`
export default function Login() {
    return (
        <div>
            <LoginForm>
                <label>Email</label>
                <input type="email" />
                <input type="text" />
                <input type="password" />
                <button type="submit">SUBMIT</button>
            </LoginForm>
        </div>
    )
}