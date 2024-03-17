import { Creature } from '@/models';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { Stats } from './Stats';
import { useDispatch } from 'react-redux';
import {
  openCreatureEditor,
  openDeleteConfirmation,
} from '@/store/creatureEditor';

type Props = {
  item: Creature;
};

export const Todo = ({ item }: Props) => {
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(openCreatureEditor(item));
  };

  const onDelete = () => {
    dispatch(openDeleteConfirmation(item));
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <CardMedia
            component='img'
            alt='creature image'
            height='250'
            sx={{ objectPosition: 'top', borderRadius: '8px' }}
            image={item.image}
          />
          <Typography gutterBottom variant='h6' component='div'>
            {item.name}
          </Typography>

          <Stats creature={item} />

          <ButtonGroup>
            <Button color='error' onClick={onDelete}>
              Delete
            </Button>
            <Button onClick={onEdit}>Edit</Button>
          </ButtonGroup>
        </Stack>
      </CardContent>
    </Card>
  );
};
