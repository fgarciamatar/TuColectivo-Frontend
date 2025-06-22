import { OptionsToEnter } from "@/components/OptionsToEnter";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";


export default function more() {
    // const dni = UseAuthStore((state) => state.userData?.dni);
    const dni:string = "1234567"
    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Vista superior de perfil */}
                <View className="w-full">
                <Link
                href={`moreScreens/profile/${dni}`} asChild>
                <Pressable>
                    <View className="bg-neutral-800 px-6 py-8 mb-6">
                        <View className="items-center justify-center">
                            <View className="w-16 h-16 rounded-full bg-neutral-700 items-center justify-center">
                                <Ionicons name="person-add-outline" size={28} color="white" />
                            </View>
                            <Text className="text-white text-xl font-semibold mt-3">
                                Acceder al perfil
                            </Text>
                        </View>
                    </View>
                </Pressable>
                </Link>
                </View>
                {/* Vista inferior de opciones */}
                <View className="px-4 space-y-2">
                    <OptionsToEnter
                        iconName="manage-accounts"
                        text="Manejar cuenta"
                        url={`moreScreens/profile/${dni}`}
                    />
                    <OptionsToEnter
                        iconName="security"
                        text="Centro de Seguridad"
                        url={`moreScreens/profile/${dni}/securityCenter`}
                    />
                    <OptionsToEnter
                        iconName="help-outline"
                        text="Ayuda"
                        url={`moreScreens/profile/${dni}/help`}
                    />
                    <OptionsToEnter
                        iconName="settings"
                        text="Configuración"
                        url="moreScreens/configuration"
                    />
                    <OptionsToEnter
                        iconName="info"
                        text="Sobre nosotros"
                        url="moreScreens/about"
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}