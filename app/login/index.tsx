import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { validationSchema } from "../../utils/validationLogin";

// Iconos
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Modal y Store
import { useAuthStore } from "@/stores/useAuthStore";
import Animated, { FadeIn } from "react-native-reanimated";
import { ModalFeedback } from "../../components/Modals/ModalFeedback ";

interface LoginCredentials {
  email: string;
  contraseña: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [step] = useState(1);
  const { loginUsuario, error, loading, setLoading, setError } = useAuthStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [showPassword, setShowPassword] = useState(false);

  // Reset al montar
  useEffect(() => {
    setLoading(false);
    setError(null);
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    const response = await loginUsuario(
      credentials.email,
      credentials.contraseña
    );

    if (response?.access) {
      setModalType("success");
      setModalMessage("Inicio de sesión exitoso.");
      setModalVisible(true);
    } else {
      setModalType("error");
      setModalMessage(
        response?.message || "Ocurrió un error al iniciar sesión."
      );
      setModalVisible(true);
      setLoading(false); // 🔁 Esto evita que el botón quede tildado
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-[#1e1e1e] rounded-2xl p-6 w-full max-w-md border border-orange-900">
            {/* Icono */}
            <View className="bg-orange-900 rounded-full mx-32 py-2 items-center">
              <MaterialIcons name="input" size={24} color="orange" />
            </View>

            {/* Títulos */}
            <View className="items-center">
              <Text className="text-2xl px-10 mt-3 font-bold text-orange-600">
                Bienvenido de nuevo
              </Text>
              <Text className="text-white text-xs mb-5">
                Inicia sesión para continuar usando TuColectivo
              </Text>
            </View>

            <Formik
              initialValues={{ email: "", contraseña: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <View className="space-y-5">
                  {/* Email */}
                  {step === 1 && (
                    <View>
                      <Text className="text-white mb-1">Email</Text>
                      <View
                        className={`flex-row items-center rounded-lg px-3 ${
                          touched.email && errors.email
                            ? "border border-red-500"
                            : "bg-[#2a2a2a]"
                        }`}
                      >
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={20}
                          color="#FFA500"
                        />
                        <TextInput
                          className="flex-1 text-white py-3 ml-2"
                          placeholder="tu@email.com"
                          placeholderTextColor="#999"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Animated.Text
                          entering={FadeIn}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.email}
                        </Animated.Text>
                      )}
                    </View>
                  )}

                  {/* Contraseña */}
                  <View>
                    <Text className="text-white mb-1">Contraseña</Text>
                    <View
                      className={`flex-row items-center rounded-lg px-3 ${
                        touched.contraseña && errors.contraseña
                          ? "border border-red-500"
                          : "bg-[#2a2a2a]"
                      }`}
                    >
                      <AntDesign name="lock1" size={20} color="#FFA500" />
                      <TextInput
                        className="flex-1 text-white py-3 ml-2"
                        placeholder="******"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("contraseña")}
                        onBlur={handleBlur("contraseña")}
                        value={values.contraseña}
                      />
                      <Pressable
                        onPress={() => setShowPassword((prev) => !prev)}
                      >
                        <MaterialCommunityIcons
                          name={showPassword ? "eye-off" : "eye"}
                          size={22}
                          color="#FFA500"
                        />
                      </Pressable>
                    </View>
                    {touched.contraseña && errors.contraseña && (
                      <Animated.Text
                        entering={FadeIn}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.contraseña}
                      </Animated.Text>
                    )}
                  </View>

                  {/* Botón de login */}
                  <Pressable
                    onPress={() => handleSubmit()}
                    className="mt-6 bg-orange-600 py-3 rounded-xl items-center"
                    disabled={loading}
                    style={{ opacity: loading ? 0.6 : 1 }}
                  >
                    <Text className="font-bold text-white">
                      {loading ? "Cargando..." : "Iniciar Sesión"}
                    </Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Modal de éxito o error */}
      <ModalFeedback
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={() => {
          setModalVisible(false);
          if (modalType === "success") {
            router.replace("/(tabs)");
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginForm;
