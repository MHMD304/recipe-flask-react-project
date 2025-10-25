import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Header = () => {
  return (
    <Nav>
      <Container>
        <NavList>
          <Brand>
            <BrandIcon>🍳</BrandIcon>
            RecipeBook
          </Brand>
          <NavItem>
            <StyledLink to='/'>Recipes</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to='/add-recipe'>Add Recipe</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to='/auth'>Authentication</StyledLink>
          </NavItem>
        </NavList>
      </Container>
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 1.25rem 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 4px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: -2px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: #ffffff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }

  &.active {
    color: #ffffff;
    font-weight: 600;
    
    &::after {
      width: 80%;
    }
  }
`;

const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-right: auto;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BrandIcon = styled.span`
  font-size: 1.75rem;
`;