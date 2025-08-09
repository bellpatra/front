// lib/users.ts
import bcrypt from "bcryptjs";

export const users = [
  {
    id: "1",
    name: "Ajay Kumar",
    email: "admin@admin.com",
    password: bcrypt.hashSync("password", 10),
  },
];
