import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageProgressService {
  private readonly prefix = 'course-app_';

  public setItem(key: string, value: any): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to LocalStorage', error);
    }
  }

  public getItem(key: string): any {
    try {
      const value = localStorage.getItem(this.prefix + key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from LocalStorage', error);
      return null;
    }
  }

  public removeItem(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error deleting from LocalStorage', error);
    }
  }
}
