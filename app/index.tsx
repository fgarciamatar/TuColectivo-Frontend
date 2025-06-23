import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function LandingScreen() {
  const router = useRouter();

  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Levitación infinita
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // Animación inicial de scale para simular contorno
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, []);

  const animatedStyle = {
    transform: [
      { translateY: floatAnim },
      { scale: scaleAnim },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center px-4">
      <Animated.View
        style={[
          styles.logoContainer,
          animatedStyle,
        ]}
      >
        <View style={styles.whiteOutline}>
          <View style={styles.innerCircle}>
            <FontAwesome5 name="bus-alt" size={36} color="black" />
          </View>
        </View>
      </Animated.View>

      <Text className="text-3xl font-bold text-orange-500 mt-6 mb-10">
        TuColectivo
      </Text>

      <View className="w-full max-w-xs">
        <Pressable
          className="border border-orange-600 rounded-xl py-3 mb-4 bg-[#121212] "
          onPress={() => router.push('/register')}
        >
          <Text className="text-orange-500 font-bold text-center">
            Registrarme
          </Text>
        </Pressable>

        <Pressable
          className="border border-orange-600 rounded-xl py-3 bg-[#121212]"
          onPress={() => router.push('/login')}
        >
          <Text className="text-orange-500 font-bold text-center">
            Iniciar sesión
          </Text>
        </Pressable>
      </View>

      <Text className="text-orange-500 text-sm mt-12 text-center">
        Encuentra tu colectivo de forma fácil, rápida  y segura.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteOutline: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 2,
  },
  innerCircle: {
    backgroundColor: '#e65100', 
    borderRadius: 20,
    padding: 25,
  },
});
