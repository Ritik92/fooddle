// libs/useUser.ts (useUser Hook)

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Adjust based on how you manage sessions

// Named Export of useUser Hook
export function useUser() {
  const [userID, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      setUser((session.user as any).id); // Assuming the session has 'id'
    }
    setLoading(false);
  }, [session]);

  return { userID, loading };
}
