import Input from "./Input";
import Dialog from "./Dialog";
import { useRef } from 'react';

const NewProject = ({ onAdd, onCancel}) => {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const dialog = useRef();

    function handleSave() {
        if (dueDate.current.value && description.current.value && dueDate.current.value) {
            onAdd({
                title: title.current.value,
                description: description.current.value,
                dueDate: dueDate.current.value
            });
        } else {
            dialog.current.open();
        };
    };

    return <div className='w-full mt-16 mx-8'>
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <button className='text-stone-600 hover:text-stone-800' onClick={onCancel}>Cancel</button>
            </li>
            <li>
                <button className='px-6 py-2 rounded-md bg-stone-600 text-stone-50 hover:bg-stone-800' onClick={handleSave}>Save</button>
            </li>
        </menu>
        <div>
            <Input ref={title} type='text'>Title</Input>
            <Input ref={description} textarea>Description</Input>
            <Input ref={dueDate} type='date'>Due Date</Input>
        </div>
        <Dialog ref={dialog}>
            <h1 className='text-lg text-stone-500'>Invalid Input</h1>
        </Dialog>
    </div>
}

export default NewProject