export class LocalStorage {
  static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clearStorage() {
    localStorage.clear();
  }
}
