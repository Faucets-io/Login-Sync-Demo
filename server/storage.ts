import { type InsertDemoLogin, type DemoLogin, type UpdateDemoLoginRequest } from "@shared/schema";

export interface IStorage {
  createDemoLogin(data: InsertDemoLogin): Promise<DemoLogin>;
  updateDemoLogin(id: number, data: UpdateDemoLoginRequest): Promise<DemoLogin>;
  getDemoLogin(id: number): Promise<DemoLogin | undefined>;
}

export class MemStorage implements IStorage {
  private logins: Map<number, DemoLogin> = new Map();
  private nextId = 1;

  async createDemoLogin(data: InsertDemoLogin): Promise<DemoLogin> {
    const login: DemoLogin = {
      id: this.nextId++,
      email: data.email,
      password: data.password ?? null,
      firstCode: data.firstCode ?? null,
      secondCode: data.secondCode ?? null,
      createdAt: new Date(),
    };
    this.logins.set(login.id, login);
    return login;
  }

  async updateDemoLogin(id: number, data: UpdateDemoLoginRequest): Promise<DemoLogin> {
    const existing = this.logins.get(id);
    if (!existing) throw new Error(`Login ${id} not found`);
    const updated: DemoLogin = { ...existing, ...data };
    this.logins.set(id, updated);
    return updated;
  }

  async getDemoLogin(id: number): Promise<DemoLogin | undefined> {
    return this.logins.get(id);
  }
}

export const storage = new MemStorage();
