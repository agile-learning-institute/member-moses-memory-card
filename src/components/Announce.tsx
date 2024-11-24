import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import { Warning } from '@mui/icons-material';

interface AnnounceProps {
  charName: string;
  result: 'success' | 'danger';
  onClose: () => void;
}

export default function Announce({ charName, result, onClose }: AnnounceProps) {
  return (
    <Alert
      size="lg"
      color={result}
      variant="solid"
      invertedColors
      startDecorator={
        <AspectRatio
          variant="solid"
          ratio="1"
          sx={{
            minWidth: 40,
            borderRadius: '50%',
            boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
          }}
        >
          <div>
            {result === 'success' ? <Check /> : <Warning />}
          </div>
        </AspectRatio>
      }
      endDecorator={
        <IconButton
          variant="plain"
          onClick={onClose}
          sx={{
            '--IconButton-size': '32px',
            transform: 'translate(0.5rem, -0.5rem)',
          }}
        >
          <Close />
        </IconButton>
      }
      sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
    >
      <div>
        <Typography level="title-lg">{result !== 'success' ? 'You Lost!' : 'You Won!'}</Typography>
        <Typography level="body-sm">
          {result !== 'success' ? `Ooops! You already clicked on "${charName}"! Game Over!!` : 'Ta-daaaaa! You are a memory Guru!'}
        </Typography>
      </div>
      <LinearProgress
        variant="solid"
        color={result}
        value={40}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
        }}
      />
    </Alert>
  );
}