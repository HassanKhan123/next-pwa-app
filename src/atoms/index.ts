import exp from 'constants';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';


export const historyAtom = atomWithStorage<{ value: string; timestamp: string }[]>('history', []);

export const chatDataAtom = atom<{
  searchValues: string[];
  responses: { sources: { title: string; url: string; text: string }[]; content: string; timestamp: string }[];
}>(
  { searchValues: [], responses: [] }
);

export const loadingAtom = atom<boolean>(false);

export const bookmarkAtom = atomWithStorage<string[]>('bookmarks', []);
