import React from "react";
import { Edit2, Trash2, UserCircle } from "lucide-react";

type Person = {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    createdAt: string;
};

type PersonCardProps = {
    person: Person;
    onEdit: () => void;
    onDelete: () => void;
};

export default function PersonCard({ person, onEdit, onDelete }: PersonCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="bg-gray-100 rounded-full p-8">
                        <UserCircle className="h-10 w-10 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-pink-500 font-medium text-lg">{person.name}</h3>
                        <p className="text-gray-600">{person.type}</p>
                        <p className="text-sm text-gray-500">Email: {person.email}</p>
                        <p className="text-sm text-gray-500">Telefone: {person.phone}</p>
                    </div>
                </div>

                <p className="text-sm text-gray-500 font-bold">
                    {new Date(person.createdAt).toLocaleDateString("pt-BR")}
                </p>

                <div className="flex gap-4">
                    <button onClick={onEdit} className="text-blue-500 hover:text-blue-600">
                        <Edit2 className="h-5 w-5" />
                    </button>
                    <button onClick={onDelete} className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};