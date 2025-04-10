import React from 'react'

const FormField = ({ label, ...props }) => {
  return (
    <div className="max-w-sm">
      <label className="flex flex-col gap-0.5 p-2 text-amber-400">
        <span className="">{label}</span>
        <input
          className="w-full bg-transparent placeholder:text-yellow-600 text-yellow-400 text-sm border border-orange-200 rounded-md px-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-yellow-500 hover:border-orange-300 shadow-sm focus:shadow-[1px_2px_3px_3px_rgba(253,224,71,0.3)]"
          placeholder="Type here..."
          autoComplete="on"
          {...props}
        />
      </label>
    </div>
  )
}

export default FormField
