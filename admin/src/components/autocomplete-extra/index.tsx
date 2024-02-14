import { list } from "@/requests/extra.request";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

type Item = {
    value: number;
    label: string;
};

const AutocompleteExtra = () => {
    const [extras, setExtras] = useState<Item[]>([]);
    const [selected, setSelected] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        searchOptions("");
    }, []);

    const searchOptions = async (search: string) => {
        try {
            setLoading(true);

            const response = await list(search);
            const data = response.data.map((extra) => ({ value: extra.id, label: extra.ext_name }));

            setExtras(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data?.message ?? "An error has occurred");
            } else {
                return toast.error("An error has occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select
            value={selected}
            onChange={(e) => setSelected(e)}
            onInputChange={searchOptions}
            options={extras}
            isClearable
            placeholder="Select..."
            isLoading={loading}
        />
    );
};

export default AutocompleteExtra;
