import toast from "react-hot-toast";

export const toastConfirm = (text: string, functionYes = () => {}) => {
    toast(
        (t) => (
            <div className="flex flex-col gap-6">
                <p className="text-lg">{text}</p>

                <div className="flex gap-2 mt-3">
                    <button
                        className="rounded bg-red-600 flex-1 h-8 flex justify-center items-center p-2"
                        type="button"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        No
                    </button>

                    <button
                        className="rounded bg-blue-600 flex-1 h-8 flex justify-center items-center p-2"
                        type="button"
                        onClick={() => {
                            functionYes();
                            toast.dismiss(t.id);
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        ),
        {
            duration: Infinity
        }
    );
};
