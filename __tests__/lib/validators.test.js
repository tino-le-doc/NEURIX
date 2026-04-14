import {
  signupSchema,
  loginSchema,
  projectSchema,
  jobSchema,
} from "@/lib/validators";

describe("signupSchema", () => {
  it("accepts a valid signup payload", () => {
    const result = signupSchema.safeParse({
      name: "Jean Dupont",
      email: "jean@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = signupSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const result = signupSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      password: "password123",
      confirmPassword: "password456",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      name: "Jean",
      email: "not-an-email",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "jean@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });
});

describe("projectSchema", () => {
  it("accepts a valid project", () => {
    const result = projectSchema.safeParse({
      name: "Mon projet",
      description: "Description du projet",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty project name", () => {
    const result = projectSchema.safeParse({
      name: "",
      description: "Description",
    });
    expect(result.success).toBe(false);
  });
});

describe("jobSchema", () => {
  it("accepts a valid job submission", () => {
    const result = jobSchema.safeParse({
      title: "Generate summary",
      model: "gpt-3",
      prompt: "Summarize this text...",
    });
    expect(result.success).toBe(true);
  });

  it("rejects unknown models", () => {
    const result = jobSchema.safeParse({
      title: "Test",
      model: "unknown-model",
      prompt: "Test",
    });
    expect(result.success).toBe(false);
  });
});
