import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const LegalLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Хедер */}
      <Header />

      {/* Контент */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-8 sm:px-12 md:px-16 pt-[130px] pb-24 leading-relaxed">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-black tracking-tight">
          {title}
        </h1>
        <div className="space-y-8 text-[17px] text-justify">{children}</div>
      </main>

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default LegalLayout;
