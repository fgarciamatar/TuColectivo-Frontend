import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const ModalFeedback: React.FC<Props> = ({
  visible,
  message,
  type,
  onClose,
}) => {
  const icon = type === "success" ? "checkmark-circle" : "close-circle";
  const color = type === "success" ? "#ea580c" : "#ff4c4c";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
        <View style={styles.modal}>
          <Ionicons name={icon} size={60} color={color} />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: color }]}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#1e1e1e",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    borderColor: "#ea580c",
    borderWidth: 1,
    width: "80%",
  },
  message: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
