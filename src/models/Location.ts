export interface Location {
  name: string;
  description: string;
  image: string;
  id: string;
}

export type PartialLocation = Omit<Location, 'id'>;
