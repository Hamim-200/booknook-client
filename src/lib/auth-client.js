import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// Used inside React components: sign in, sign up, sign out, read the session.
// jwtClient adds authClient.token(), which gives us the token for Express.
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;