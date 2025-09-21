// src/context/ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';
import CallbackModal from '../components/modals/CallbackModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}

      {/* Глобальные модалки */}
      <CallbackModal 
        isOpen={activeModal === 'callback'} 
        onClose={closeModal} 
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
