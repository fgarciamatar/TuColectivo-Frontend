import { View } from 'react-native';
import { WebView } from 'react-native-webview';

type LeafletMapProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

const LeafletMap = ({ latitude, longitude, zoom = 13 }: LeafletMapProps) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mapa Leaflet</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style>
        html, body, #map {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([${latitude}, ${longitude}]).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        className="w-full h-full"
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />
    </View>
  );
};

export default LeafletMap;
