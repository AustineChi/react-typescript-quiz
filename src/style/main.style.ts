
import styled from "styled-components";

type ButtonInterfface = {
    start: boolean;
};

export const Container = styled.div`
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ff8c00;
    color: #fff
`;

export const Button = styled.button<ButtonInterfface>`
    background-color:  ${({ start }) => (start ? "#5eba7d" : "#fff6bb")}; 
    color: #333;
    border-radius: 15px;
    border: none;
    font-weight: 700;
    text-align: center;
    margin: 10px auto;
    padding: 7px;
    min-width: 200px;
    outline: none
`

export const QuestionWrapper = styled.div`
    width: 400px;
    margin: 0 auto;
    padding: 0 16px;
`;

export const Title = styled.h1`
    color: #e0b115;
    background: #000;
    padding: 0 30px;
`