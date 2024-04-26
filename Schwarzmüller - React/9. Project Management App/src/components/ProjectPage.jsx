import ProjectDetail from "./ProjectDetail";
import ProjectTasks from "./ProjectTasks";

const ProjectPage = ({ project, tasks, handleProjectDelete, handleAddTask, handleDeleteTask }) => {
    const dueDate = new Date(project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return (
        <div className='bg-stone-300 w-full h-fit ms-8 rounded-l-lg flex flex-col p-[50px] gap-[10px]'>
            <div className='flex justify-between items-end mb-[10px]'>
                <h1 className='uppercase font-bold text-stone-700 text-2xl'>{project.title}</h1>
                <button className='text-stone-700 hover:underline' onClick={() => handleProjectDelete(project.id)}>Delete</button>
            </div>
            <ProjectDetail label='Description:'>{project.description}</ProjectDetail>
            <ProjectDetail label='Deadline:'>{dueDate}</ProjectDetail>
            <ProjectTasks tasks={tasks} handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask}/>
        </div>
    );
}

export default ProjectPage;