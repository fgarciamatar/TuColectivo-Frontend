import DetalleViaje from "@/components/DetalleViaje";
import LeafletMap from "@/components/LeafletMap";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { io } from "socket.io-client";

// Icons
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const destinations = [
  { name: "Plaza Haimes", distance: "0.8km", time: "10min" },
  { name: "Terminal", distance: "1.7km", time: "23min" },
  { name: "Centro", distance: "1.2km", time: "15min" },
];

const socket = io("https://tucolectivo-backend-production.up.railway.app", {
  transports: ["websocket"],
});

export default function HomeScreen() {
  type LocationType = {
    latitude: number;
    longitude: number;
  };

  const [location, setLocation] = useState<LocationType | null>(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false); // Estado nuevo

  const busId = "bus-123";

  useEffect(() => {
    const handleLocationUpdate = (data: LocationType) => {
      setLocation(data);
    };

    socket.on(`location-${busId}`, handleLocationUpdate);

    return () => {
      socket.off(`location-${busId}`, handleLocationUpdate);
    };
  }, []);

  if (mostrarDetalle) {
    return <DetalleViaje />; // Mostrar DetalleViaje directamente
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-800 items-center">
      <LeafletMap latitude={-27.353384} longitude={-65.595765} zoom={15} />

      <View className="absolute bottom-0 bg-black/80 rounded-2xl p-4 w-[95%] self-center mt-8 mb-2">
        <View className="bg-orange-600 p-3 rounded-t-xl flex-row items-center space-x-2">
          <Entypo name="direction" size={20} color="white" />
          <Text className="text-white text-2xl font-bold"> ¿A dónde vas? </Text>
        </View>

        <View className="bg-neutral-900 px-3 py-2 rounded-xl mt-3 flex-row items-center space-x-2">
          <TextInput
            placeholder="Buscar destino..."
            placeholderTextColor="gray"
            className="text-white flex-1"
          />
        </View>

        <Text className="text-white mt-4 mb-2 font-semibold">
          Destinos populares
        </Text>
        {destinations.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-neutral-900 p-3 rounded-xl mb-2 flex-row items-center justify-between"
          >
            <View className="flex-row items-center space-x-2">
              <View>
                <Text className="text-white font-medium">{item.name}</Text>
                <Text className="text-gray-400 text-xs">{item.distance}</Text>
              </View>
            </View>

            <View className="bg-neutral-800 px-3 py-1 rounded-full flex-row items-center space-x-1">
              <EvilIcons name="clock" size={24} color="white" />
              <Text className="text-orange-400 text-sm">{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Botón CONTINUAR (realizado para probar la ubicacion actualizada del colectivo, usar ese componente como el detalle del viaje) */}
        <TouchableOpacity
          onPress={() => setMostrarDetalle(true)}
          className="bg-orange-500 mt-4 p-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
