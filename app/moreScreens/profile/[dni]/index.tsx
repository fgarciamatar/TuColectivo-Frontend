import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfileHome() {
//   const { dni } = useLocalSearchParams();
    const dni = "1234567";

  return (
    <View className="p-6">
      <Text className="text-lg font-bold mb-4">Hola Usuario!</Text>

      <View className="flex-row justify-between space-x-4">
        <Link href={`/profile/${dni}/info`} asChild>
          <Pressable className="flex-1 bg-gray-200 p-4 rounded-lg items-center">
            <Text>Personal Info</Text>
          </Pressable>
        </Link>
        <Link href={`/profile/${dni}/security`} asChild>
          <Pressable className="flex-1 bg-gray-200 p-4 rounded-lg items-center">
            <Text>Security</Text>
          </Pressable>
        </Link>
        <Link href={`/profile/${dni}/privacy`} asChild>
          <Pressable className="flex-1 bg-gray-200 p-4 rounded-lg items-center">
            <Text>Privacy</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
