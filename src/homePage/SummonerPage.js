import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getUserInfo } from "../api/apiManager";

import styled from "styled-components";

const SummonerPage = () => {

    const [searchParams] = useSearchParams();
    const [summoner, setSummoner] = useState({ name: " ", summonerLevel: " ", profileIconId: " " });
    const username = searchParams.get('userName');
    const profileIconUrl = `http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/${summoner.profileIconId}.png`

    // 검색된 사용자의 프로필 정보를 summoner 에 저장
    useEffect(() => {
        const data = Promise.resolve(getUserInfo(username));
        data.then((value) => {
            setSummoner({ name: value.name, summonerLevel: value.summonerLevel, profileIconId: value.profileIconId });
        });
    });

    return (
        <Container>
            <HeaderBox>
                <SummonerInfo>
                    <SummonerIcon src={profileIconUrl} />
                    <SummonerName>{summoner.name}
                        <SummonerLevel>{summoner.summonerLevel}</SummonerLevel>
                    </SummonerName>
                </SummonerInfo>
            </HeaderBox>
            <UserMatchHistory>
                {/* TODO 용운 파트 */}
            </UserMatchHistory>
        </Container>
    )
}

export default SummonerPage;

const Container = styled.div`
background: #1c1c1f;
`

const SummonerName = styled.h1`
height: 60%;
margin-left: 10px;
display: flex;
align-items: flex-start;
font-size: 40px;
color:white;
cursor: default;
`

const SummonerLevel = styled.div`
margin-left: 10px;
display: flex;
background: #eabd56;
color: white;
padding: 5px;
border-radius: 25% 10%;
font-size: 30px;
font-family: 'Do Hyeon', sans-serif;
cursor: default;
`

const SummonerIcon = styled.img`
height: 70%;
border-radius: 10%;
`

const SummonerInfo = styled.div`
height: 240px;
display: flex;
align-items: center;
margin-left: 200px;
`

const HeaderBox = styled.div`
height: 240px;
width: 100%;
background: #31313c;
`

const UserMatchHistory = styled.div`
height: 240px;
width: 100%;
`