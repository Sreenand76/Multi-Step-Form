"use client";

import {  DarkModeProvider} from "@/components/context/DarkModeContext";
import { FormProvider } from "@/components/context/FormContext";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MultiStepForm from "@/components/layout/MultiStepForm";


export default function HomePage() {
  
  return (
    <DarkModeProvider>
    <main className= "dark:bg-[#0f0f0f] dark:text-white bg-gray-100 text-black min-h-screen">      
        <Header />
        <FormProvider>
        <MultiStepForm/>
        </FormProvider>
        <Footer />      
    </main>
    </DarkModeProvider>
  );
}
