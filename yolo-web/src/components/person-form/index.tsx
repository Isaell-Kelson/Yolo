import React from "react";
import InputMask from "@mona-health/react-input-mask";

type Person = {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    createdAt: string;
};

type PersonFormProps = {
    person: Person | null;
    onSave: (person: Person) => void;
    onCancel: () => void;
};

export default function PersonForm({ person, onSave, onCancel }: PersonFormProps) {
    const [name, setName] = React.useState(person?.name || "");
    const [email, setEmail] = React.useState(person?.email || "");
    const [phone, setPhone] = React.useState(person?.phone || "");
    const [type, setType] = React.useState(person?.type || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: person?.id || 0,
            name,
            email,
            phone,
            type,
            createdAt: person?.createdAt || "",
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="font-semibold text-xl mb-4">
                {person ? "Editar" : "Adicionar"} Pessoa
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <InputMask
                        mask="+99 99 99999-9999"
                        value={phone}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhone(e.target.value)}
                        placeholder="+99 99 99999-9999"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                    >
                        <option value="">Selecione um tipo</option>
                        <option value="hóspede">Hóspede</option>
                        <option value="proprietário">Proprietário</option>
                        <option value="operador">Operador</option>
                        <option value="fornecedor">Fornecedor</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
                    >
                        {person ? "Atualizar" : "Adicionar"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};
