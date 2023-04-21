import { IconType } from "react-icons";
import { IoPizzaOutline, IoWineOutline, IoFastFoodOutline, IoIceCreamOutline } from "react-icons/io5";

export const categories: Array<{
    id: number;
    title: string;
    icon: IconType;
}> = [
    {
        id: 1,
        title: "Drinks",
        icon: IoWineOutline
    },
    {
        id: 2,
        title: "Pastas",
        icon: IoPizzaOutline
    },
    {
        id: 3,
        title: "Burguer",
        icon: IoFastFoodOutline
    },
    {
        id: 4,
        title: "IceCream",
        icon: IoIceCreamOutline
    }
];
