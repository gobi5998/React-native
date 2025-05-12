import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property } from '../types';

interface FavoritesContextType {
  favorites: Property[];
  addToFavorites: (property: Property) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  const addToFavorites = (property: Property) => {
    setFavorites(prev => [...prev, { ...property, isFavorite: true }]);
  };

  const removeFromFavorites = (propertyId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== propertyId));
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(p => p.id === propertyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 