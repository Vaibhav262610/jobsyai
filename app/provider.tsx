"use client";

import { supabase } from "@/services/supabaseClient";
import React, { useEffect, ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await CreateNewUser(session.user);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const CreateNewUser = async (user: any) => {
    const { data: existingUsers, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    if (error) {
      console.error("Error checking for existing user:", error);
      return;
    }

    if (existingUsers && existingUsers.length === 0) {
      const { data, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            name: user.user_metadata?.name,
            email: user.email,
            picture: user.user_metadata?.picture,
        },
    ]);
    const insertedUser = {
            name: user.user_metadata?.name,
            email: user.email,        
        }
        // console.log(user);
        

      if (insertError) {
        console.error("Error inserting user:", insertError);
      } else {
        console.log("✅ User inserted:", insertedUser);
      }
    }
  };

  return <>{children}</>;
};

export default Provider;
