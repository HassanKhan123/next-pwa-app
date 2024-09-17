import { atom } from 'jotai';


export const chatDataAtom = atom<{
  searchValues: string[];
  responses: { sources: { title: string; url: string; text: string }[]; content: string }[];
}>(
  { searchValues: [], responses: [] }
);

