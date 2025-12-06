
import { Tabs } from 'expo-router';
import { Home, Search, Heart, Users, Calendar } from 'lucide-react-native';
import { useUserStore } from '../../src/store/userStore';

export default function MainLayout() {
  const user = useUserStore(state => state.user);
  const role = user?.currentRole || 'guest';

  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#005B78',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'Properties',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="shortlist"
        options={{
          title: 'Shortlist',
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
       <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          href: role === 'broker' ? '/leads' : null,
        }}
      />
       <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
          href: (role === 'broker' || role === 'guest') ? '/bookings' : null,
        }}
      />
    </Tabs>
  );
}
