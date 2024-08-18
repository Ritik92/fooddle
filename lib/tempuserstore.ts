// lib/tempUsersStore.ts
import fs from 'fs';
import path from 'path';

interface TempUser {
  username: string;
  password: string;
  expires: number;
}

class TempUsersStore {
  private static instance: TempUsersStore;
  private filePath: string;

  private constructor() {
    this.filePath = path.join(process.cwd(), 'temp-users.json');
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({}));
    }
  }

  public static getInstance(): TempUsersStore {
    if (!TempUsersStore.instance) {
      TempUsersStore.instance = new TempUsersStore();
    }
    return TempUsersStore.instance;
  }

  private readStore(): Record<string, TempUser> {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  private writeStore(data: Record<string, TempUser>): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  public set(email: string, user: TempUser): void {
    const store = this.readStore();
    store[email] = user;
    this.writeStore(store);
  }

  public get(email: string): TempUser | undefined {
    const store = this.readStore();
    return store[email];
  }

  public delete(email: string): boolean {
    const store = this.readStore();
    if (email in store) {
      delete store[email];
      this.writeStore(store);
      return true;
    }
    return false;
  }

  public has(email: string): boolean {
    const store = this.readStore();
    return email in store;
  }

  public clear(): void {
    this.writeStore({});
  }
}

export default TempUsersStore.getInstance();