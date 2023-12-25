import { ProductType } from "@/types/entity/entity.type";
import { formatBRL } from "@/utils/other";
import { useState } from "react";
import ReactModal from "../react-modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Props = {
    product: ProductType;
};

type FormModal = {
    count: number;
    comentary: string;
    additional: number[];
};

const CardProduct = ({ product }: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formModal, setFormModal] = useState<FormModal>({
        count: 1,
        comentary: "",
        additional: []
    });
    const [numberImage, setNumberImage] = useState<number>(0);

    const value_total = formModal.count * product?.pro_price;

    return (
        <>
            <div
                onClick={() => setOpenModal(true)}
                onKeyDown={() => setOpenModal(true)}
                className="rounded-sm bg-white px-4 py-5 flex flex-row items-start h-40 hover:bg-gray-200 cursor-pointer"
            >
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
                    style={{ backgroundImage: `url(${product?.files?.[0].file?.url ?? ""})` }}
                />
            </div>

            <ReactModal openModal={openModal} setOpenModal={setOpenModal}>
                <div className="flex gap-4 px-3">
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setNumberImage((ant) => ant - 1)}
                            className="bg-gray-100 p-0.5 rounded-md"
                            disabled={numberImage === 0}
                        >
                            <FaArrowLeft size={20} className={`text-gray-600 ${numberImage === 0 && "text-opacity-50"}`} />
                        </button>

                        <div
                            className="rounded-sm w-96 h-64 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${product?.files?.[numberImage].file?.url ?? ""})` }}
                        />

                        <button
                            type="button"
                            onClick={() => setNumberImage((ant) => ant + 1)}
                            className="bg-gray-100 p-0.5 rounded-md"
                            disabled={numberImage === (product?.files?.length ?? 1) - 1}
                        >
                            <FaArrowRight
                                size={20}
                                className={`text-gray-600 ${numberImage === (product?.files?.length ?? 1) - 1 && "text-opacity-50"}`}
                            />
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col">
                        <p className="text-sm text-black font-medium text-center">{product?.pro_name}</p>

                        <p className="text-sm text-gray-800 mt-2">{product?.pro_ingredients}</p>

                        <p className="text-sm text-black font-semibold mt-3">{`Serves ${product?.pro_number_people} ${
                            product?.pro_number_people === 1 ? "person" : "people"
                        }`}</p>

                        <p className="text-sm text-green-600 mt-3">{formatBRL(product?.pro_price)}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t-2 border-gray-200 mt-3 py-2 px-3">
                    <div className="flex justify-center items-center border-2 border-gray-300 rounded-md">
                        <button
                            type="button"
                            onClick={() => setFormModal((ant) => ({ ...ant, count: ant.count - 1 }))}
                            disabled={formModal.count === 1}
                            className={`text-2xl text-red-600 ${formModal.count === 1 ? "text-opacity-50" : "hover:bg-gray-100"} p-3`}
                        >
                            -
                        </button>

                        <div className="text-xl text-black p-3">{formModal.count}</div>

                        <button
                            type="button"
                            onClick={() => setFormModal((ant) => ({ ...ant, count: ant.count + 1 }))}
                            className={`text-2xl text-red-600 p-3 cursor-pointer hover:bg-gray-100`}
                        >
                            +
                        </button>
                    </div>

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
