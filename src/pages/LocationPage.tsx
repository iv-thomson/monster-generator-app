import { NoData } from '@/components/NoData';
import { Container } from '@mui/material';
import React from 'react';

export const LocationPage = () => {
  return (
    <Container sx={{ marginTop: '24px', my: 10 }}>
      <NoData message='No locations found' />
    </Container>
  );
};
