import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appRouter } from './routers';
import { createCallerFactory } from './_core/trpc';

// Mock the notification module
vi.mock('./_core/notification', () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the database
vi.mock('./db', () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue({}),
    }),
  }),
}));

describe('Inquiry Router', () => {
  const createCaller = createCallerFactory(appRouter);
  
  const mockCtx = {
    user: null,
    req: {} as any,
    res: {
      clearCookie: vi.fn(),
    } as any,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit inquiry with valid data', async () => {
    const caller = createCaller(mockCtx);
    
    const result = await caller.inquiry.submit({
      name: 'テスト太郎',
      email: 'test@example.com',
      companyName: 'テスト株式会社',
      phone: '03-1234-5678',
      product: 'K-SLIM',
      message: 'テストメッセージです',
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain('お問い合わせを送信しました');
  });

  it('should submit inquiry with only required fields', async () => {
    const caller = createCaller(mockCtx);
    
    const result = await caller.inquiry.submit({
      name: 'テスト太郎',
      email: 'test@example.com',
    });

    expect(result.success).toBe(true);
  });

  it('should reject inquiry with empty name', async () => {
    const caller = createCaller(mockCtx);
    
    await expect(
      caller.inquiry.submit({
        name: '',
        email: 'test@example.com',
      })
    ).rejects.toThrow();
  });

  it('should reject inquiry with invalid email', async () => {
    const caller = createCaller(mockCtx);
    
    await expect(
      caller.inquiry.submit({
        name: 'テスト太郎',
        email: 'invalid-email',
      })
    ).rejects.toThrow();
  });
});
