import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPizzaSlice, faWineBottle } from "@fortawesome/free-solid-svg-icons";

export const categories: Array<{
    id: number;
    title: string;
    icon: IconDefinition;
}> = [
    {
        id: 1,
        title: "Drinks",
        icon: faWineBottle
    },
    {
        id: 2,
        title: "Pastas",
        icon: faPizzaSlice
    }
];
