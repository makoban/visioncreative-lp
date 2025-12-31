import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import { getDb } from "./db";
import { inquiries } from "../drizzle/schema";

// お問い合わせフォームのバリデーションスキーマ
const inquirySchema = z.object({
  companyName: z.string().optional(),
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().optional(),
  product: z.string().optional(),
  message: z.string().optional(),
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // お問い合わせ送信
  inquiry: router({
    submit: publicProcedure
      .input(inquirySchema)
      .mutation(async ({ input }) => {
        try {
          // データベースに保存
          const db = await getDb();
          if (db) {
            await db.insert(inquiries).values({
              companyName: input.companyName || null,
              name: input.name,
              email: input.email,
              phone: input.phone || null,
              product: input.product || null,
              message: input.message || null,
            });
          }

          // オーナーに通知を送信
          const notificationContent = `
【新規お問い合わせ】

会社名・店舗名: ${input.companyName || "未入力"}
お名前: ${input.name}
メールアドレス: ${input.email}
電話番号: ${input.phone || "未入力"}
興味のある製品: ${input.product || "未選択"}

お問い合わせ内容:
${input.message || "未入力"}

---
このお問い合わせはvisioncreativeランディングページから送信されました。
返信先: ${input.email}
          `.trim();

          await notifyOwner({
            title: `【visioncreative】${input.name}様からのお問い合わせ`,
            content: notificationContent,
          });

          return {
            success: true,
            message: "お問い合わせを送信しました。担当者より折り返しご連絡いたします。",
          };
        } catch (error) {
          console.error("[Inquiry] Failed to submit inquiry:", error);
          return {
            success: false,
            message: "送信に失敗しました。時間をおいて再度お試しください。",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
