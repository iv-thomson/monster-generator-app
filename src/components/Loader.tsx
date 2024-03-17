import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Skeleton, Stack } from '@mui/material';

type Props = {
  placeholderCount: 10;
};

export const Loader = (props: Props) => {
  const items = new Array(props.placeholderCount)
    .fill(null)
    .map((o, index) => index);
  return (
    <Grid spacing={4} container>
      {items.map(item => (
        <Grid key={item} xs={3}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Skeleton variant='rectangular' width={232} height={232} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />

                <Skeleton variant='rectangular' height={40} />

                <Skeleton variant='rectangular' height={40} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
