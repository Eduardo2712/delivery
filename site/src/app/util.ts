import { IconType } from "react-icons";
import { IoPizzaOutline, IoWineOutline, IoFastFoodOutline, IoIceCreamOutline, IoRestaurantOutline, IoCartOutline } from "react-icons/io5";

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
        title: "Fast Food",
        icon: IoFastFoodOutline
    },
    {
        id: 4,
        title: "Ice Cream",
        icon: IoIceCreamOutline
    },
    {
        id: 5,
        title: "Snack",
        icon: IoRestaurantOutline
    },
    {
        id: 6,
        title: "Market",
        icon: IoCartOutline
    }
];
