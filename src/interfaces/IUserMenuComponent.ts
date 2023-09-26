import { SafeUser } from "@/types";

export interface IUserMenuComponent {
    currentUser: SafeUser | null;
    closeUserMenu: () => void
}