import { Tabs } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function TabLayout() {
  

  return (
    <Tabs
     >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <IconSymbol size={24} name="house.fill" color={focused?"blue":"gray" } />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ focused }) => <IconSymbol size={24} name="paperplane.fill" color={focused?"blue":"gray" } />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => <FontAwesome name="star" size={24} color={focused?"blue":"gray" } />,
          headerShown: false,
        }}
      />
      
      
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => <Feather name="more-horizontal" size={24} color={focused?"blue":"gray" } />,
          headerShown: false,
        }}
      />

    </Tabs>
  );
}
