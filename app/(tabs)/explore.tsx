import LeafletMap from '@/components/LeafletMap';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView, Text, TextInput, View, } from "react-native";

export default function explore() {
  return (
  <SafeAreaView className='flex-1 bg-slate-800 relative'>
        <LeafletMap latitude={-27.345725} longitude={-65.592901} zoom={12} />
   
        <View className='absolute bottom-0 bg-black/80 rounded-2xl p-4 w-[95%] self-center mt-8 mb-2'>
  
          <View className='bg-orange-600 p-3 rounded-t-xl flex-row items-center space-x-2 justify-center'>
            <Entypo name="direction" size={20} color="white" />
            <Text className='text-white text-2xl font-bold'> Buscá tus posibles destinos </Text>
          </View>
  
          <View className="bg-neutral-900 px-3 py-2 rounded-xl mt-3 flex-row items-center space-x-2">
          <TextInput
            placeholder="Buscar destino..."
            placeholderTextColor="gray"
            className="text-white flex-1"
          />
        </View>
  
          <Text className="text-white mt-4 mb-2 font-semibold">Destinos populares</Text>
  
        </View>
    </SafeAreaView>
  )
};
