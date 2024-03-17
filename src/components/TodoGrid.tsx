import React from 'react';
import { Creature } from '@/models';
import { Todo } from './Todo';

import Grid from '@mui/material/Unstable_Grid2';

type Props = {
  items: Creature[];
};

export const TodoGrid = (props: Props) => {
  return (
    <Grid spacing={4} container>
      {props.items.map(item => (
        <Grid key={item.id} xs={3}>
          <Todo item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
