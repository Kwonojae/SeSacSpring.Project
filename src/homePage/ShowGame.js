
import React, { useState, useEffect } from "react";
import styled from "styled-components";

function ShowMyGame(gamedata){
    return(
        <div>
            {gamedata.map((myGame)=>(
                <div key={myGame.kills}></div>
            ))}
        </div>
    )
}

export default ShowMyGame;