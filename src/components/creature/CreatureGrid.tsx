import React from 'react';
import { Creature } from '@/models';
import { CreaturePreview } from './CreaturePreview';

import Grid from '@mui/material/Unstable_Grid2';

type Props = {
  items: Creature[];
};

export const CreatureGrid = (props: Props) => {
  return (
    <Grid spacing={4} container>
      {props.items.map(item => (
        <Grid key={item.id} xs={3}>
          <CreaturePreview item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
