// src/firebase/index.d.ts
declare module '@/firebase/init.js' {
    import { Auth } from 'firebase/auth';
    import { Firestore } from 'firebase/firestore';
  
    export const auth: Auth;
    export const db: Firestore;
  }
  