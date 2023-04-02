import { User } from "../types";

export const auth = (props: Pick<User, "email" | "password">) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
        method: "POST",
        body: JSON.stringify(props)
    });
};
