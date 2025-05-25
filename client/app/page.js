import Image from "next/image";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./(pages)/login/page";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
}
