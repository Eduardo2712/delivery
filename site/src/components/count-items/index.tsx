type Props = {
    count: number;
    setCount: (count: number) => void;
};

const CountItems = ({ count, setCount }: Props) => {
    return (
        <div className="flex justify-center items-center border-2 border-gray-300 rounded-md">
            <button
                type="button"
                onClick={() => setCount(count - 1)}
                disabled={count === 1}
                className={`text-2xl text-red-600 ${count === 1 ? "text-opacity-50" : "hover:bg-gray-100"} p-3`}
            >
                -
            </button>

            <div className="text-xl text-black p-3">{count}</div>

            <button type="button" onClick={() => setCount(count + 1)} className={`text-2xl text-red-600 p-3 cursor-pointer hover:bg-gray-100`}>
                +
            </button>
        </div>
    );
};

export default CountItems;
