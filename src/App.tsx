import './styles/App.css'
import Button from '@mui/joy/Button';
import logo from './assets/logomymy.png'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import gameCharacters from './GameCharacters';
import GameControl from './components/GameControl';

function App() {
  const [open, setOpen] = useState<boolean>(true);
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
  }, [currentScore, bestScore]);

  const handleCardClick = (id: string) => {
    if (clickedCards.includes(id)) {
      alert('Game Over! You clicked the same card twice.');
      setClickedCards([]);
      setCurrentScore(0);
      setOpen(true);
    } else {
      setClickedCards([...clickedCards, id]);
      setCurrentScore(currentScore + 1);
      if (clickedCards.length + 1 === 10) {
        alert('Congratulations! You won!');
        setClickedCards([]);
        setCurrentScore(0);
        setOpen(true);
      }
    }
  };

  return (
    <>
      <div className="App">
        <Modal open={open} onClose={() => setOpen(true)}>
          <ModalDialog
            aria-labelledby="nested-modal-title"
            aria-describedby="nested-modal-description"
            sx={(theme) => ({
              [theme.breakpoints.only('xs')]: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                transform: 'none',
                maxWidth: 'unset',
              },
            })}
          >
            <img src={logo} alt="logo" className="logo" />
            <Typography id="Intro-text" level="h1" textAlign='center'>
              Bible Character Memory Game
            </Typography>
            <Button color="warning" size="lg" onClick={() => setOpen(false)} variant="outlined">Click to Play</Button>
          </ModalDialog>
        </Modal>
        
        <main>
          <h1 className="header-text">
            <span className="title1">Bible Character </span>
            <span className="title2"> Memory Game</span>
          </h1>

          <div className="score-container">
            <Button variant="soft" size="lg">
              Current score: {currentScore}
            </Button>
            <Button variant="solid" size="lg">
              Best score: {bestScore}
            </Button>
          </div>
          <><br /></>
          <Divider />
          <><br /></>
          <GameControl gameCharacters={gameCharacters} onCardClick={handleCardClick} />
        </main>
      </div>
    </>
  )
}

export default App;