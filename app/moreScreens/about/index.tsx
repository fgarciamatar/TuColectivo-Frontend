import { SafeAreaView, Text, View } from 'react-native'

export default function AboutScreen() {
    return (
        <SafeAreaView className='flex-1 bg-slate-800 relative justify-center items-center'>
            <View>
                <Text className='text-white font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dicta. Nisi nostrum necessitatibus aut ab facere illo tempore odio esse eaque expedita magnam officia delectus corporis nemo, dolore perferendis reprehenderit!</Text>
            </View>
        </SafeAreaView>
    )
}