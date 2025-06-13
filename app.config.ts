import 'dotenv/config';

export default {
  expo: {
    name: "TuColectivo",
    slug: "tucolectivo",
    version: "1.0.0",
    sdkVersion: "53.0.0", // Ajustá a tu versión de SDK
    extra: {
      API: process.env.API
    }
  }
};
