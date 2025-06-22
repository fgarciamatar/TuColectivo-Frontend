import { useRouter } from "expo-router";
import { Formik } from 'formik';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { validationSchema } from '../../utils/validationLogin';

//Iconos
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useAuthStore } from '@/stores/authStore';

interface LoginCredentials {
  email: string;
  contraseña: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [step] = useState(1);

  const { loginUsuario, error, loading, access } = useAuthStore();

  const handleLogin = async (credentials: LoginCredentials) => {
    console.log('Intentando iniciar sesión con', credentials);
      const response = await loginUsuario(credentials.email, credentials.contraseña);
      alert(response.message)
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-[#1e1e1e] rounded-2xl p-6 w-full max-w-md border border-orange-900">


            {/* Icono */}
            <View className="bg-orange-900 rounded-full mx-32 py-2 items-center">
              <MaterialIcons name="input" size={24} color="orange" />
            </View>

            {/* Títulos */}
            <View className="items-center">
              <Text className="text-2xl px-10 mt-3 font-bold text-orange-600">Bienvenido de nuevo</Text>
              <Text className="text-white text-xs mb-5">Inicia sesión para continuar usando TuColectivo</Text>
            </View>

            <Formik
              initialValues={{ email: '', contraseña: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                <View className="space-y-5">

                  {/* Email */}
                  {step === 1 && (
                    <View>
                      <Text className="text-white mb-1">Email</Text>
                      <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                        <MaterialCommunityIcons name="email-outline" size={20} color="#FFA500" />
                        <TextInput
                          className="flex-1 text-white py-3 ml-2"
                          placeholder="tu@email.com"
                          placeholderTextColor="#999"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                      )}
                    </View>
                  )}

                  {/* Contraseña */}
                  <View>
                    <Text className="text-white mb-1">Contraseña</Text>
                    <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                      <AntDesign name="lock1" size={20} color="#FFA500" />
                      <TextInput
                        className="flex-1 text-white py-3 ml-2"
                        placeholder="******"
                        placeholderTextColor="#999"
                        secureTextEntry
                        onChangeText={handleChange('contraseña')}
                        onBlur={handleBlur('contraseña')}
                        value={values.contraseña}
                      />
                    </View>
                    {touched.contraseña && errors.contraseña && (
                      <Text className="text-red-500 text-sm mt-1">{errors.contraseña}</Text>
                    )}
                  </View>

                  {/* Botón de login */}
                  <Pressable
                    onPress={() => handleSubmit()} 
                    className={`mt-6 ${loading ? 'bg-orange-300' : 'bg-orange-600'} py-3 rounded-xl items-center`}
                    disabled={loading} // Este estado lo está deshabilitando si `loading` es verdadero
                  >
                    <Text className="font-bold text-white">
                      {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </Text>
                  </Pressable>



                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginForm;
