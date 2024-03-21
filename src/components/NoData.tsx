import React from 'react';
import { Typography, styled } from '@mui/material';

type Props = {
  message: string;
};

const NoDataStyle = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '.empty-state-message': {
    position: 'absolute',
    width: '140px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    h2: {
      margin: 0,
    },
    p: {
      margin: 0,
    },
  },
}));

export const NoData = ({ message }: Props) => {
  return (
    <NoDataStyle>
      <img src='./empty-state.png' />

      <div className='empty-state-message'>
        <Typography variant='h4' fontWeight='900' fontFamily='fantasy'>
          No data
        </Typography>
        <Typography fontWeight='600' fontFamily='fantasy'>
          {message}
        </Typography>
      </div>
    </NoDataStyle>
  );
};
