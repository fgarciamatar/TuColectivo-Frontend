import { Pressable, SafeAreaView, Text, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";



export default function LandingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 justify-center items-center  bg-[#121212]">
            <View className="bg-orange-500 rounded-3xl px-8 py-8 mt-5 mb-8">
            <FontAwesome5 name="bus-alt" size={36} color="black" />
            </View>

            <Text className="text-3xl text-white font-bold mb-6">TuColectivo</Text>

            <View className="bg-[#1e1e1e] border-orange-900 p-16 rounded-2xl w-full max-w-xs border items-center ">
                <Pressable //Botón de Inicio de Sesión
                className=" bg-orange-600 px-6 py-4 rounded-lg mb-4"
                onPress={() => router.push('/login')}
                >
                    <Text className="text-white font-bold text-center"> Iniciar Sesión </Text>
                </Pressable>
                <Pressable //Botón de Registro
                 className=" bg-orange-600 px-7 py-4 rounded-lg"
                 onPress={() => router.push('/register')}
                 >
                    <Text className="text-white font-bold text-center"> Registrarme </Text>
                </Pressable>
            </View>
            
            <Text className="text-white font-bold mt-10"> Encuentra tu colectivo de forma fácil, rápida y segura</Text>

        </SafeAreaView>
        
    )
}