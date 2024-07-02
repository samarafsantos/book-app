import React from "react";
import { FaChevronUp } from "react-icons/fa6";
import { scroller } from "react-scroll";
import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 67px;
  height: 67px;
  background-color: #f0ad4e;
  color: white;
  position: fixed;
  bottom: 30px;
  right: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;

export default function Back2TopButton() {
  function scrollToTop() {
    scroller.scrollTo("home", {
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }
  return (
    <ButtonContainer onClick={scrollToTop}>
      <FaChevronUp size={35} />
    </ButtonContainer>
  );
}
