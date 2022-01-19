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
    // API 키 사용해서 JSON 데이터 불러옴
    const Info = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=10&api_key=${api_key}`
    );

    // JSON 데이터중 원하는 데이터만 추출
    const data = {

    }

    // 추출한 데이터 반환
    return Info.data;
}

export const getMatchHistoryDetail = async (matchId) => {
    // API 키 사용해서 JSON 데이터 불러옴
    const Info = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`
    );

    // JSON 데이터중 원하는 데이터만 추출
    const data = {
        participants: Info.data.info.participants,
    }

    // 추출한 데이터 반환
    return data;
}

export const getSummonerTier = async (summonerId) => {
    // API 키 사용해서 JSON 데이터 불러옴
    try {
        const Info = await axios.get(
            `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${api_key}`
        );
        // JSON 데이터중 원하는 데이터만 추출
        const data = {
            queueType: Info.data[0].queueType,
            tier: Info.data[0].tier,
            rank: Info.data[0].rank,
            leaguePoints: Info.data[0].leaguePoints,
            winrate: Info.data[0].wins / (Info.data[0].wins + Info.data[0].losses)
        }
        // 추출한 데이터 반환
        return data;
    } catch (err) {
        return "Unranked";
    };
}