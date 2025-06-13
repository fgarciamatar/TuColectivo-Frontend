import { useRouter } from "expo-router";
import { Formik } from 'formik';
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { validationSchema } from '../../utils/validationRegister';

// Store
import { useAuthStore } from '@/stores/authStore';

// Iconos
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
                initialValues={{ nombre: '', apellido: '', email: '', dni: '', celular:'', contraseña: '', confirmarContraseña: '', rol:"pasajero" }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await registroUsuario(values);
                  resetForm();
                  router.replace('/login');
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
                              onChangeText={handleChange('nombre')}
                              value={values.nombre}
                            />
                          </View>
                          {touched.nombre && errors.nombre && (
                            <Text className="text-red-500 text-sm mt-1">{errors.nombre}</Text>
                          )},
                          <Text className="text-white mb-1">¿Cuál es tu apellido?</Text>
                          <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                            <Ionicons name="person-outline" size={20} color="#FFA500" />
                            <TextInput
                              className="flex-1 text-white py-3 ml-2"
                              placeholder="Apellido"
                              placeholderTextColor="#999"
                              onChangeText={handleChange('apellido')}
                              value={values.apellido}
                            />
                          </View>
                          {touched.apellido && errors.apellido && (
                            <Text className="text-red-500 text-sm mt-1">{errors.apellido}</Text>
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
                          <Text className="text-white mb-1">¿Cuál es tu dni?</Text>
                          <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                            <MaterialCommunityIcons name="email-outline" size={20} color="#FFA500" />
                            <TextInput
                              className="flex-1 text-white py-3 ml-2"
                              placeholder="DNI"
                              placeholderTextColor="#999"
                              keyboardType="number-pad"
                              onChangeText={handleChange('dni')}
                              value={values.dni}
                            />
                          </View>
                          {touched.dni && errors.dni && (
                            <Text className="text-red-500 text-sm mt-1">{errors.dni}</Text>
                          )}
                          <Text className="text-white mb-1">¿Cuál es tu número telefónico?</Text>
                          <View className="flex-row items-center bg-[#2a2a2a] rounded-lg px-3">
                            <MaterialCommunityIcons name="email-outline" size={20} color="#FFA500" />
                            <TextInput
                              className="flex-1 text-white py-3 ml-2"
                              placeholder="Número de Celular"
                              placeholderTextColor="#999"
                              keyboardType="number-pad"
                              onChangeText={handleChange('celular')}
                              value={values.celular}
                            />
                          </View>
                          {touched.celular && errors.celular && (
                            <Text className="text-red-500 text-sm mt-1">{errors.celular}</Text>
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
                                onChangeText={handleChange('contraseña')}
                                value={values.contraseña}
                              />
                            </View>
                            {touched.contraseña && errors.contraseña && (
                              <Text className="text-red-500 text-sm mt-1">{errors.contraseña}</Text>
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
                                onChangeText={handleChange('confirmarContraseña')}
                                value={values.confirmarContraseña}
                              />
                            </View>
                            {touched.confirmarContraseña && errors.confirmarContraseña && (
                              <Text className="text-red-500 text-sm mt-1">{errors.confirmarContraseña}</Text>
                            )}
                          </View>
                        </>
                      )}
                    </Animated.View>

                    {/* Botón */}
                    <Pressable
                      onPress={async () => {
                        const currentFields =
                          step === 1
                            ? ['nombre', 'apellido']
                            : step === 2
                              ? ['email', 'dni', 'celular']
                              : step === 3
                                ? ['contraseña']
                                : ['confirmarContraseña'];
                        // Tocar todos los campos del paso actual
                        await Promise.all(currentFields.map((field) => setFieldTouched(field, true)));

                        // Validar todo el formulario
                        const allErrors = await validateForm();

                        // Verificar si los campos actuales tienen errores
                        const hasErrors = currentFields.some((field) => {
                          return allErrors[field as keyof typeof allErrors]
                        });

                        if (!hasErrors) {
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
