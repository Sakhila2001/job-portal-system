import type { Request, Response } from "express";
import { registerCandidate, registerEmployer, resendWelcomeEmail, type CandidateRegisterDto, type EmployerRegisterDto } from "./register.service.js";

export async function registerCandidateHandler(req: Request, res: Response) {
  try {
    const dto = req.body as CandidateRegisterDto;
    const result = await registerCandidate(dto);
    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({ message });
  }
}

export async function registerEmployerHandler(req: Request, res: Response) {
  try {
    const dto = req.body as EmployerRegisterDto;
    const result = await registerEmployer(dto);
    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({ message });
  }
}

export async function resendWelcomeHandler(req: Request, res: Response) {
  try {
    const { email, role, name } = req.body as { email: string; role: "candidate" | "employer"; name: string };
    await resendWelcomeEmail(email, role, name);
    res.status(200).json({ message: "Welcome email resent." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to resend email";
    res.status(400).json({ message });
  }
}
