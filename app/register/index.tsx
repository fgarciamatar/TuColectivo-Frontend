import { Text, TextInput, SafeAreaView, View, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Formik } from 'formik';
import { validationSchema } from '../../utils/validationRegister';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

// Store
import { useAuthStore } from '@/stores/authStore';

// Iconos
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { registroUsuario } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="px-6 py-8" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center items-center">
            <View className="flex-row space-x-2 mb-6">
              <View className="w-3 h-3 rounded-full bg-orange-500" />
              <View className="w-3 h-3 rounded-full bg-gray-500" />
              <View className="w-3 h-3 rounded-full bg-gray-500" />
            </View>

            {/* Formulario */}
            <View className="bg-[#1e1e1e] rounded-2xl p-6 w-full max-w-md border border-orange-900">
              <Formik
                initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await registroUsuario(values.name, values.email, values.password);
                  resetForm();
                  router.replace('/');
                }}
              >
                {({ handleChange, handleSubmit, setFieldTouched, validateForm, values, errors, touched }) => (
                  <View className="space-y-5">
                    <Animated.View
                      entering={FadeInRight}
                      exiting={FadeOutLeft}
                      key={step}
                      className="space-y-5"
                    >
                      {/* Nombre */}
                      {step === 1 && (
                        <View>
                          <Text className="text-white mb-1">¿Cuál es tu nombre?</Text>
                          <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                            <Ionicons name="person-outline" size={20} color="#FFA500" />
                            <TextInput
                              className="flex-1 text-white py-3 ml-2"
                              placeholder="Nombre completo"
                              placeholderTextColor="#999"
                              onChangeText={handleChange('name')}
                              value={values.name}
                            />
                          </View>
                          {touched.name && errors.name && (
                            <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
                          )}
                        </View>
                      )}

                      {/* Email */}
                      {step === 2 && (
                        <View>
                          <Text className="text-white mb-1">¿Cuál es tu email?</Text>
                          <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                            <MaterialCommunityIcons name="email-outline" size={20} color="#FFA500" />
                            <TextInput
                              className="flex-1 text-white py-3 ml-2"
                              placeholder="tu@email.com"
                              placeholderTextColor="#999"
                              keyboardType="email-address"
                              autoCapitalize="none"
                              onChangeText={handleChange('email')}
                              value={values.email}
                            />
                          </View>
                          {touched.email && errors.email && (
                            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                          )}
                        </View>
                      )}

                      {/* Contraseña */}
                      {step === 3 && (
                        <>
                          <View>
                            <Text className="text-white mb-1">Elige una contraseña</Text>
                            <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                              <AntDesign name="lock1" size={20} color="#FFA500" />
                              <TextInput
                                className="flex-1 text-white py-3 ml-2"
                                placeholder="Contraseña"
                                placeholderTextColor="#999"
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                value={values.password}
                              />
                            </View>
                            {touched.password && errors.password && (
                              <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                            )}
                          </View>

                          <View>
                            <Text className="text-white mb-1">Confirma tu contraseña</Text>
                            <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                              <AntDesign name="lock1" size={20} color="#FFA500" />
                              <TextInput
                                className="flex-1 text-white py-3 ml-2"
                                placeholder="Confirmar contraseña"
                                placeholderTextColor="#999"
                                secureTextEntry
                                onChangeText={handleChange('confirmPassword')}
                                value={values.confirmPassword}
                              />
                            </View>
                            {touched.confirmPassword && errors.confirmPassword && (
                              <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>
                            )}
                          </View>
                        </>
                      )}
                    </Animated.View>

                    {/* Botón */}
                    <Pressable
                      onPress={async () => {
                        const currentField =
                          step === 1
                            ? 'name'
                            : step === 2
                              ? 'email'
                              : step === 3
                                ? 'password'
                                : 'confirmPassword';

                        await setFieldTouched(currentField, true);
                        const errors = await validateForm();

                        if (!errors[currentField]) {
                          if (step === 3) handleSubmit();
                          else setStep((prev) => prev + 1);
                        }
                      }}
                      className="mt-6 bg-orange-600 py-3 rounded-xl"
                    >
                      <Text className="text-white text-center font-semibold text-lg">
                        {step === 3 ? 'Registrarse' : 'Continuar'}
                      </Text>
                    </Pressable>

                    {/* Comentario final */}
                    <View className="flex-row items-center justify-center">
                      <Text className="text-center justify-center items-center text-sm text-gray-400">
                        ¿Ya tienes una cuenta?
                      </Text>
                      <Pressable className="font-bold" onPress={() => { router.push('/login') }}>
                        <Text className="text-orange-500"> Inicia sesión</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
