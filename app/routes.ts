// import { type RouteConfig, index } from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/home.tsx"),
  route("/auth/signup", "./../shared/components/auth/Signup.tsx"),
  route("/auth/login", "./../shared/components/auth/Login.tsx"),
  route("/user/:username", "./routes/users.tsx"),
  route("*", "./../shared/components/Error404.tsx")
] satisfies RouteConfig;
