import axios from "axios";
import { api_key } from "../config/api_key";

export const getUserInfo = async (summonerName) => {
    // API 키 사용해서 JSON 데이터 불러옴
    try {
        const Info = await axios.get(
            `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`
        )
        // JSON 데이터중 원하는 데이터만 추출
        const data = {
            name: Info.data.name,
            summonerLevel: Info.data.summonerLevel,
            id: Info.data.id,
            puuid: Info.data.puuid,
            profileIconId: Info.data.profileIconId,
        }
        // 추출한 데이터 반환
        return data;
    } catch (err) {
        return "er";
    };
}

export const getMatchHistory = async (summonerPuuid) => {
    const Info = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=10&api_key=${api_key}`
    );
    return Info.data;
}

export const getMatchDetail = async (matchId) => {
    const Info = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`
    );

    // mapId 11 협곡 12 칼바람
    const data = {
        gameDuration: Info.data.info.gameDuration,
        mapId: Info.data.info.mapId,
        participants: Info.data.info.participants,
    }
    return data;
}

export const getSummonerTier = async (summonerId) => {
    // API 키 사용해서 JSON 데이터 불러옴
    try {
        const Info = await axios.get(
            `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${api_key}`
        );
        const data = {
            solo: {
                queueType: "",
                tier: "",
                rank: "",
                leaguePoints: 0,
                wins: 0,
                losses: 0,
                winrate: 0.0
            },
            flex: {
                queueType: "",
                tier: "",
                rank: "",
                leaguePoints: 0,
                wins: 0,
                losses: 0,
                winrate: 0.0
            }
        };
        // JSON 데이터중 원하는 데이터만 추출
        Info.data.forEach(element => {
            if ("RANKED_FLEX_SR" === element.queueType) {
                data.flex.queueType = element.queueType;
                data.flex.tier = element.tier;
                data.flex.rank = element.rank;
                data.flex.leaguePoints = element.leaguePoints;
                data.flex.wins = element.wins;
                data.flex.losses = element.losses;
                data.flex.winrate = element.wins / (element.wins + element.losses);
            }
            else if ("RANKED_SOLO_5x5" === element.queueType) {
                data.solo.queueType = element.queueType;
                data.solo.tier = element.tier;
                data.solo.rank = element.rank;
                data.solo.leaguePoints = element.leaguePoints;
                data.solo.wins = element.wins;
                data.solo.losses = element.losses;
                data.solo.winrate =  element.wins / (element.wins + element.losses);
            }
        });
        return data;
    } catch (err) {
        return "Unranked";
    };
}