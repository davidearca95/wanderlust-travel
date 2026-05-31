import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { DestinationScreen } from './src/screens/DestinationScreen';
import { ItineraryScreen } from './src/screens/ItineraryScreen';
import { useStorage } from './src/utils/storage';

export type Screen =
  | { name: 'Home' }
  | { name: 'Destination'; destinationId: string }
  | { name: 'Itinerary'; destinationId: string; days?: number };

export type AppContext = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  notes: Record<string, string>;
  setNote: (id: string, text: string) => void;
  checklists: Record<string, boolean[]>;
  toggleCheckItem: (destId: string, idx: number) => void;
  initChecklist: (destId: string, length: number) => void;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'Home' });
  const [favorites, setFavorites] = useStorage<string[]>('fav', []);
  const [notes, setNotes] = useStorage<Record<string, string>>('notes', {});
  const [checklists, setChecklists] = useStorage<Record<string, boolean[]>>('checks', {});

  const navigate = (s: Screen) => setScreen(s);
  const goBack = () => setScreen({ name: 'Home' });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };
  const isFavorite = (id: string) => favorites.includes(id);
  const setNote = (id: string, text: string) => {
    setNotes((prev) => ({ ...prev, [id]: text }));
  };
  const toggleCheckItem = (destId: string, idx: number) => {
    setChecklists((prev) => {
      const list = [...(prev[destId] || [])];
      list[idx] = !list[idx];
      return { ...prev, [destId]: list };
    });
  };
  const initChecklist = (destId: string, length: number) => {
    setChecklists((prev) => {
      if (prev[destId] && prev[destId].length === length) return prev;
      return { ...prev, [destId]: new Array(length).fill(false) };
    });
  };

  const ctx: AppContext = {
    favorites, toggleFavorite, isFavorite,
    notes, setNote,
    checklists, toggleCheckItem, initChecklist,
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      {screen.name === 'Home' && <HomeScreen navigate={navigate} ctx={ctx} />}
      {screen.name === 'Destination' && (
        <DestinationScreen
          destinationId={screen.destinationId}
          navigate={navigate}
          goBack={goBack}
          ctx={ctx}
        />
      )}
      {screen.name === 'Itinerary' && (
        <ItineraryScreen
          destinationId={screen.destinationId}
          days={screen.days}
          goBack={() => navigate({ name: 'Destination', destinationId: screen.destinationId })}
          ctx={ctx}
        />
      )}
    </>
  );
}
