import Button from "./Button";

const ProjectsSidebar = ({ onAddProject, projectsState, onProjectClick, handleProjectDelete }) => {
    const buttonStyling = 'text-stone-500 bg-stone-800 hover:bg-stone-700 hover:text-stone-400';
    
    return (
        <aside className='w-[350px] px-8 py-16 bg-stone-900 text-stone-50 rounded-tr-xl'>
            <h2 className='mb-8 font-bold uppercase text-xl text-stone-200'>Your Projects</h2>
            <div>
                <Button onClick={onAddProject}>Add Project</Button>
            </div>
            <ul className='flex flex-col mt-[25px] gap-[10px]'>
                {projectsState.projects.map(project =>
                    <li key={project.id} className='flex gap-[1px]'>
                        <button className={`${buttonStyling} ${projectsState.selectedProjectId === project.id ? 'border-[2px] border-stone-500/50' : 'border-[2px] border-stone-800'} w-full text-left px-3 py-2 rounded-l-md`} onClick={() => onProjectClick(project.id)}>{project.title}</button>
                        <button className={`${buttonStyling} p-[10px] rounded-r-md`} onClick={() => handleProjectDelete(project.id)}>✗</button>
                    </li>
                )}
            </ul>
        </aside>
    );
};

export default ProjectsSidebar;