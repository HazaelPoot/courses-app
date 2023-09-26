'use client'

import { IInputComponent } from "@/interfaces/IInputComponent"

function Input({ id, name, type, value, big, textarea, placeholder, onChange }: IInputComponent) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-4 pt-6 font-light bg-white outline-none text-black border-2 focus:border-black focus:outline-none focus:ring focus:ring-transparent
        ${textarea ? 'w-700px h-500px' : 'w-full'}
        ${big ? 'w-[700px] pb-[1rem]' : ''} ${value ? 'border-purple-500' : ''}`}
            required
        />
    )
}

export default Input