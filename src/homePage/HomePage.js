import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { getMatchData, getSummonerData } from "../utility/getData";
import { getUserInfo } from "../api/apiManager";

const HomePage = () => {

    const [username, setUsername] = useState("");

    const handleInput = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(getUserInfo(username));
        // matchData 불러오기 
        // getMatchData(username);
        // getSummonerData(username);

    };

    return (
        <Container>
            <SearchBar onSubmit={handleSubmit}>
                <Searchinput type="text" name="username" placeholder="소환사 이름" onChange={handleInput} autoComplete="off"/>
                <Link to={{
                    pathname: `/summoner/`,
                    search: `userName=${username}`,
                }}>
                <Searchbutton type="submit"><IoMdSearch size={"30px"} color="white"/></Searchbutton>
                </Link>
            </SearchBar>
        </Container>
    )
}

export default HomePage;

const Container = styled.div`
height: 70vh;
display: flex;
justify-content: center;
align-items: center;
background: #1c1c1f; // head : 31313c
`

const SearchBar = styled.form`
position: relative;
width: 624px;
margin: 0 auto;
border-radius: 10px;
background: #31313c;
`

const Searchinput = styled.input`
display: block;
width: 100%;
padding: 15px 150px 18px 17px;
background-color: #31313c;
background: #31313c;
border: none;
border-radius: 5px;
line-height: 17px;
font-size: 14px;
color: white;
box-sizing: border-box;
outline: none;
`

const Searchbutton = styled.button`
display: flex;
position: absolute;
top: 0px;
right: 0;
margin: 10px 10px 0 0;
height: 30px;
padding: 0;
border: none;
background: none;
cursor: pointer;
`