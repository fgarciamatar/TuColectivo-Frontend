import LeafletMap from '@/components/LeafletMap';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

//Icons
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';


const destinations = [
  { name: 'Plaza Haimes', distance: '0.8km', time: '10min' },
  { name: 'Terminal', distance: '1.7km', time: '23min' },
  { name: 'Centro', distance: '1.2km', time: '15min' },
];
//-27.353384, -65.595765 TERMINAL DE OMNIBUS
export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 bg-slate-800 relative'>
      <LeafletMap latitude={-27.353384} longitude={-65.595765} zoom={12} />


      <View className='absolute bottom-0 bg-black/80 rounded-2xl p-4 w-[95%] self-center mt-8 mb-2'>


        <View className='bg-orange-600 p-3 rounded-t-xl flex-row items-center space-x-2'>
          <Entypo name="direction" size={20} color="white" />
          <Text className='text-white text-2xl font-bold'> ¿A dónde vas? </Text>
        </View>

        <View className="bg-neutral-900 px-3 py-2 rounded-xl mt-3 flex-row items-center space-x-2">
          <TextInput
            placeholder="Buscar destino..."
            placeholderTextColor="gray"
            className="text-white flex-1"
          />
        </View>

        <Text className="text-white mt-4 mb-2 font-semibold">Destinos populares</Text>
        {destinations.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-neutral-900 p-3 rounded-xl mb-2 flex-row items-center justify-between"
          >
            <View className="flex-row items-center space-x-2">

              <View>h
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

      </View>
    </SafeAreaView>
  )
}

