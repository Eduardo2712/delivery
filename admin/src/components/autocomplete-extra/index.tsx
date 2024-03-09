import { list } from "@/requests/extra.request";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Autocomplete from "@mui/material/Autocomplete";
import { ExtraType } from "@/types/entity/entity.type";
import { TextField } from "@mui/material";
import { formatBRL } from "@/utils/other";

type Props = {
    value: ExtraType | undefined | null;
    setValue: (value: ExtraType | null) => void;
    array_used?: number[];
};

const AutocompleteExtra = ({ value, setValue, array_used = [] }: Props) => {
    const [options, setOptions] = useState<ExtraType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try {
                const response = await list("");

                setOptions(response.data.filter((option) => !array_used?.includes(option.id)));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data?.message ?? "An error has occurred");
                } else {
                    return toast.error("An error has occurred");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const searchOptions = async (search: string) => {
        setLoading(true);

        try {
            const response = await list(search);

            setOptions(response.data.filter((option) => !array_used?.includes(option.id)));
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
        <Autocomplete
            key={value?.id}
            loadingText="Loading..."
            noOptionsText="No options"
            clearOnBlur
            options={options}
            getOptionLabel={(option) => (option ? `${option.ext_name} - ${formatBRL(option.ext_price)}` : "")}
            sx={{ width: "100%" }}
            loading={loading}
            onChange={(_, value) => setValue(value)}
            value={value}
            onInputChange={(_, search) => searchOptions(search)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    margin="normal"
                    variant="outlined"
                    className={`bg-slate-700 block w-full rounded-md border-0 py-2 px-2 text-gray-100 shadow-sm ring-1 ring-gray-800 placeholder:text-gray-400 focus:ring-blue-500 sm:text-sm sm:leading-6 disabled:text-gray-300`}
                />
            )}
        />
    );
};

export default AutocompleteExtra;
