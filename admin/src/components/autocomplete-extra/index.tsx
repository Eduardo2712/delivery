import { list } from "@/requests/extra.request";
import { ExtraType } from "@/types/entity/entity.type";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";

const AutocompleteExtra = () => {
    const [extras, setExtras] = useState<ExtraType[]>([]);

    // const promiseOptions = async (search: string) => {
    //     try {
    //         const response = await list(search);
    //         setExtras(response.data);
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             return toast.error(error.response?.data?.message ?? "An error has occurred");
    //         } else {
    //             return toast.error("An error has occurred");
    //         }
    //     }
    // };

    return <AsyncSelect cacheOptions defaultOptions />;
};

export default AutocompleteExtra;
