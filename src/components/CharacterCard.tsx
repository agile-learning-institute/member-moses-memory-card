import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Person, AutoStoriesTwoTone } from '@mui/icons-material';
import  '../styles/CharacterCard.css';

interface CharacterCardProps {
  id: string;
  charName: string;
  book: string;
  imageUrl: string;
}

function CharacterCard({id, charName, book, imageUrl}: CharacterCardProps) {
  return (
    <Card sx={{ minHeight: '280px', width: 200 }} id={id} key={id} className="card">
      <CardCover>
        <img
          src={imageUrl}
          loading="lazy"
          alt={charName}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff" startDecorator={<Person />}>
          {charName}
        </Typography>
        <Typography
          startDecorator={<AutoStoriesTwoTone />}
          textColor="neutral.300"
        >
          {book}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;