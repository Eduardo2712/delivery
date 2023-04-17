import { TypeFormRegister } from "@/app/auth/register/util";

export const createUser = ({ ...props }: TypeFormRegister) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}/users`, {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
};
