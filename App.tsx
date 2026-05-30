import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { DestinationScreen } from './src/screens/DestinationScreen';
import { ItineraryScreen } from './src/screens/ItineraryScreen';

export type Screen =
  | { name: 'Home' }
  | { name: 'Destination'; destinationId: string }
  | { name: 'Itinerary'; destinationId: string };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'Home' });

  const navigate = (s: Screen) => setScreen(s);
  const goBack = () => setScreen({ name: 'Home' });

  return (
    <>
      <StatusBar barStyle="light-content" />
      {screen.name === 'Home' && <HomeScreen navigate={navigate} />}
      {screen.name === 'Destination' && (
        <DestinationScreen
          destinationId={screen.destinationId}
          navigate={navigate}
          goBack={goBack}
        />
      )}
      {screen.name === 'Itinerary' && (
        <ItineraryScreen
          destinationId={screen.destinationId}
          goBack={() => navigate({ name: 'Destination', destinationId: screen.destinationId })}
        />
      )}
    </>
  );
}
