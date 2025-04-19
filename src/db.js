import { openDB } from 'idb';

const DB_NAME = 'Tienda';
const DB_VERSION = 2;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('providers')) {
        db.createObjectStore('providers', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('purchases')) {
        db.createObjectStore('purchases', { keyPath: 'id', autoIncrement: true });
      }      
    }
  });
};

// Utils
const getCurrentUser = () => {
  const user = localStorage.getItem('activeUser');
  return user ? JSON.parse(user) : null;
};

// Usuarios
export const addUser = async (user) => {
  const db = await initDB();
  return db.add('users', user);
};

export const getUsers = async () => {
  const db = await initDB();
  return db.getAll('users');
};

// Productos
export const addProduct = async (product) => {
  const db = await initDB();
  return db.add('products', product);
};

export const getProducts = async () => {
  const db = await initDB();
  return db.getAll('products');
};

export const deleteProduct = async (id) => {
  const db = await initDB();
  return db.delete('products', id);
};

export const updateProduct = async (product) => {
  const db = await initDB();
  return db.put('products', product);
};

// Carrito
export const addToCartInDB = async (item) => {
  const db = await initDB();
  const user = getCurrentUser();
  if (!user) return null;

  return db.add('cart', { ...item, userId: user.id });
};

export const getCartItems = async () => {
  const db = await initDB();
  const user = getCurrentUser();
  if (!user) return [];

  const all = await db.getAll('cart');
  return all.filter(item => item.userId === user.id);
};

export const updateCartItem = async (item) => {
  const db = await initDB();
  return db.put('cart', item);
};

export const deleteCartItem = async (id) => {
  const db = await initDB();
  return db.delete('cart', id);
};

// Proveedores
export const addProvider = async (provider) => {
  const db = await initDB();
  return db.add('providers', provider);
};

export const getProviders = async () => {
  const db = await initDB();
  return db.getAll('providers');
};

export const updateProvider = async (provider) => {
  const db = await initDB();
  return db.put('providers', provider);
};

export const deleteProvider = async (id) => {
  const db = await initDB();
  return db.delete('providers', id);
};
export const addPurchase = async (purchase) => {
  const db = await initDB();
  return db.add('purchases', purchase);
};

export const getPurchases = async () => {
  const db = await initDB();
  return db.getAll('purchases');
};
