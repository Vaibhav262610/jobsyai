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

// Define the context type
type UserContextType = {
  user: User | null;
};

const UserContext = createContext<UserContextType>({ user: null });

// Hook to consume user context
export const useUser = () => useContext(UserContext);

// Props type
type ProviderProps = {
  children: ReactNode;
};

// Your main provider component
const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Run on first load and also when auth changes
  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        await CreateNewUser(session.user);
      }
    };

    syncUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          await CreateNewUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const CreateNewUser = async (user: User) => {
    const { data: existingUsers, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    if (error) {
      console.error("Error checking for existing user:", error);
      return;
    }

    if (existingUsers?.length === 0) {
      const { error: insertError } = await supabase.from("Users").insert([
        {
          name: user.user_metadata?.name,
          email: user.email,
          picture: user.user_metadata?.picture,
        },
      ]);

      if (insertError) {
        console.error("Error inserting user:", insertError);
      } else {
        console.log("✅ User inserted:", {
          name: user.user_metadata?.name,
          email: user.email,
        });
      }
    }
  };

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
