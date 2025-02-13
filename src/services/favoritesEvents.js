export const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

export const favoritesEvents = {
  emit: () => {
    window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT));
  },
  
  subscribe: (callback) => {
    window.addEventListener(FAVORITES_CHANGED_EVENT, callback);
    return () => window.removeEventListener(FAVORITES_CHANGED_EVENT, callback);
  }
};