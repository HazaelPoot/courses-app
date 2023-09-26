export interface IInputComponent {
    id: string,
    name: string,
    type: string,
    value?: string | number,
    big?: boolean,
    textarea?: boolean,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}