import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

export const getCurrentSession = () => getServerSession(authOptions);
