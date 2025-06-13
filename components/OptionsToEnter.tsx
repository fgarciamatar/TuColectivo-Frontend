import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";


const router = useRouter();

export default function OptionsToEnter (text:string, route: any) {
    return (
        <Pressable 
        onPress={() => {
            router.push(`/${route}`)
        }}
        >
            <Text> {text} </Text>
        </Pressable>
    )
}