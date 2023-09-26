export interface IButtonComponent {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    outline?: boolean
    small?: boolean
    type?: any
    disabled?: boolean;
    className?: string;
}