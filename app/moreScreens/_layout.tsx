import { Stack } from 'expo-router';

export default function MoreScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="configuration/index"
        options={{
          headerTitle: 'Tu Colectivo',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#121212' },
        }}
      />
      <Stack.Screen
        name="about/index"
        options={{
          headerTitle: 'Tu Colectivo',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#121212' },
        }}
      />
      <Stack.Screen
        name="profile/[dni]"
        options={{
          headerTitle: 'Tu Perfil',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#121212' },
        }}
      />
    </Stack>
  );
}
