import { useState, useEffect } from 'react';
import CardsContainer from "./CardsContainer";

interface GameCharacter {
  charName: string;
  book: string;
  imageUrl: string;
  hasClicked: boolean;
  isActive: boolean;
  id: string;
}

interface GameControlProps {
  gameCharacters: GameCharacter[];
  onCardClick: (id: string) => void;
}

function GameControl({ gameCharacters, onCardClick }: GameControlProps) {
  const [shuffledCharacters, setShuffledCharacters] = useState<GameCharacter[]>([]);

  useEffect(() => {
    shuffleCharacters();
  }, [gameCharacters]);

  const shuffleCharacters = () => {
    const shuffled = [...gameCharacters].sort(() => 0.5 - Math.random()).slice(0, 10);
    setShuffledCharacters(shuffled);
  };

  const handleCardSelection = (id: string) => {
    onCardClick(id);
    shuffleCharacters();
  };

  return (
    <CardsContainer gameCharacters={shuffledCharacters} handleCardSelection={handleCardSelection} />
  );
}

export default GameControl;