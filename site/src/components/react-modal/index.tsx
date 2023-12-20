import { ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";
import Modal from "react-modal";

type Props = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    children: ReactNode;
};

const ReactModal = ({ openModal, setOpenModal, children }: Props) => {
    return (
        <Modal
            className={"bg-white rounded-md px-5 py-4"}
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80"}
            isOpen={openModal}
            style={{
                content: {
                    maxWidth: "1000px",
                    margin: "auto",
                    marginTop: "30px"
                }
            }}
        >
            <div className="flex justify-end mb-4">
                <FaXmark onClick={() => setOpenModal(false)} className={"cursor-pointer text-gray-400"} size={24} />
            </div>

            {children}
        </Modal>
    );
};

export default ReactModal;
