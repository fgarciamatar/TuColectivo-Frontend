import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { ModalFeedback } from "../../components/Modals/ModalFeedback ";
import { useAuthStore } from "../../stores/useAuthStore";

interface FormState {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  celular: string;
  contraseña: string;
  confirmContraseña: string;
}

const initialForm: FormState = {
  nombre: "",
  apellido: "",
  email: "",
  dni: "",
  celular: "",
  contraseña: "",
  confirmContraseña: "",
};

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<{ [K in keyof FormState]?: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const router = useRouter();

  const registroUsuario = useAuthStore((state) => state.registroUsuario);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (): boolean => {
    let newErrors: { [K in keyof FormState]?: string } = {};

    if (step === 1) {
      if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
      if (!form.apellido.trim())
        newErrors.apellido = "El apellido es obligatorio.";
    }

    if (step === 2) {
      if (!form.email.includes("@")) newErrors.email = "Email inválido.";
      if (form.dni.length < 7) newErrors.dni = "DNI inválido.";
      if (form.celular.length < 6) newErrors.celular = "Número inválido.";
    }

    if (step === 3) {
      if (form.contraseña.length < 6)
        newErrors.contraseña = "Mínimo 6 caracteres.";
      if (form.contraseña !== form.confirmContraseña)
        newErrors.confirmContraseña = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateStep()) {
      setModalType("error");
      setModalMessage("Por favor, completá correctamente todos los campos.");
      setModalVisible(true);
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      const { confirmContraseña, ...userData } = form;

      try {
        await registroUsuario(userData);
        setModalType("success");
        setModalMessage("Usuario registrado correctamente.");
        setModalVisible(true);
      } catch (error: any) {
        setModalType("error");
        setModalMessage(error.message || "No se pudo registrar.");
        setModalVisible(true);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <LabelledInput
              icon="person"
              label="¿Cuál es tu nombre?"
              placeholder="Nombre completo"
              value={form.nombre}
              onChangeText={(v) => handleChange("nombre", v)}
              error={errors.nombre}
            />
            <LabelledInput
              icon="person-outline"
              label="¿Cuál es tu apellido?"
              placeholder="Apellido"
              value={form.apellido}
              onChangeText={(v) => handleChange("apellido", v)}
              error={errors.apellido}
            />
          </>
        );
      case 2:
        return (
          <>
            <LabelledInput
              icon="mail"
              label="¿Cuál es tu email?"
              placeholder="ejemplo@email.com"
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
              keyboardType="email-address"
              error={errors.email}
            />
            <LabelledInput
              icon="card"
              label="¿Cuál es tu DNI?"
              placeholder="DNI"
              value={form.dni}
              onChangeText={(v) => handleChange("dni", v)}
              keyboardType="numeric"
              error={errors.dni}
            />
            <LabelledInput
              icon="call"
              label="¿Cuál es tu celular?"
              placeholder="Celular"
              value={form.celular}
              onChangeText={(v) => handleChange("celular", v)}
              keyboardType="phone-pad"
              error={errors.celular}
            />
          </>
        );
      case 3:
        return (
          <>
            <LabelledInput
              icon="lock-closed"
              label="Crea una contraseña"
              placeholder="Contraseña"
              value={form.contraseña}
              onChangeText={(v) => handleChange("contraseña", v)}
              secureTextEntry
              error={errors.contraseña}
            />
            <LabelledInput
              icon="lock-open"
              label="Confirma tu contraseña"
              placeholder="Confirmar"
              value={form.confirmContraseña}
              onChangeText={(v) => handleChange("confirmContraseña", v)}
              secureTextEntry
              error={errors.confirmContraseña}
            />
          </>
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          {/* Indicador de pasos */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {[1, 2, 3].map((s) => (
              <View
                key={s}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  backgroundColor: step === s ? "#ea580c" : "#888",
                }}
              />
            ))}
          </View>

          <View
            style={{
              backgroundColor: "#1e1e1e",
              padding: 20,
              borderRadius: 10,
              borderColor: "#ea580c",
              borderWidth: 1,
            }}
          >
            {renderStep()}

            <TouchableOpacity
              onPress={handleContinue}
              style={{
                marginTop: 20,
                backgroundColor: "#ea580c",
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {step < 3 ? "Continuar" : "Registrarse"}
              </Text>
            </TouchableOpacity>

            <Text style={{ marginTop: 15, textAlign: "center", color: "#aaa" }}>
              ¿Ya tienes una cuenta?{" "}
              <Text style={{ color: "#ea580c" }}>Inicia sesión</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ModalFeedback
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={() => {
          setModalVisible(false);
          if (modalType === "success") {
            router.replace("/login");
          }
        }}
      />
    </SafeAreaView>
  );
}

interface LabelledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
}

const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  icon,
  error,
  ...props
}) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={{ color: "white", marginBottom: 5 }}>{label}</Text>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2a2a2a",
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: error ? "red" : "#2a2a2a",
      }}
    >
      <Ionicons name={icon} size={20} color="#aaa" style={{ marginRight: 8 }} />
      <TextInput
        {...props}
        style={{
          flex: 1,
          color: "white",
          paddingVertical: 10,
        }}
        placeholderTextColor="#888"
      />
    </View>
    {error && (
      <Animated.Text
        entering={FadeIn}
        style={{ color: "red", marginTop: 4, fontSize: 12 }}
      >
        {error}
      </Animated.Text>
    )}
  </View>
);
