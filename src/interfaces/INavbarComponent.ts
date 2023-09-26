import { SafeUser } from "@/types";

export interface INavbarComponent {
    myUser: SafeUser | null;
    basketItems: any;
}