import { Creature } from '@/models';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Stats } from './Stats';
import { useDispatch, useSelector } from 'react-redux';
import {
  openCreatureEditor,
  openDeleteConfirmation,
  removeCreatureHighlight,
} from '@/store/creatureEditor';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';

type Props = {
  item: Creature;
};

const HighlightableCard = styled(Card)(() => ({
  '&.highlighted': {
    'box-shadow': '0px 12px 12px 4px rgba(25, 118, 210, 0.2)',
  },
}));

const TypographyWithElipsis = styled(Typography)(({ width }) => ({
  'white-space': ' nowrap',
  overflow: ' hidden',
  'text-overflow': ' ellipsis',
  width: `${width}px`,
}));

export const CreaturePreview = ({ item }: Props) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const dispatch = useDispatch();
  const highlightedId = useSelector(
    (state: RootState) => state.creatureEditor.highlightedItemId,
  );

  useEffect(() => {
    setIsHighlighted(highlightedId === item.id);
    setTimeout(() => {
      dispatch(removeCreatureHighlight());
    }, 200);
  }, [item, highlightedId]);

  const onEdit = () => {
    dispatch(openCreatureEditor(item));
  };

  const onDelete = () => {
    dispatch(openDeleteConfirmation(item));
  };

  return (
    <HighlightableCard className={isHighlighted ? 'highlighted' : ''}>
      <CardContent>
        <Stack spacing={2}>
          <CardMedia
            component='img'
            alt='creature image'
            height='250'
            sx={{ objectPosition: 'top', borderRadius: '8px' }}
            image={item.image}
          />
          <TypographyWithElipsis gutterBottom variant='h6' width={200}>
            {item.name}
          </TypographyWithElipsis>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              Parameters
            </AccordionSummary>
            <AccordionDetails>
              <Stats creature={item} />
            </AccordionDetails>
          </Accordion>

          <ButtonGroup>
            <Button color='error' onClick={onDelete}>
              Delete
            </Button>
            <Button onClick={onEdit}>Edit</Button>
          </ButtonGroup>
        </Stack>
      </CardContent>
    </HighlightableCard>
  );
};
