import { router, Tabs, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  getMainNavigationBarHeight,
  MainNavigationBar,
  type MainTab,
} from '@/components/main-navigation-bar';

const MAIN_TAB_ROOTS: Record<MainTab, Href> = {
  projects: '/projects',
  discover: '/discover',
  profile: '/profile',
};

function getMainTab(routeName: string | undefined): MainTab | null {
  switch (routeName) {
    case 'projects':
    case 'discover':
    case 'profile':
      return routeName;
    default:
      return null;
  }
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const navigationBarHeight = getMainNavigationBarHeight(insets.bottom);

  return (
    <Tabs
      tabBar={({ state, navigateToTab, insets: tabBarInsets }) => {
        const activeTab = getMainTab(state.routes[state.index]?.name);
        const navigateTo = (tab: MainTab) => {
          const route = state.routes.find((candidate) => candidate.name === tab);
          if (!route) {
            return;
          }

          if (route.key === state.routes[state.index]?.key) {
            router.dismissTo(MAIN_TAB_ROOTS[tab]);
          } else {
            navigateToTab(route.key);
          }
        };

        return (
          <MainNavigationBar
            accessibilityRole="tab"
            activeTab={activeTab}
            bottomInset={tabBarInsets.bottom}
            onDiscoverPress={() => navigateTo('discover')}
            onProfilePress={() => navigateTo('profile')}
            onProjectsPress={() => navigateTo('projects')}
          />
        );
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: navigationBarHeight },
      }}>
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarAccessibilityLabel: 'Projects',
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarAccessibilityLabel: 'Discover',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}
