import Constants from "expo-constants";
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { io } from 'socket.io-client';


export const API = Constants.expoConfig?.extra?.API;
const socket = io("https://tucolectivo-backend-production.up.railway.app", {
  transports: ['websocket'],
});

export const useSendLocation = (busId: string) => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permisos de ubicación denegados');
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // cada 5 segundos
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          socket.emit('sendLocation', {
            busId,
            latitude,
            longitude,
          });
        }
      );
    })();
  }, []);
};
