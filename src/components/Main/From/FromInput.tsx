import React from 'react'
import styled from "styled-components";
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 35px;
  padding: 0px;
  display: block;
  color: "palevioletred";
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid #757575;
  border-radius: 3px;
  width: 90%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  appearance: textfield;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 25px;
  }
  :-ms-input-placeholder {
    font-size: 25px;
  }
`;
function FromInput() {
  return (
    <StyledInput placeholder="Please enter your coin balance" />
  )
}

export default FromInput