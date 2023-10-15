type Props = {
    text: string;
};

const TextEmpty = ({ text = "" }: Props) => {
    return <p className="text-xl font-semibold text-gray-50 text-center">{text}</p>;
};

export default TextEmpty;
