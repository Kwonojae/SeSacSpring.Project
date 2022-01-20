import React, { useState, useEffect, } from "react";
import { useSearchParams } from 'react-router-dom';
import { getUserInfo, getMatchHistory, getMatchDetail, getSummonerTier } from "../api/apiManager";
import ShowMyGame from "./ShowGame";

import UNRANKED from '../img/ranked-emblems/Unranked.png';
import IRON from '../img/ranked-emblems/Iron.png';
import BRONZE from '../img/ranked-emblems/Bronze.png';
import SILVER from '../img/ranked-emblems/Silver.png';
import GOLD from '../img/ranked-emblems/Gold.png';
import PLATINUM from '../img/ranked-emblems/Platinum.png';
import DIAMOND from '../img/ranked-emblems/Diamond.png';
import MASTER from '../img/ranked-emblems/Master.png';
import GRANDMASTER from '../img/ranked-emblems/Grandmaster.png';
import CHALLENGER from '../img/ranked-emblems/Challenger.png';

import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { ThemeProvider } from "styled-components";

const SummonerPage = () => {

    function callTierImage(Tier) {

        const soloTier = Tier.solo.tier
        const flexTier = Tier.flex.tier

        if (soloTier === "") {
            setSoloTierIconPath(UNRANKED);
        }
        if (soloTier === "IRON") {
            setSoloTierIconPath(IRON);
        }
        if (soloTier === "BRONZE") {
            setSoloTierIconPath(BRONZE);
        }
        if (soloTier === "SILVER") {
            setSoloTierIconPath(SILVER);
        }
        if (soloTier === "GOLD") {
            setSoloTierIconPath(GOLD);
        }
        if (soloTier === "PLATINUM") {
            setSoloTierIconPath(PLATINUM);
        }
        if (soloTier === "DIAMOND") {
            setSoloTierIconPath(DIAMOND);
        }
        if (soloTier === "MASTER") {
            setSoloTierIconPath(MASTER);
        }
        if (soloTier === "GRANDMASTER") {
            setSoloTierIconPath(GRANDMASTER);
        }
        if (soloTier === "CHALLENGER") {
            setSoloTierIconPath(CHALLENGER);
        }
        // ========================================== //
        if (flexTier === "") {
            setFlexTierIconPath(UNRANKED);
        }
        if (flexTier === "IRON") {
            setFlexTierIconPath(IRON);
        }
        if (flexTier === "BRONZE") {
            setFlexTierIconPath(BRONZE);
        }
        if (flexTier === "SILVER") {
            setFlexTierIconPath(SILVER);
        }
        if (flexTier === "GOLD") {
            setFlexTierIconPath(GOLD);
        }
        if (flexTier === "PLATINUM") {
            setFlexTierIconPath(PLATINUM);
        }
        if (flexTier === "DIAMOND") {
            setFlexTierIconPath(DIAMOND);
        }
        if (flexTier === "MASTER") {
            setFlexTierIconPath(MASTER);
        }
        if (flexTier === "GRANDMASTER") {
            setFlexTierIconPath(GRANDMASTER);
        }
        if (flexTier === "CHALLENGER") {
            setFlexTierIconPath(CHALLENGER);
        }
    }

    const [searchParams] = useSearchParams();
    const [summoner, setSummoner] = useState({ name: " ", summonerId: "", summonerLevel: " ", profileIconId: " ", puuid: " " });
    const [soloTierIconPath, setSoloTierIconPath] = useState("");
    const [flexTierIconPath, setFlexTierIconPath] = useState("");
    // var resultArray = [];
    const [list, setList] = useState([]);
    // const [toJson, setToJson] = useState([]);

    const username = searchParams.get('userName');
    const profileIconUrl = `http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/${summoner.profileIconId}.png`

    // 검색된 사용자의 프로필 정보를 summoner 에 저장
    useEffect(() => {
        const data = Promise.resolve(getUserInfo(username));
        data.then((value) => {
            if (value === "er") {
                console.log("그런 데이터 없음");
            } else {
                setSummoner({ name: value.name, summonerId: value.id, summonerLevel: value.summonerLevel, profileIconId: value.profileIconId, puuid: value.puuid });
            }
        });
    }, []); // 빈 배열 객체 두번째 인자로 줘서 useEffect를 무한루프 시키는 것을 방지

    useEffect(() => {
        async function setTier() {
            const tierInfo = await getSummonerTier(summoner.summonerId);
            callTierImage(tierInfo)
        }
        setTier();
    }, [summoner.summonerId]);

    useEffect(() => {
        async function ShowGameHistory() {
        const matchIdsArray = await getMatchHistory(summoner.puuid);
        var gamedata = { gameDuration: " ", mapId: " ", player1: " ", player2: " ", player3: " ", player4: " ", player5: " ", player6: " ", player7: " ", player8: " ", player9: " ", player10: " ", };
        var resultArray = [];

        // console.log(matchIdsArray)
        matchIdsArray.forEach(element => {
            // console.log(getMatchDetail(element));
            const data = Promise.resolve(getMatchDetail(element));
            data.then(async(value) => {
                gamedata.gameDuration = value.gameDuration
                gamedata.mapId = value.mapId
                gamedata.player1 = value.participants[0]
                gamedata.player2 = value.participants[1]
                gamedata.player3 = value.participants[2]
                gamedata.player4 = value.participants[3]
                gamedata.player5 = value.participants[4]
                gamedata.player6 = value.participants[5]
                gamedata.player7 = value.participants[6]
                gamedata.player8 = value.participants[7]
                gamedata.player9 = value.participants[8]
                gamedata.player10 = value.participants[9]

                for (var i = 0; i < 10; i++) {
                    var mine = {};
                    if (summoner.summonerId === value.participants[i].summonerId) {
                        mine.gameDuration = value.gameDuration
                        mine.mapId = value.mapId
                        mine.kills = value.participants[i].kills
                        mine.deaths = value.participants[i].deaths
                        mine.assists = value.participants[i].assists
                        mine.win = value.participants[i].win
                        mine.championName = value.participants[i].championName
                        mine.summonerName = value.participants[i].summonerName
                        mine.item0 = value.participants[i].item0
                        mine.item1 = value.participants[i].item1
                        mine.item2 = value.participants[i].item2
                        mine.item3 = value.participants[i].item3
                        mine.item4 = value.participants[i].item4
                        mine.item5 = value.participants[i].item5
                        mine.item6 = value.participants[i].item6
                        mine.totalMinionsKilled = value.participants[i].totalMinionsKilled
                        mine.summoner1Id = value.participants[i].summoner1Id
                        mine.summoner2Id = value.participants[i].summoner2Id

                        // var result = JSON.stringify(mine)
                        // datas.push(result)
                        // var result = Object.values(mine)
                        resultArray.push(mine)
                    }
                }
            })
        });
        setList(resultArray)
        } ShowGameHistory();
    }, [summoner.puuid, summoner.summonerId])

    // 버튼을 눌렀을 떄 전적 갱신되게 만들기
    const onClick = async () => {
        const toJson = JSON.stringify(list)
        console.log(toJson)
    }
    // render 하는 중 NotValid(div)가 먼저 로드 되서 해당 텍스트가 보이는 것을 방지 하기 위한 load 체크용
    const isLoading = soloTierIconPath == null;
    return (
        <Container>
            <HeaderBox>
                {
                    summoner.name !== " "
                        ?
                        <SummonerInfo>
                            <SummonerIcon src={profileIconUrl} />
                            <SummonerName>{summoner.name}
                                <RenewButton onClick={onClick}>전적 갱신</RenewButton>
                            </SummonerName>
                            <SummonerLevel>{summoner.summonerLevel}</SummonerLevel>
                            {/* 티어 표시 */}
                            <WhichRank>
                                <SummonerTierIconImg src={soloTierIconPath} />
                                솔로랭크
                            </WhichRank>
                            {/* <Tier></Tier> */}

                            <WhichRank>
                                <SummonerTierIconImg src={flexTierIconPath} />
                                자유 5:5 랭크
                            </WhichRank>
                            {/* <Tier>{flexUserData.flex.tier}{flexUserData.flex.rank}</Tier> */}
                        </SummonerInfo>
                        : (
                            summoner.name !== " " && isLoading !== null
                                ?
                                <SummonerInfo>
                                    <NotValid>해당하는 소환사명을 가진 사용자는 존재하지 않습니다. 오타를 확인 후 다시 검색 해주세요.</NotValid>
                                </SummonerInfo>
                                : null
                        )
                }
            </HeaderBox>
            <UserMatchHistory>
                    {/* {
                        ok !== " "
                        ? <ShowGame>데이터 왓성</ShowGame>
                        : null
                    } */}
            </UserMatchHistory>
        </Container>
    )
}

export default SummonerPage;

const RenewButton = styled.button`
margin-top: 50px;
margin-left: 40px;
display: flex;
align-items: center;
justify-content: center;
height: 50px;
width: 100px;
border: none;
border-radius: 10%;
color: white;
background-color: #7c47e9;
cursor: pointer;
transition: 0.2s ease-in-out;
  &:hover {
    background-color: #673bc1;
  }
`

const ShowGame = styled.div`
color: white;
`

const Container = styled.div`
background: #1c1c1f;
`

const NotValid = styled.div`
color: white;
font-size: 30px;
`

const SummonerName = styled.h1`
height: 100px;
margin-left: 10px;
margin-top: 40px;
/* display: flex; */
align-items: flex-start;
font-size: 40px;
color:white;
cursor: default;
`

const SummonerLevel = styled.div`
height: 15%;
margin-left: 10px;
display: flex;
background: #eabd56;
padding: 5px;
margin-top: 45px;
color: white;
border-radius: 25% 10%;
font-size: 30px;
font-family: 'Do Hyeon', sans-serif;
cursor: default;
`

const SummonerIcon = styled.img`
height: 70%;
border-radius: 10%;
margin-top: 35px;
`

const SummonerTierIcon = styled.div`

`

const SummonerTierIconImg = styled.img`
display: flex;
height: 80%;
margin-top: 5px;
margin-bottom: 5px;

`

const WhichRank = styled.div`
margin-left: 100px;
font-family: 'Do Hyeon', sans-serif;
font-size: 25px;
color: #676663;
justify-content: center;
align-items: center;
text-align: center;
`

const Tier = styled.div`
display: flex;

font-size: 30px;
justify-content: bottom;
color:white;

`

const SummonerInfo = styled.div`
height: 240px;
display: flex;
justify-content: center;
margin-left: 200px;
margin-right: 200px;
overflow: hidden;

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
height: 2000px;
`