import {
  getMatchHistory,
  getMatchHistoryDetail,
  getUserInfo,
} from "../api/apiManager";

// 유저 Info 불러오는 함수인데 막상 불려가면 다시 promise 걸리네 ㅋㅋㅋㅋㅋ 젠장
export async function getSummonerData(username){
  const data = Promise.resolve(getUserInfo(username));
  data.then((value)=>{
    summoner.name = value.name;
    summoner.summonerLevel = value.summonerLevel;
    summoner.profileIconId = value.profileIconId;
  });
  const summoner = {...data};
  return summoner;
}

// 게임 데이터 10개 불러오는 함수
export async function getMatchData(username) {
  var id = null;
  const matchHistoryDetails = new Array();

  // username 통해서 puuid 가져오기
  id = (await getUserInfo(username)).puuid;

  // puuid 통해서 matchId 10개 가져오기
  const matchIdsArray = await Promise.resolve(getMatchHistory(id));

  // matchId 통해서 게임 기록 정보 가져오기
  matchIdsArray.forEach((matchId)=>{
    const data = Promise.resolve(getMatchHistoryDetail(matchId));
    data.then((value)=>{
      matchHistoryDetails.push(value);
    })
  });

  console.log(matchHistoryDetails);
}

export function getAll(matchHistoryDetails, forWhat) {

}
