"use client";

import { supabase } from "@/services/supabaseClient";
import React, {
  useEffect,
  ReactNode,
  useState,
  createContext,
  useContext,
} from "react";
import { User } from "@supabase/supabase-js";

type ExtendedUser = User & {
  credits: number;
  name?: string;
  picture?: string;
};

type UserContextType = {
  user: ExtendedUser | null;
};

const UserContext = createContext<UserContextType>({ user: null });

export const useUser = () => useContext(UserContext);

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const fullUser = await fetchExtendedUser(session.user);
        setUser(fullUser);
      }
    };

    syncUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const fullUser = await fetchExtendedUser(session.user);
          setUser(fullUser);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchExtendedUser = async (authUser: User): Promise<ExtendedUser> => {
    const { data, error } = await supabase
      .from("Users")
      .select("credits, name, picture")
      .eq("email", authUser.email)
      .single();

    if (error || !data) {
      console.log("Error fetching user profile:", error);
      return {
        ...authUser,
        credits: 0,
      };
    }

    return {
      ...authUser,
      credits: data.credits,
      name: data.name,
      picture: data.picture,
    };
  };

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
