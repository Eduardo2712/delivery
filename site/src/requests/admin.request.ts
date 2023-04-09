import { TypeFormRegister } from "@/app/auth/register/util";

export const createAdmin = ({ ...props }: TypeFormRegister & { type: number | null }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}/admins`, {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
};
