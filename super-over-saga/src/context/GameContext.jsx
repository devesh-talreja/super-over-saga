import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { getBall, missedTapResult } from '../game/BowlerAI';

// ─── State Shape ─────────────────────────────────────────────────────────────
const INIT = {
  phase: 'title',      // 'title'|'batsman-select'|'reveal'|'delivery'|'result'|'gameover'
  batsman: null,
  target: 0,
  score: 0,
  wickets: 0,
  ballsRemaining: 6,
  currentBall: null,   // full ball descriptor from BowlerAI
  lastResult: null,    // 'six'|'four'|'two'|'dot'|'wicket'
  streak: 0,           // consecutive boundaries
  multiplier: 1,       // 1x / 2x / 3x
  won: false,
  playerName: '',
  leaderboard: [],
  commentary: '',
};

function getAdjustedBall(batsman) {
  let ball = getBall();
  if (batsman === 'king') {
    const expansion = (ball.windowEnd - ball.windowStart) * 0.25;
    ball.windowStart = Math.max(0, ball.windowStart - expansion / 2);
    ball.windowEnd = Math.min(1, ball.windowEnd + expansion / 2);
  }
  return ball;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'START_GAME':
      return {
        ...INIT,
        phase: 'batsman-select',
        leaderboard: state.leaderboard, // persist leaderboard across games
      };

    case 'SELECT_BATSMAN':
      return {
        ...state,
        batsman: action.batsman,
        phase: 'reveal',
        target: Math.floor(Math.random() * 14) + 15, // 15–28
        currentBall: getAdjustedBall(action.batsman),
      };

    case 'START_DELIVERY':
      return { ...state, phase: 'delivery' };

    case 'RECORD_SHOT': {
      const { result } = action;
      const runsMap = { six: 6, four: 4, two: 2, dot: 0, wicket: 0 };
      const baseRuns = runsMap[result] ?? 0;
      const isBoundary = result === 'six' || result === 'four';
      const isWicket  = result === 'wicket';

      const newStreak  = isBoundary ? state.streak + 1 : 0;
      
      let newMult = 1;
      if (state.batsman === 'hitman') {
        newMult = newStreak >= 2 ? 3 : newStreak >= 1 ? 2 : 1;
      } else {
        newMult = newStreak >= 3 ? 3 : newStreak >= 2 ? 2 : 1;
      }

      // Multiplier only applies to boundaries
      let scored = isBoundary ? baseRuns * newMult : baseRuns;
      
      const isFinisherBonus = state.batsman === 'finisher' && state.ballsRemaining <= 2;
      if (isFinisherBonus && scored > 0) scored *= 2;

      const newScore   = state.score + scored;
      const newBalls   = state.ballsRemaining - 1;
      const newWickets = state.wickets + (isWicket ? 1 : 0);
      const isGameOver = isWicket || newBalls === 0;

      // Commentary Text
      const c = {
        six: ["INTO THE STANDS!", "OUT OF THE PARK!", "WHAT A MASSIVE HIT!", "UNBELIEVABLE STRIKE!"],
        four: ["PIERCES THE GAP!", "SMASHED FOR FOUR!", "BEAUTIFUL SHOT!", "RACES TO THE BOUNDARY!"],
        two: ["QUICK DOUBLE!", "GOOD RUNNING!", "PULLS IT AWAY FOR TWO!"],
        dot: ["WELL BOWLED!", "SWING AND A MISS!", "TIGHT BOWLING!", "BEATEN!"],
        wicket: ["KNOCKED HIM OVER!", "HE'S GONE!", "WHAT A DELIVERY!", "STUMPS FLYING!"]
      };
      let text = c[result][Math.floor(Math.random() * c[result].length)];
      if (isFinisherBonus && scored > 0) text = "FINISHER DOUBLE! " + text;

      return {
        ...state,
        phase: isGameOver ? 'gameover' : 'result',
        score: newScore,
        ballsRemaining: newBalls,
        wickets: newWickets,
        lastResult: result,
        streak: newStreak,
        multiplier: newMult,
        won: isGameOver ? newScore >= state.target : state.won,
        commentary: text,
      };
    }

    case 'NEXT_BALL':
      return {
        ...state,
        phase: 'reveal',
        currentBall: getAdjustedBall(state.batsman),
        lastResult: null,
      };

    case 'SET_NAME':
      return { ...state, playerName: action.name };

    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.data };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT);

  const startGame      = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const selectBatsman  = useCallback((batsman) => dispatch({ type: 'SELECT_BATSMAN', batsman }), []);
  const startDelivery  = useCallback(() => dispatch({ type: 'START_DELIVERY' }), []);
  const recordShot     = useCallback((result) => dispatch({ type: 'RECORD_SHOT', result }), []);
  const nextBall       = useCallback(() => dispatch({ type: 'NEXT_BALL' }), []);
  const missedTap      = useCallback(() => {
    const result = missedTapResult(state.currentBall?.type ?? 'fast');
    dispatch({ type: 'RECORD_SHOT', result });
  }, [state.currentBall]);
  const setName        = useCallback((name) => dispatch({ type: 'SET_NAME', name }), []);
  const setLeaderboard = useCallback((data) => dispatch({ type: 'SET_LEADERBOARD', data }), []);

  return (
    <GameContext.Provider value={{
      ...state,
      startGame, selectBatsman, startDelivery, recordShot, nextBall, missedTap, setName, setLeaderboard,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
