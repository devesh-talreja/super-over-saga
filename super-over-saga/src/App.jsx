import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import TitleScreen from './screens/TitleScreen';
import BatsmanSelectScreen from './screens/BatsmanSelectScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import './styles/index.css';

function Router() {
  const { phase } = useGame();
  return (
    <AnimatePresence mode="wait">
      {phase === 'title'    && <TitleScreen   key="title" />}
      {phase === 'batsman-select' && <BatsmanSelectScreen key="select" />}
      {(phase === 'reveal' || phase === 'delivery' || phase === 'result') && <GameScreen key="game" />}
      {phase === 'gameover' && <GameOverScreen key="gameover" />}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}
