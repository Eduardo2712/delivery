import { ProductType } from "@/types/entity/entity.type";
import { formatBRL } from "@/utils/other";
import { useState } from "react";
import ReactModal from "../react-modal";
import { FaStar } from "react-icons/fa6";
import CountItems from "../count-items";

type Props = {
    product: ProductType;
};

type FormModal = {
    count: number;
    comentary: string;
    extras: Array<{ id: number; count: number }>;
};

const CardProduct = ({ product }: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formModal, setFormModal] = useState<FormModal>({
        count: 1,
        comentary: "",
        extras: []
    });

    const value_total = formModal.count * product?.pro_price + (formModal.extras.reduce((acc, a) => acc + a.count * product?.pro_price, 0) || 0);

    return (
        <>
            <button
                type="button"
                className="rounded-sm bg-white px-4 py-5 flex flex-row items-start h-44 hover:bg-gray-100"
                onClick={() => setOpenModal(true)}
            >
                <div className="overflow-ellipsis whitespace-nowrap overflow-hidden flex-1 flex flex-col h-full">
                    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden flex-1">
                        <p className="text-md text-start text-black font-semibold mt-1 overflow-ellipsis whitespace-nowrap overflow-hidden flex-1">
                            {product?.pro_name}
                        </p>

                        <div className="flex items-center gap-1 mt-1">
                            <FaStar size={16} className="text-yellow-500" />

                            <p className="text-sm text-start text-black font-semibold mt-1 overflow-ellipsis whitespace-nowrap overflow-hidden flex-1">
                                {product?.avg_rating ? Number(product?.avg_rating).toFixed(1) : "--"}
                            </p>
                        </div>

                        <p className="text-sm text-start text-gray-700 mt-3">{product?.pro_ingredients}</p>
                    </div>

                    <p className="text-md text-start text-green-600 overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {formatBRL(product?.pro_price)}
                    </p>
                </div>

                <div
                    className="rounded-sm w-44 h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${product?.image ? product?.image?.url : "/images/no_image.jpg"})` }}
                />
            </button>

            <ReactModal openModal={openModal} setOpenModal={setOpenModal}>
                <div className="flex flex-col md:flex-row gap-4 px-3">
                    <div className="flex justify-start md:justify-center">
                        <div
                            className="rounded-md md:w-96 w-full h-64 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${product?.image ? product?.image?.url : "/images/no_image.jpg"})` }}
                        />
                    </div>

                    <div className="flex flex-1 flex-col">
                        <p className="text-sm text-black font-medium text-center">{product?.pro_name}</p>

                        <div className="overflow-y-auto h-96 scroll-smooth">
                            <div className="flex items-center gap-1 mt-1">
                                <FaStar size={16} className="text-yellow-500" />

                                <p className="text-sm text-start text-black font-semibold mt-1 overflow-ellipsis whitespace-nowrap overflow-hidden flex-1">
                                    {product?.avg_rating ? Number(product?.avg_rating).toFixed(1) : "--"}
                                </p>
                            </div>

                            <p className="text-sm text-gray-800 mt-2">{product?.pro_ingredients}</p>

                            <p className="text-sm text-black font-semibold mt-3">{`Serves ${product?.pro_number_people} ${
                                product?.pro_number_people === 1 ? "person" : "people"
                            }`}</p>

                            <div className="flex justify-between items-center mt-3">
                                <p className="text-sm text-green-600">{formatBRL(product?.pro_price)}</p>
                            </div>

                            {product?.extras && product?.extras.length > 0 && (
                                <div className="mt-3">
                                    <div className="w-full bg-slate-100 px-2 py-2 rounded-sm">
                                        <p className="text-sm text-gray-800">Extras</p>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-6 px-4">
                                        {product.extras.map((extra) => {
                                            return (
                                                <div key={extra.id} className={`flex justify-between border-t-gray-200 py-4 border-b`}>
                                                    <div className="flex flex-col justify-between">
                                                        <div>
                                                            <p className="text-md text-gray-700">{extra.extra?.ext_name}</p>
                                                            <p className="text-sm text-gray-700">{formatBRL(Number(extra.extra?.ext_price))}</p>
                                                        </div>

                                                        <CountItems
                                                            count={0}
                                                            setCount={(count) =>
                                                                setFormModal((ant) => ({
                                                                    ...ant,
                                                                    extras: ant.extras.map((e) => (e.id === extra.id ? { ...e, count } : e))
                                                                }))
                                                            }
                                                        />
                                                    </div>

                                                    <div
                                                        className="rounded-md md:w-52 w-full h-32 bg-cover bg-center bg-no-repeat"
                                                        style={{
                                                            backgroundImage: `url(${
                                                                extra.extra?.image ? extra.extra?.image?.url : "/images/no_image.jpg"
                                                            })`
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="overflow-y-auto mt-6 mb-4">
                                <textarea
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 resize-none"
                                    placeholder="Any commentary?"
                                    value={formModal.comentary}
                                    onChange={(e) => setFormModal((ant) => ({ ...ant, comentary: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t-2 border-gray-100 mt-3 py-2 px-3">
                    <CountItems count={formModal.count} setCount={(value) => setFormModal((ant) => ({ ...ant, count: value }))} />

                    <button
                        type="button"
                        className="flex items-center justify-between gap-10 text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-md text-sm px-6 text-center"
                    >
                        <p className="text-sm text-white">Add</p>
                        <p className="text-sm text-white font-semibold">{formatBRL(value_total)}</p>
                    </button>
                </div>
            </ReactModal>
        </>
    );
};

export default CardProduct;
