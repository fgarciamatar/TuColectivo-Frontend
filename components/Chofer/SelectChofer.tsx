import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSendLocation } from "../../hooks/choferHook";

export default function HomeScreen() {
  // busId (por ahora hardcodeado)
const [selectChofer, setSelectChofer] = useState(0)

  const busId = 'bus-123';
  useSendLocation(busId);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f97316' }}>
        TuColectivo Chofer
      </Text>
      <Text style={{ marginTop: 20 }}>Transmitiendo ubicación...</Text>
    </View>
  );
}
