const ProjectDetail = ({ label, children }) => {
    return <div className='p-[15px] gap-[50px] border-b-4 rounded-sm border-stone-400 bg-stone-200 text-stone600 flex justify-between'>
    <h2 className='uppercase font-bold text-stone-600'>{label}</h2>
    <p className='text-stone-600'>{children}</p>
</div>
}

export default ProjectDetail;