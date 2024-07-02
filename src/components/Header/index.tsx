import React from "react";
import styled from "styled-components";
import { GrBook } from "react-icons/gr";
import { Link } from "react-scroll/modules";

const Container = styled.header`
  height: 70px;
  background-color: #f4f4f4;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  align-items: center;
  padding-left: 32px;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: start;
  line-height: 70px;
  margin-left: 8px;
`;

const Menu = styled.nav`
  margin-left: auto;
  margin-right: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuItem = styled(Link)`
  font-size: 16px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

export const Header = () => {
  return (
    <Container id="home">
      <Flex>
        <GrBook size={32} color="#333" />
        <Text>Library</Text>
      </Flex>

      <Flex>
        <Menu>
          <MenuItem
            className="nav-link"
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Home
          </MenuItem>
          <MenuItem
            className="nav-link"
            activeClass="active"
            to="publisher"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Busca por Editora
          </MenuItem>
          <MenuItem
            className="nav-link"
            activeClass="active"
            to="genre"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Busca por Gênero
          </MenuItem>
          <MenuItem
            className="nav-link"
            activeClass="active"
            to="author"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Busca por Autor(a)
          </MenuItem>
          <MenuItem
            className="nav-link"
            activeClass="active"
            to="writer-genre"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Escritores por gênero
          </MenuItem>
          <MenuItem
            className="nav-link"
            activeClass="active"
            to="rating-genre"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Avaliações por gênero
          </MenuItem>
        </Menu>
      </Flex>
    </Container>
  );
};
