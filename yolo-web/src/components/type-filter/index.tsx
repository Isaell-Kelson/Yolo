import React from "react";

type TypeFilterProps = {
    filterType: string;
    onFilterChange: (type: string) => void;
};

export default function TypeFilter({ filterType, onFilterChange }: TypeFilterProps) {
    return (
        <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-8 text-gray-600"
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
        >
            <option value="">Selecione um Filtro</option>
            <option value="hóspede">Hóspede</option>
            <option value="proprietário">Proprietário</option>
            <option value="operador">Operador</option>
            <option value="fornecedor">Fornecedor</option>
        </select>
    );
};