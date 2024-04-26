import { forwardRef } from "react";

const Input = forwardRef(function Input({ textarea, children, ...props }, ref) {
    const inputStyling = 'w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone600 focus:outline-none focus:border-stone-600';
    
    return <p className="flex flex-col gap-1 my-4">
        <label className='text-sm font-bold uppercase text-stone-500' htmlFor={children.replace(/\s+/g, '-').toLowerCase()}>{children}</label>
        {
        textarea ?
            <textarea ref={ref} className={inputStyling} id={children.replace(/\s+/g, '-').toLowerCase()}{...props} />
            :
            <input ref={ref} className={inputStyling} id={children.replace(/\s+/g, '-').toLowerCase()}{...props} />
        }
    </p>
});

export default Input;