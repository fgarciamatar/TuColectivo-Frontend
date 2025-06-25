import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import MapView, { AnimatedRegion, MarkerAnimated } from "react-native-maps";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { io } from "socket.io-client";

type Coordinate = {
  latitude: number;
  longitude: number;
};

const { height } = Dimensions.get("window");

const socket = io("https://tucolectivo-backend-production.up.railway.app", {
  transports: ["websocket"],
});

const DetalleViaje = ({ busId = "bus-123" }) => {
  const [initialPosition] = useState<Coordinate>({
    latitude: -27.353384,
    longitude: -65.595765,
  });

  const busPosition = useRef(
    new AnimatedRegion({
      latitude: initialPosition.latitude,
      longitude: initialPosition.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  ).current;

  const [locationReady, setLocationReady] = useState(false);

  // Panel deslizable
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(-height * 0.35, e.translationY);
    })
    .onEnd(() => {
      if (translateY.value < -100) {
        translateY.value = withSpring(-height * 0.35);
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    const handleLocationUpdate = (data: Coordinate) => {
      busPosition.setValue({
        ...data,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLocationReady(true);
    };

    socket.on(`location-${busId}`, handleLocationUpdate);
    return () => {
      socket.off(`location-${busId}`, handleLocationUpdate);
    };
  }, [busId]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      {/* Mapa */}
      <View className="h-[65%] rounded-b-2xl overflow-hidden">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {locationReady && (
            <MarkerAnimated
              coordinate={busPosition as any}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <MaterialCommunityIcons name="bus" size={36} color="#f97316" />
            </MarkerAnimated>
          )}
        </MapView>
      </View>

      {/* Panel deslizable */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={animatedStyle}
          className="absolute bottom-0 w-full bg-neutral-800 rounded-t-3xl p-5 pb-8"
        >
          {/* Indicador de deslizar */}
          <View className="w-12 h-1.5 bg-orange-600 rounded-full self-center mb-4" />

          <Text className="text-white text-lg font-bold text-center mb-6">
            Seguimiento en Vivo
          </Text>

          {/* Línea y tiempo */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <FontAwesome name="bus" size={18} color="#f97316" />
              <Text className="text-white font-medium">Línea: Alto Verde</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={18} color="#f97316" />
              <Text className="text-orange-400 font-medium">9 minutos</Text>
            </View>
          </View>

          {/* Parada cercana */}
          <View className="flex-row items-center gap-3 mb-4">
            <Ionicons name="location-sharp" size={20} color="#f97316" />
            <View>
              <Text className="text-white font-semibold">Parada Cercana</Text>
              <Text className="text-gray-300">
                Gral. Obispo Colombres 450
              </Text>
            </View>
          </View>

          {/* Destino */}
          <View className="flex-row items-center gap-3 mb-4">
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={20}
              color="#f97316"
            />
            <View>
              <Text className="text-white font-semibold">Destino</Text>
              <Text className="text-gray-300">
                Plaza Haimes (San Juan y San Martín)
              </Text>
            </View>
          </View>

          {/* Mensaje de espera */}
          {!locationReady && (
            <Text className="text-gray-400 text-center mt-4">
              Esperando actualización de ubicación...
            </Text>
          )}
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default DetalleViaje;
