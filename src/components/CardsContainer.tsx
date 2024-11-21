import { Box } from '@mui/material';
import '../styles/CharacterCard.css';
import CharacterCard from './CharacterCard';

interface Character {
  id: string;
  charName: string;
  book: string;
  imageUrl: string;
}

interface CardsContainerProps {
  gameCharacters: Character[];
}

function CardsContainer({ gameCharacters }: CardsContainerProps) {
  return (
      <Box
        component="ul"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      >
        {gameCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            charName={character.charName}
            book={character.book}
            imageUrl={character.imageUrl}
          />
        ))}
      </Box>
  );
}

export default CardsContainer;