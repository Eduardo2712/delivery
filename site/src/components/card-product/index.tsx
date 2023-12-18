import { ProductType } from "@/types/entity/entity.type";
import { formatBRL, formatDecimal } from "@/utils/other";
import Link from "next/link";

const CardProduct = ({ product }: { product: ProductType }) => {
    return (
        <>
            {product && (
                <Link href={`/product/${product?.id}`} className="rounded-sm bg-white px-2 py-3 flex flex-row items-start h-40 hover:bg-gray-200">
                    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden flex-1 flex flex-col h-full">
                        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden flex-1">
                            <p className="text-md text-black font-semibold mt-1 overflow-ellipsis whitespace-nowrap overflow-hidden flex-1">
                                {product?.pro_name}
                            </p>

                            <p className="text-sm text-gray-700 mt-3">{product?.pro_description}</p>
                        </div>

                        <p className="text-md text-green-600 overflow-ellipsis whitespace-nowrap overflow-hidden">{formatBRL(product?.pro_price)}</p>
                    </div>

                    <div
                        className="rounded-sm w-44 h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${product?.files?.[0].file?.fil_url ?? ""})` }}
                    />
                </Link>
            )}
        </>
    );
};

export default CardProduct;
