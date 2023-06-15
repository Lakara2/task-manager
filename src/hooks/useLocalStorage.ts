import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  // Utiliser useState pour gérer la valeur dans le composant
  const [value, setValue] = useState<T>(() => {
    // Récupérer la valeur stockée dans le Local Storage, ou utiliser la valeur initiale si elle n'existe pas
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Utiliser useEffect pour sauvegarder automatiquement la valeur dans le Local Storage lorsqu'elle change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Renvoyer le tuple [value, setValue] pour permettre l'accès à la valeur et la mise à jour de celle-ci
  return [value, setValue];
};

export default useLocalStorage;