"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TypeFilter from "@/src/components/type-filter";
import AddButton from "@/src/components/add-button";
import PersonForm from "@/src/components/person-form";
import PersonCard from "@/src/components/person-card";



type Person = {
    createdAt: string;
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
};

export default function Page() {
    const [people, setPeople] = useState<Person[]>([]);
    const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newPerson, setNewPerson] = useState<Person>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "",
        createdAt: "",
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

    const addPerson = async (person: Person) => {
        try {
            const response = await axios.post("http://localhost:3001/", {
                ...person,
                type: capitalizeFirstLetter(person.type),
            });
            setPeople([...people, response.data]);
            setFilteredPeople([...filteredPeople, response.data]);
            setNewPerson({ id: 0, name: "", email: "", phone: "", type: "", createdAt: "" });
            setIsFormOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    const updatePerson = async (person: Person) => {
        try {
            const response = await axios.put(`http://localhost:3001/${person.id}`, {
                ...person,
                type: capitalizeFirstLetter(person.type),
            });

            setPeople(people.map((p) => (p.id === person.id ? response.data : p)));
            setFilteredPeople(filteredPeople.map((p) => (p.id === person.id ? response.data : p)));

            setEditingPerson(null);
            setIsFormOpen(false);
        } catch (err) {
            console.error("Erro ao atualizar:", err);
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    const deletePerson = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/${id}`);
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
            setFilteredPeople(people.filter((person) => person.type.toLowerCase().includes(type.toLowerCase())));
        }
    };

    const capitalizeFirstLetter = (str: string): string => {
        if (str.length === 0) return str;
        return str[0].toLocaleUpperCase("pt-BR") + str.slice(1);
    };

    useEffect(() => {
        fetchPeople().then((r) => r);
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-end items-center mb-6 gap-4">
                    <TypeFilter filterType={filterType} onFilterChange={filterByType} />
                    <AddButton onClick={() => setIsFormOpen(true)} />
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
                            <PersonForm
                                person={editingPerson || newPerson}
                                onSave={(person) => (editingPerson ? updatePerson(person) : addPerson(person))}
                                onCancel={() => setIsFormOpen(false)}
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {filteredPeople.map((person) => (
                        <PersonCard
                            key={person.id}
                            person={person}
                            onEdit={() => {
                                setIsFormOpen(true);
                                setEditingPerson(person);
                            }}
                            onDelete={() => deletePerson(person.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}