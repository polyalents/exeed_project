// src/pages/PolicyPage.jsx
import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const PolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">Политика конфиденциальности</h1>
        <p className="mb-4">
          Юридическое наименование: ООО «АТЛАНТ МОТОРС»  
          <br />ИНН: 6167104657  
          <br />ОГРНИП: 1116195010689  
          <br />Юр. адрес: 344019, Ростов-на-Дону, ул. 14-Я Линия, дом 50, офис 801 Б
        </p>
        <p className="mb-4">
          Настоящая политика обработки персональных данных составлена в соответствии с ФЗ
          «О персональных данных» № 152-ФЗ и определяет порядок обработки и меры по
          обеспечению безопасности данных...
        </p>
        {/* тут твой длинный текст Политики */}
      </main>
      <Footer />
    </div>
  );
};

export default PolicyPage;
