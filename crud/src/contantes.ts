// src/contantes.ts

export const API = 'http://localhost:3000/api/products';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

export interface ITarea {
  id: number;
  name: string;
  price: number;
  available: boolean;
}
