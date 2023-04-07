import { User } from "../types";

export const createUser = ({ ...props }: Omit<User, "use_delete">) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}/users`, {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
};
