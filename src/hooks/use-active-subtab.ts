import { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

export type SubTabRouteGroup = {
  key: string;
  routes: readonly string[];
};

export function useActiveSubTab(
  routeGroups: readonly SubTabRouteGroup[],
  defaultKey: string,
) {
  const pathname = usePathname();
  const matchingKey =
    routeGroups.find((group) => group.routes.includes(pathname))?.key;
  const [lastActiveKey, setLastActiveKey] = useState(
    matchingKey ?? defaultKey,
  );

  useEffect(() => {
    if (matchingKey) {
      setLastActiveKey(matchingKey);
    }
  }, [matchingKey]);

  return matchingKey ?? lastActiveKey;
}
