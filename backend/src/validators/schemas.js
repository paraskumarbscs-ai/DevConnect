import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(120),
  password: z.string().min(8).max(72)
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(2000),
  techStack: z.array(z.string().trim().min(1).max(40)).max(15).default([]),
  repositoryUrl: z.string().url().or(z.literal("")).optional(),
  demoUrl: z.string().url().or(z.literal("")).optional(),
  status: z.enum(["planning", "in-progress", "completed"]).optional()
});
