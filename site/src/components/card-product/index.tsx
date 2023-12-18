import { ProductType } from "@/types/entity/entity.type";
import Link from "next/link";

const CardProduct = ({ product }: { product: ProductType }) => {
    return (
        <>
            {product && (
                <Link href={`/product/${product?.id}`} className="w-52 rounded-sm bg-white p-1">
                    <div
                        className="rounded-sm w-full h-28 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${product?.files?.[0].file?.fil_url ?? ""})` }}
                    />

                    <p className="text-sm text-black mt-1">{product?.pro_name}</p>
                </Link>
            )}
        </>
    );
};

export default CardProduct;
