import { useState, useEffect } from 'react';


const ProjectTasks = ({ tasks, handleAddTask, handleDeleteTask }) => {
    const [input, setInput] = useState('');
    const [edit, setEdit] = useState(false);
    const formElementStyling = 'border-b-[1px] px-[7.5px] py-[5px] border-stone-300 bg-transparent text-stone-100 transition-all hover:bg-stone-500/10';

    useEffect(() => {
        tasks.length === 0 && setEdit(false);
    });

    const handleChange = (event) => {
        setInput(() => event.target.value);
    };
    
    const handleSubmit = () => {
        handleAddTask(input)
        setInput('');
    };

    return (
        <div className='bg-stone-400/50 border-b-[5px] border-b-stone-100 p-3 rounded-b-sm'>
            <div className='mb-[15px] flex justify-between items-end'>
                <h1 className='uppercase text-xl text-stone-100 font-bold'>Tasks</h1>
                <button className='text-stone-200 hover:underline disabled:hover:no-underline disabled:text-stone-300' onClick={() => setEdit(!edit)} disabled={tasks.length === 0}>{edit ? 'Done' : 'Edit'}</button>
            </div>
            <form className='flex justify-between items-end gap-[15px] text-stone-100 mb-[10px]'>
                <input 
                    className={`${formElementStyling} w-full placeholder-stone-300 focus:outline-none`}
                    type='text'
                    name='task'
                    placeholder="Add a task here."
                    value={input}
                    onChange={handleChange} />
                <button className={`${formElementStyling} disabled:text-stone-300 disabled:hover:bg-transparent`} type='button' onClick={handleSubmit} disabled={!input.trim()}>Enter</button>
            </form>
            <ul className='flex flex-col gap-[5px] ms-[25px]'>
                {tasks.length == 0 ?
                    <h1 className='w-full text-center my-[15px] text-stone-100'>Tasks you add will show up here.</h1>
                    :
                    tasks.map(task =>
                        <li key={task.id} className='p-[5px] list-disc text-stone-600'>
                            {task.content}
                            {edit && <span className='ms-[10px] text-stone-600 cursor-pointer hover:text-stone-100 transition-all' type='button' onClick={() => handleDeleteTask(task.id)}>✗</span>}
                        </li>)}
            </ul>
        </div>
    );
};

export default ProjectTasks;