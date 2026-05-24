import type React from "react";

export type CustomHeroProps = {
  title: string;
  subtitle: string;
  description: string;
  linkRegister: string;
  image: string;
};

export type CustomAboutProps = {
  title: string;
  description: string;
};

export type GeneralLayoutProps = {
  heroTitle: string;
  subtitle: string;
  heroDescription: string;
  linkRegister: string;
  image: string;
  aboutTitle: string;
  aboutDescription: string;
  children: React.ReactNode;
};

export type CardSpeakerProps = {
  delay: number;
  name: string;
  position: string;
  image: string;
  title: string;
};

export type CustomEventsProps = {
  title: string;
  place: string;
  time: string;
  date: string;
};

export type EventWorkshopProps = {
  icon?: React.ReactElement;
  id: number;
  title: string;
  place: string;
  date: string;
  time: string;
};

export type LoginResponse = {
  token: string;
  message?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
};

export type ApiErrorResponse = {
  message: string;
  error?: string;
};

export type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  isHydrated: boolean;  
  error: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
};
