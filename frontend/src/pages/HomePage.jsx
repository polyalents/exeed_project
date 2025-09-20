import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto section-padding py-4">
          <h1 className="text-2xl font-bold text-exeed-dark">
            EXEED & EXLANTIX
          </h1>
          <p className="text-exeed-gray">
            Официальные дилеры в Ростовской области
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto section-padding py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Добро пожаловать!
          </h2>
          <button className="btn-primary">
            Записаться на тест-драйв
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomePage
