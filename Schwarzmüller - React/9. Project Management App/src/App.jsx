import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import ProjectPage from "./components/ProjectPage";
import { useState } from 'react';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask = (task) => {
    setProjectsState((previous => {
      const newTask = {
        content: task,
        id: Math.random(),
        projectId: previous.selectedProjectId
      };
      
      return {
        ...previous,
        tasks: [...previous.tasks, newTask]
      }
    }));
  };

  const handleDeleteTask = (id) => {
    setProjectsState(previous => {
      return {
        ...previous,
        tasks: previous.tasks.filter(task => task.id !== id)
      }
    });
  };

  const handleProjectState = (state) => {
    setProjectsState(previous => {
      return {
        ...previous,
        selectedProjectId: state,
      }
    });
  };

  const handleAddProject = (project) => {
    setProjectsState(previous => {
      const newProject = {
        ...project,
        id: Math.random(),
      };

      return {
        ...previous,
        selectedProjectId: newProject.id,
        projects: [...previous.projects, newProject]
      }
    });
  };

  const handleProjectDelete = (id) => {
    setProjectsState(previous => {
      return {
        selectedProjectId: undefined,
        projects: previous.projects.filter(project => project.id !== id)
      }
    });
  };

  let content;
  if (projectsState.selectedProjectId === null) {
    content =
      <NewProject
        onAdd={handleAddProject}
        onCancel={() => handleProjectState(undefined)}
      />;
  } else if (projectsState.selectedProjectId == undefined) {
    content =
      <NoProjectSelected
        onStartAddProject={() => handleProjectState(null)}
      />;
  } else {
    content =
      <ProjectPage
        project={projectsState.projects.find(project => project.id === projectsState.selectedProjectId)}
        tasks={projectsState.tasks.filter(task => task.projectId == projectsState.selectedProjectId)}
        handleProjectDelete={handleProjectDelete}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
      />;
  };
  
  return (
    <main className='h-screen pt-8 flex'>
      <ProjectsSidebar
        onAddProject={() => handleProjectState(null)}
        projectsState={projectsState}
        onProjectClick={handleProjectState}
        handleProjectDelete={handleProjectDelete}
      />
      {content}
    </main>
  );
}

export default App;
