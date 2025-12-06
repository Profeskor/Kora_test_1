
import { Redirect } from 'expo-router';
import { useUserStore } from '../src/store/userStore';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const user = useUserStore(state => state.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate splash/loading
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#005B78" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(main)" />;
  }

  return <Redirect href="/landing" />;
}
