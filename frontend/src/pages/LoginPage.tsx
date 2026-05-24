"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

declare global {
  interface Window {
    AOS: {
      init: (options?: unknown) => void;
      refresh: () => void;
    };
  }
}

const LoginPage: React.FC = () => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const { token, isLoading, error: authError, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const cssLink = document.createElement("link");
    cssLink.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    script.async = true;
    script.onload = () => {
      if (window.AOS) {
        window.AOS.init({ duration: 1000, once: true });
      }
    };
    document.body.appendChild(script);

    return () => {
      try {
        document.head.removeChild(cssLink);
        document.body.removeChild(script);
      } catch (e) {
        console.warn("Gagal membersihkan AOS script/link.", e);
      }
    };
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(nim, password);

    } catch (err: unknown) {
      const error = err as Error;
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-100 p-6">
      <div
        data-aos="fade-up"
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl"
      >
        {/* --- Header --- */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#852e4e]">Selamat Datang!</h1>
          <p className="mt-2 text-slate-500">Silakan login untuk melanjutkan</p>
        </div>

        {/* --- Form Login --- */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nim"
              className="block text-sm font-medium text-slate-700"
            >
              NIM
            </label>
            <input
              type="text"
              id="nim"
              name="nim"
              required
              className="block w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#852e4e] focus:border-[#852e4e] sm:text-sm"
              placeholder="24090034"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              disabled={isLoading}
            />

          </div>
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="block w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#852e4e] focus:border-[#852e4e] sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {authError && (
            <div
              data-aos="zoom-in"
              className="p-3 text-center text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg"
            >
              {authError}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#852e4e] hover:bg-[#4c1d3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#852e4e] font-semibold transition duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
