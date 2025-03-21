import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "./Header/Header";
import React, { useEffect, useState } from "react";
import NAVBAR from "../../shared/components/nav/NAVBAR";





// This is the route configuration for the home page.
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Hello from Vercel" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />;
}
