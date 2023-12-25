import { CategoryType } from "@/types/entity/entity.type";
import { FaBasketShopping, FaBurger, FaCakeCandles, FaCarrot, FaCookieBite, FaIceCream, FaMugHot, FaPizzaSlice } from "react-icons/fa6";

type Props = {
    category: CategoryType;
    filter_category: number | null;
    setFilterCategory: (id: number) => void;
};

const CardCategory = ({ category, filter_category, setFilterCategory }: Props) => {
    const iconCategory = () => {
        switch (category.id) {
            case 1:
                return <FaMugHot size={30} className="text-black" />;
            case 2:
                return <FaIceCream size={30} className="text-black" />;
            case 3:
                return <FaCookieBite size={30} className="text-black" />;
            case 4:
                return <FaBurger size={30} className="text-black" />;
            case 5:
                return <FaPizzaSlice size={30} className="text-black" />;
            case 6:
                return <FaCakeCandles size={30} className="text-black" />;
            case 7:
                return <FaBasketShopping size={30} className="text-black" />;
            case 8:
                return <FaCarrot size={30} className="text-black" />;
            default:
                return <FaMugHot size={30} className="text-black" />;
        }
    };

    return (
        <button
            type="button"
            className={`rounded-md w-20 h-16 flex flex-col justify-around items-center ${
                filter_category === category.id ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-slate-300"
            }`}
            onClick={() => setFilterCategory(category.id)}
        >
            {iconCategory()}

            <p className="text-black text-sm font-semibold">{category.cat_name}</p>
        </button>
    );
};

export default CardCategory;
