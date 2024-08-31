import { ChangeEvent, Dispatch, SetStateAction, } from 'react';


export interface todoI {
    id: number;
    todo: string;
    isСompleted?: boolean;
    onChangeTodo?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    removeTodo?: (id: number) => void;
    setTodos?: Dispatch<SetStateAction<todoI[]>>;
    setMutation?: Dispatch<SetStateAction<boolean>>;
}
