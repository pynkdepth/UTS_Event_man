"use client";

import { useState, useCallback, useEffect } from "react";
import { adminAPI } from "@/services/api";
import type { LoginResponse, AuthContextType } from "@/utils/types";

const API_BASE_URL = "" + import.meta.env.VITE_API_URL;

const handleResponse = async (res: Response) => {
  const text = await res.text();

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      msg = json.message ?? json.error ?? msg;
    } catch {
      msg = text.slice(0, 200) || msg;
    }
    throw new Error(msg);
  }

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

// Manual admin credentials (sesuai task)
const ADMIN_NIM = "24090034";
const ADMIN_PASSWORD = "admin123";


export const useAuth = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
      setIsHydrated(true);
    }
  }, []);

  const login = useCallback(
    async (emailOrNim: string, password: string): Promise<LoginResponse> => {
      setIsLoading(true);
      setError(null);
      try {
        // Task requirement: manual login using NIM + Password.
        if (emailOrNim.trim() !== ADMIN_NIM || password !== ADMIN_PASSWORD) {
          throw new Error("Invalid NIM or password");
        }

        // Backend: endpoint khusus NIM login untuk mengembalikan JWT.
        const response = await fetch(`${API_BASE_URL}/nim-auth/nim-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nim: ADMIN_NIM, password }),
        }).then(handleResponse);

        if (response && typeof response === "object" && "token" in response) {
          const loginResponse = response as LoginResponse;
          setToken(loginResponse.token);
          localStorage.setItem("authToken", loginResponse.token);
          return loginResponse;
        }

        throw new Error("Invalid response format: missing token");

      } catch (err: unknown) {
        let message = "Login failed";
        if (err instanceof Error) {
          message = err.message;
        } else if (typeof err === "object" && err !== null && "message" in err) {
          message = String((err as Record<string, unknown>).message);
        }
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );


  const logout = useCallback(async () => {
    if (token) {
      try {
        await adminAPI.logout(token);
      } catch (err) {
        console.log("[v0] Logout API error:", err);
      }
    }
    setToken(null);
    localStorage.removeItem("authToken");
  }, [token]);

  return { token, isLoading, error, login, logout, isHydrated: isHydrated };
};
