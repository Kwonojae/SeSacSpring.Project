import React from "react";
import styled, { css } from "styled-components/macro";
import title from "../img/SeSAC.png";
import { Link } from "react-router-dom";

const Navigator = () => {
    return (
        <Nav>
            <Logo>
                <img src={title} alt="" width="90%"></img>
                <h1>SeSAC.GG</h1>
            </Logo>
            <NavMenu>
                <NavMenuLink>게시판</NavMenuLink>
                <NavMenuLink>챔피언 정보</NavMenuLink>

                <Login>로그인</Login>
            </NavMenu>
        </Nav>
    )
}

export default Navigator;

const Nav = styled.div`
height: 10vh;
display: flex;
justify-content: space-between;
width: 100%;
background: #31313c;
`

const Logo = styled.div`
margin-left: 100px;
position: relative;
width: 100px;
color: #fff;
display: flex;
align-items: center;
height: 100%;
cursor: pointer;
text-decoration: none;
font-family: 'Do Hyeon', sans-serif;
`
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLink = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  font-size: 30px;
  font-family: 'Do Hyeon', sans-serif;
`;

const Login = styled.div`
background: #5882FA;
color: white;
padding: 10px;
border-radius: 5px;
cursor: pointer;
margin: 1rem;
`