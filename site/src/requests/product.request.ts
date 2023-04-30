export const listProducts = ({ ...props }: { id_type: number }) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL_API}/products/list`, {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
};
