'use client'

import { IButtonComponent } from "@/interfaces/IButtonComponent"

export default function Button({ label, onClick, type, outline, small, disabled, className }: IButtonComponent) {
    return (
        <button
            onClick={onClick} type={type || 'submit'} disabled={disabled}
            // className={`text-white font-bold w-full relative hover:opacity-80 transition disabled:cursor-not-allowed py-4 text-lg mt-2 ${disabled ? 'bg-purple-300 pointer-events-none' : 'bg-purple-500'}`}>
            // {disabled ? 'Espere...' : label}
            className={`${className} font-bold w-full relative hover:opacity-80 transition disabled:cursor-not-allowed text-lg ${disabled ? 'bg-purple-300 pointer-events-none' : 'bg-purple-500'} ${outline ? 'bg-white text-black' : 'text-white'} ${small ? 'py-1' : 'py-4 mt-2'}`}>
            {disabled ? 'Espere...' : label}
        </button>
    )
}