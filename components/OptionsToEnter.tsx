import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Pressable, Text } from "react-native";

interface OptionsToEnterProps {
  text: string;
  url: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
}

export const OptionsToEnter: FC<OptionsToEnterProps> = ({ text, url, iconName }) => {
  const router = useRouter();

  const handlePress = () => {
      router.push(url);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-center px-4 py-4 border-b border-neutral-700 active:bg-neutral-800"
    >
      <MaterialIcons name={iconName} size={24} color="#ccc" className="mr-4" />
      <Text className="text-base text-white pl-3">{text}</Text>
    </Pressable>
  );
};
