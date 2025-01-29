import React from "react";

type AddButtonProps = {
    onClick: () => void;
};

export default function AddButton({ onClick }: AddButtonProps) {
    return (
        <button
            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center gap-2"
            onClick={onClick}
        >
            <span>+</span> Adicionar
        </button>
    );
};