import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getMatchHistory, getMatchHistoryDetail, getUserInfo } from "../api/apiManager";
import styled from "styled-components";

const SummonerPage = () => {

    const [searchParams] = useSearchParams();
    const username = searchParams.get('userName');

    return (
        <Container>
            <h1>{username}</h1>
        </Container>
    )

}

export default SummonerPage;

const Container = styled.div`

`