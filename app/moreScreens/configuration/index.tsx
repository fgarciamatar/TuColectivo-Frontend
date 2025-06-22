import { OptionsToEnter } from "@/components/OptionsToEnter";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function Configuration() {
const navigation = useNavigation();
   
  useEffect(() => {
    navigation.setOptions({
      title: 'Tu Colectivo',
    });
  }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Vista inferior de opciones */}
                <View className="px-4 space-y-2">
                    <OptionsToEnter
                    iconName="mode"
                    text="Elegir tema"
                    url=""
                    >
                    </OptionsToEnter>
                    <OptionsToEnter
                    iconName="star"
                    text="Agregar paradas favoritas"
                    url=""
                    >
                    </OptionsToEnter>
                    <OptionsToEnter
                    iconName="payment"
                    text="Pagos con tarjeta"
                    url=""
                    >
                    </OptionsToEnter>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}