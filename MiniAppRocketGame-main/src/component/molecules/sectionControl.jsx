import React, { useState, useContext, useRef, useEffect } from "react";
import SwitchButton from "../atom/switchButtton";
import InputNumber from "../../component1/InputNumber";
import AppContext from "../../component1/AppContext";
import Game from '../../component1/Game.jsx'
import { useCookies } from 'react-cookie';
import DropDown from "../../component1/DropDown";
import '../../css_generated/DropDown.css';
import "../../css_generated/Style.css";
import PannelScore from "../atom/PannelScore";
import { Img } from "../../assets/image";
import { avatar } from "../../assets/avatar"

const SectionControl = () => {
  const context = useContext(AppContext);
  const cookiesData = useCookies(['user_id', 'session']);
  const [cookies] = !context.ssrFlag ? cookiesData : [context.cookies];

  const modalRef = useRef();
  
  // State variables
  const [stopWasPressed, setStopWasPressed] = useState(false);
  const [realGame, setRealGame] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [gamePhase, setGamePhase] = useState();
  const [bet, setBet] = useState(1);
  const [autoStop, setAutoStop] = useState(20);
  const [finalResult, setFinalResult] = useState(0);
  const [historyGames, setHistoryGames] = useState([]);
  const [balance, setBalance] = useState(10);
  const [rank, setRank] = useState(1);
  const [expiration, setExpiration] = useState(0);
  const [loaderIsShown, setLoaderIsShown] = useState(!!cookies.name);
  const [operationAfterWin, setOperationAfterWin] = useState('Return to base Bet');
  const [valueAfterWin, setValueAfterWin] = useState(1);
  const [operationAfterLoss, setOperationAfterLoss] = useState('Increase Bet by');
  const [valueAfterLoss, setValueAfterLoss] = useState(2);
  const [games, setGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  // Refs for mutable state
  const balanceRef = useRef(balance);
  const historyGamesRef = useRef(historyGames);
  const betRef = useRef(bet);
  const operationAfterWinRef = useRef(operationAfterWin);
  const valueAfterWinRef = useRef(valueAfterWin);
  const operationAfterLossRef = useRef(operationAfterLoss);
  const valueAfterLossRef = useRef(valueAfterLoss);

  // Effect to validate and adjust state values
  useEffect(() => {
    if (bet < 1 || balance === '0.00' || balance < 1) {
      setBet(1);
    } else if (bet > balance && balance !== '0.00') {
      setBet(balance);
    }

    setAutoStop(prev => Math.min(Math.max(prev, 1.01), 100));
    setBalance(prev => prev === 0 ? '0.00' : prev);
    setValueAfterWin(prev => Math.min(Math.max(prev, 1), 100));
    setValueAfterLoss(prev => Math.min(Math.max(prev, 1), 100));
  }, [bet, autoStop, balance, valueAfterLoss, valueAfterWin]);

  // Effect to update refs
  useEffect(() => {
    operationAfterWinRef.current = operationAfterWin;
    valueAfterWinRef.current = valueAfterWin;
    operationAfterLossRef.current = operationAfterLoss;
    valueAfterLossRef.current = valueAfterLoss;
  }, [operationAfterWin, valueAfterWin, operationAfterLoss, valueAfterLoss]);

  // Effect to fetch user data
  useEffect(() => {
    let isMounted = true;
    // if (cookies.name) {
    //   const headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   fetch('/users_info', { method: 'POST', body: JSON.stringify({ historySize: 100 }), headers })
    //     .then(res => Promise.all([res.status, res.json()]))
    //     .then(([status, data]) => {
    //       if (isMounted) {
    //         try {
    //           const myData = data.allUsersData
    //             .sort((a, b) => b.balance.real - a.balance.real)
    //             .map((user, index) => ({ ...user, rank: index + 1 }))
    //             .find(user => user.name === cookies.name);

    //           if (myData) {
    //             setGames(realGame ? myData.realGames : myData.virtualGames);
    //             setWins(realGame ? myData.realWins : myData.virtualWins);
    //             setLosses(realGame ? myData.realLosses : myData.virtualLosses);
    //             const newHistoryGames = realGame ? myData.gamesHistory.real : myData.gamesHistory.virtual;
    //             historyGamesRef.current = newHistoryGames;
    //             setHistoryGames(newHistoryGames);
    //             const newBalance = realGame ? parseFloat(myData.balance.real).toFixed(2) : parseFloat(myData.balance.virtual).toFixed(2);
    //             balanceRef.current = newBalance;
    //             setBalance(newBalance);
    //             setRank(myData.rank);
    //             setExpiration(myData.expiration);
    //             setLoaderIsShown(false);
    //           }
    //         } catch (e) {
    //           document.location.reload();
    //         }
    //       }
    //     });
    // }
    // return () => { isMounted = false; };
    return () => {
      isMounted = true;
    }
  }, [realGame, cookies.name]);

  // Effect to clean up on component unmount
  // useEffect(() => () => { context.overlayRef.current.style.display = 'none'; }, []);

  // Function to get free bets
  // const getFreeBets = () => {
  //   if (!cookies.name) {
  //     modalRef.current.style.display = 'block';
  //     context.overlayRef.current.style.display = 'block';
  //   } else if (!realGame && (balance === '0.00' || balance < 1) && (expiration < new Date().getTime())) {
  //     context.socket.send(JSON.stringify({ operation: 'get_free_bets', userID: cookies.user_id }));
  //   }
  // };

  // Function to stop the game
  const stopGame = () => {
    setStopWasPressed(true);
    // context.socket.send(JSON.stringify({ operation: 'stop' }));
    handleGameStopped()
  };

  // Function to start the game
  const startGame = () => {
    setStopWasPressed(false);
    // context.socket.send(JSON.stringify({
    //   operation: 'start',
    //   bet,
    //   autoStop,
    //   isReal: realGame,
    //   userID: cookies.user_id,
    //   session: cookies.session,
    // }));

    // context.socket.onmessage = async e => {
    //   const data = JSON.parse(e.data);
    //   switch (data.operation) {
    //     case 'started':
    //       handleGameStarted();
    //       break;
    //     case 'stopped':
    //       handleGameStopped(data);
    //       break;
    //     case 'crashed':
    //       handleGameCrashed(data);
    //       break;
    //     case 'free_bets':
    //       handleFreeBets(data);
    //       break;
    //     default:
    //       break;
    //   }
    // };
    handleGameStarted();
  };

  const handleGameStarted = () => {
    // const starsElement = document.getElementById('stars');
    // const animation = starsElement.style.animation;
    const animation = "none";
    // starsElement.style.animation = 'none';
    setTimeout(() => {
      setFinalResult(0);
      setGamePhase('started');
      // starsElement.style.animation = animation;
    }, 50);
  };

  const handleGameStopped = (data) => {
    setFinalResult(data.stop);
    setGamePhase('stopped');
    updateGameHistory(data, 'stopped');
    updateBalance(data.profit);
    setGames(games + 1);
    setWins(wins + 1);
    adjustBetAfterWin();
  };

  const handleGameCrashed = (data) => {
    setFinalResult('Crashed...');
    setGamePhase('crashed');
    updateGameHistory(data, 'crashed');
    updateBalance(data.profit);
    setGames(games + 1);
    setLosses(losses + 1);
    adjustBetAfterLoss();
  };

  const handleFreeBets = (data) => {
    setExpiration(data.expiration);
    const newBalance = parseFloat(balanceRef.current) + 3;
    balanceRef.current = newBalance;
    setBalance(newBalance);
  };

  const updateGameHistory = (data, status) => {
    const newHistory = [{
      crash: status === 'crashed' ? data.crash : 'x',
      bet: data.bet,
      stop: status === 'stopped' ? data.stop : 'x',
      profit: data.profit,
    }, ...historyGamesRef.current];
    setHistoryGames(newHistory);
    historyGamesRef.current = newHistory;
  };

  const updateBalance = (profit) => {
    const newBalance = (parseFloat(balanceRef.current) + parseFloat(profit)).toFixed(2);
    setBalance(newBalance);
    balanceRef.current = newBalance;
  };

  const adjustBetAfterWin = () => {
    if (autoMode) {
      if (operationAfterWinRef.current === 'Increase Bet by') {
        betRef.current = Math.min(betRef.current * valueAfterWinRef.current, parseFloat(balanceRef.current));
      } else {
        betRef.current = Math.min(valueAfterWinRef.current, parseFloat(balanceRef.current));
      }
      setBet(betRef.current);
    }
  };

  const adjustBetAfterLoss = () => {
    if (autoMode) {
      if (operationAfterLossRef.current === 'Increase Bet by') {
        betRef.current = Math.min(betRef.current * valueAfterLossRef.current, parseFloat(balanceRef.current));
      } else {
        betRef.current = Math.min(valueAfterLossRef.current, parseFloat(balanceRef.current));
      }
      setBet(betRef.current);
    }
  };

  return (
    <div id='index-operations' className={`"flex flex-col w-full gap-4  justify-between"${autoMode ? 'auto-mode' : ''} flex flex-col gap-4`}>
      <div className="flex w-full bg-white_20 justify-between p-2 rounded-[10px] text-white text-base leading-5">
        <div className="flex gap-2.5">
          <img src={avatar.avatar1} width="64px" height="64px" className="max-w-16 h-16"  alt = "avatar" />
          <div className="flex flex-col w-full gap-0.5">
            <p className="font-semibold">Sergei Kovtun</p>
            <p className="font-semibold">Beginner · 1/10</p>
            <p>1808944</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <PannelScore img = {Img.agree} text2 = {"Won"} text3={"48"}/>
          <PannelScore img = {Img.disagree} text2 = {"Lost"} text3={"32"}/>
        </div>
    </div>

<Game finalResult={finalResult} gamePhase={gamePhase} realGame={realGame} setRealGame={setRealGame} setLoaderIsShown={setLoaderIsShown}/>
      <div className="flex flex-row text-white justify-center">
        <span className={!autoMode ? 'selected' : ''} onClick={() => setAutoMode(false)}>Manual</span>
        <SwitchButton checked={autoMode} onChange={e => setAutoMode(e.target.checked)} />
        <span className={autoMode ? 'selected' : ''} onClick={() => setAutoMode(true)}>Auto</span>
      </div>

      <div className="flex gap-4 text-white">
        <div className="flex flex-col w-1/2">
          <div className="text-sm leading-5">Bet</div>
          <InputNumber InputProps={{ value: bet, min: 1, step: 1, onChange: e => setBet(parseFloat(e.target.value)) }} />
          <div className="text-xs leading-[14px]">Minimal Bet is 0.1 Coin</div>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="text-sm leading-5">Auto Stop</div>
          <InputNumber InputProps={{ value: autoStop, min: 1.01, max: 100, step: 1, onChange: e => { stopGame(); setAutoStop(parseFloat(e.target.value)) } }} />
          <div className="text-xs leading-[14px]">Auto Cash Out when this amount will be reached</div>
        </div>
      </div>
      {gamePhase !== 'started' ? (
        <button onClick={startGame} disabled={balance === '0.00' || bet < 1 || autoStop < 1.01 || balance < 1 || isNaN(bet) || isNaN(autoStop) || isNaN(valueAfterWin) || isNaN(valueAfterLoss)}>Start</button>
      ) : (
        <button onClick={stopGame}>Stop</button>
      )}

      {autoMode && (
        <>
          <div className='index-operations-top'>If Loss</div>
          <div className='index-operations-top'>{operationAfterLoss === 'Increase Bet by' ? 'Coefficient' : 'Base Bet'}</div>
          <DropDown label={operationAfterLoss} content={['Return to base Bet']} onChange={e => setOperationAfterLoss(e)} />
          <InputNumber InputProps={{ value: valueAfterLoss, min: 1, step: 1, onChange: e => setValueAfterLoss(parseFloat(e.target.value)) }} />
          
          <div className='index-operations-top'>If Win</div>
          <div className='index-operations-top'>{operationAfterWin === 'Increase Bet by' ? 'Coefficient' : 'Base Bet'}</div>
          <DropDown label={operationAfterWin} content={['Increase Bet by']} onChange={e => setOperationAfterWin(e)} />
          <InputNumber InputProps={{ value: valueAfterWin, min: 1, step: 1, onChange: e => setValueAfterWin(parseFloat(e.target.value)) }} />
        </>
      )}
    </div>
  );
};

export default SectionControl;