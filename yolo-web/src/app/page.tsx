"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit2, Trash2, UserCircle } from "lucide-react";

type Person = {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
};

const PeoplePage = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newPerson, setNewPerson] = useState<Person>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "",
    });
    const [editingPerson, setEditingPerson] = useState<Person | null>(null);
    const [filterType, setFilterType] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchPeople = async () => {
        try {
            const response = await axios.get("http://localhost:3001/");
            setPeople(response.data);
            setFilteredPeople(response.data);
            setIsLoaded(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    const addPerson = async () => {
        try {
            const response = await axios.post("http://localhost:3001/", {
                ...newPerson,
                type: capitalizeFirstLetter(newPerson.type),
            });
            setPeople([...people, response.data]);
            setFilteredPeople([...filteredPeople, response.data]);
            setNewPerson({ id: 0, name: "", email: "", phone: "", type: "" });
            setIsFormOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    const updatePerson = async () => {
        if (!editingPerson) return;

        try {
            const response = await axios.put(
                `http://localhost:3001/${editingPerson.id}`,
                {
                    ...editingPerson,
                    type: capitalizeFirstLetter(editingPerson.type),
                }
            );

            setPeople(
                people.map((person) =>
                    person.id === editingPerson.id ? response.data : person
                )
            );

            setFilteredPeople(
                filteredPeople.map((person) =>
                    person.id === editingPerson.id ? response.data : person
                )
            );

            setEditingPerson(null);
            setIsFormOpen(false);
        } catch (err) {
            console.error("Erro ao atualizar:", err);
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    const deletePerson = async (id: number, type: string) => {
        try {
            await axios.delete(`http://localhost:3001/${type}`);
            setPeople(people.filter((person) => person.id !== id));
            setFilteredPeople(filteredPeople.filter((person) => person.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    const filterByType = (type: string) => {
        setFilterType(type);
        if (type === "") {
            setFilteredPeople(people);
        } else {
            setFilteredPeople(
                people.filter((person) =>
                    person.type.toLowerCase().includes(type.toLowerCase())
                )
            );
        }
    };

    const capitalizeFirstLetter = (str: string): string => {
        if (str.length === 0) return str;
        return str[0].toLocaleUpperCase('pt-BR') + str.slice(1);
    };

    useEffect(() => {
        fetchPeople().then((r) => r);
    }, []);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedType = e.target.value;
        filterByType(updatedType);
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-end items-center mb-6 gap-4">
                    <select
                        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 text-gray-600"
                        value={filterType}
                        onChange={handleTypeChange}
                    >
                        <option value="">Filtrar por tipo</option>
                        <option value="hóspede">Hóspede</option>
                        <option value="proprietário">Proprietário</option>
                        <option value="operador">Operador</option>
                        <option value="fornecedor">Fornecedor</option>
                    </select>
                    <button
                        className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center gap-2"
                        onClick={() => {
                            setIsFormOpen(true);
                            setEditingPerson(null);
                        }}
                    >
                        <span>+</span> Adicionar
                    </button>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                {isFormOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-50 flex justify-center items-center"
                        onClick={() => setIsFormOpen(false)}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="font-semibold text-xl mb-4">
                                {editingPerson ? "Editar" : "Adicionar"} Pessoa
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        value={editingPerson ? editingPerson.name : newPerson.name}
                                        onChange={(e) =>
                                            editingPerson
                                                ? setEditingPerson({
                                                    ...editingPerson,
                                                    name: e.target.value,
                                                })
                                                : setNewPerson({
                                                    ...newPerson,
                                                    name: e.target.value,
                                                })
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={editingPerson ? editingPerson.email : newPerson.email}
                                        onChange={(e) =>
                                            editingPerson
                                                ? setEditingPerson({
                                                    ...editingPerson,
                                                    email: e.target.value,
                                                })
                                                : setNewPerson({
                                                    ...newPerson,
                                                    email: e.target.value,
                                                })
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Telefone
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Telefone"
                                        value={editingPerson ? editingPerson.phone : newPerson.phone}
                                        onChange={(e) =>
                                            editingPerson
                                                ? setEditingPerson({
                                                    ...editingPerson,
                                                    phone: e.target.value,
                                                })
                                                : setNewPerson({
                                                    ...newPerson,
                                                    phone: e.target.value,
                                                })
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tipo
                                    </label>
                                    <select
                                        value={editingPerson ? editingPerson.type : newPerson.type}
                                        onChange={(e) =>
                                            editingPerson
                                                ? setEditingPerson({
                                                    ...editingPerson,
                                                    type: e.target.value,
                                                })
                                                : setNewPerson({
                                                    ...newPerson,
                                                    type: e.target.value,
                                                })
                                        }
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
                                        onClick={() => {
                                            if (editingPerson) {
                                                updatePerson().then((r) => r);
                                            } else {
                                                addPerson().then((r) => r);
                                            }
                                        }}
                                        className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
                                    >
                                        {editingPerson ? "Atualizar" : "Adicionar"}
                                    </button>
                                    <button
                                        onClick={() => setIsFormOpen(false)}
                                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {filteredPeople.map((person) => (
                        <div key={person.id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="bg-gray-100 rounded-full p-8">
                                        <UserCircle className="h-10 w-10 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-pink-500 font-medium text-lg">{person.name}</h3>
                                        <p className="text-gray-600">{person.phone}</p>
                                        <p className="text-gray-600">{person.email}</p>
                                        <p className="text-gray-600">{person.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-2">
                                        <button
                                            className="text-blue-500"
                                            onClick={() => {
                                                setEditingPerson(person);
                                                setIsFormOpen(true);
                                            }}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => deletePerson(person.id, person.type)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PeoplePage;
