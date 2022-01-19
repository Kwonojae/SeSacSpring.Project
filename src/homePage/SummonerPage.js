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
            if (value === "er") {
                console.log("그런 데이터 없음");
            } else {
                setSummoner({ name: value.name, summonerLevel: value.summonerLevel, profileIconId: value.profileIconId });
            }
        });
    }, []); // 빈 배열 객체 두번째 인자로 줘서 useEffect를 무한루프 시키는 것을 방지

    return (
        <Container>
            {/* {   3항 연산자로 조건부 렌더링 */}
            <HeaderBox>
                {
                    summoner.name !== " "
                        ?
                        <SummonerInfo>
                            <SummonerIcon src={profileIconUrl} />
                            <SummonerName>{summoner.name}
                                <SummonerLevel>{summoner.summonerLevel}</SummonerLevel>
                            </SummonerName>
                        </SummonerInfo>
                        :
                        <SummonerInfo>
                            <NotValid>해당하는 소환사명을 가진 사용자가 존재하지 않습니다. 오타를 확인 후 다시 검색 해주세요.</NotValid>
                        </SummonerInfo>
                }
            </HeaderBox>
            <UserMatchHistory>
                
            </UserMatchHistory>
        </Container>
    )
}

export default SummonerPage;

const Container = styled.div`
background: #1c1c1f;
`

const NotValid = styled.div`
color: white;
font-size: 30px;
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
padding: 5px;
margin-top: 5px;
color: white;
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
-ms-user-select: none; 
-moz-user-select: -moz-none;
-khtml-user-select: none;
-webkit-user-select: none;
user-select: none;
`

const UserMatchHistory = styled.div`
height: 240px;
width: 100%;
`