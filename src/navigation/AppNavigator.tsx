import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DestinationScreen } from '../screens/DestinationScreen';
import { ItineraryScreen } from '../screens/ItineraryScreen';
import { COLORS } from '../constants/theme';

export type RootStackParamList = {
  Home: undefined;
  Destination: { destinationId: string };
  Itinerary: { destinationId: string; startDate?: string; endDate?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
