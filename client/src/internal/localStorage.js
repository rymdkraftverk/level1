const keyPrefix = 'level1';

const { localStorage } = window;

const prefixKey = (key) => `${keyPrefix}.${key}`;

export const save = (key, obj) => {
  localStorage.setItem(prefixKey(key), JSON.stringify(obj));
};

export const restore = (key) => JSON.parse(localStorage.getItem(prefixKey(key)) || null);

export const remove = (key) => {
  localStorage.removeItem(prefixKey(key));
};