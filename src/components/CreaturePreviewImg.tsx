import { styled } from '@mui/material';
import React from 'react';

type Props = {
  src: string;
};

const ImageWrapper = styled('div')(() => ({
  borderRadius: '8px',
  overflow: 'hidden',
  height: '200px',
  width: '200px',
}));

const Image = styled('img')(() => ({
  width: '100%',
  height: 'auto',
}));

const placeholderImage = '/fantasy-placeholder-img-2.png';

export const CreaturePreviewImg = (props: Props) => {
  return (
    <ImageWrapper>
      <Image src={props.src || placeholderImage} alt='creature-preview' />
    </ImageWrapper>
  );
};
