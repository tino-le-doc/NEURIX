import { apiHandler } from "@/lib/apiHandler";
import { signupSchema } from "@/lib/validators";
import { createUser } from "@/lib/users";
import logger from "@/lib/logger";

export default apiHandler({
  POST: async (req, res) => {
    const data = signupSchema.parse(req.body);
    const user = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    logger.info("user signup", { userId: user.id });
    return res.status(201).json({ user });
  },
});
