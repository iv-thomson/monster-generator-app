import React from 'react';
import { Creature } from '@/models';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

type Props = {
  creature: Creature;
};

export const Stats = ({ creature }: Props) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Strength</TableCell>
          <TableCell>{creature.strength}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Vitality</TableCell>
          <TableCell>{creature.vitality}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Dexterity</TableCell>
          <TableCell>{creature.dexterity}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
