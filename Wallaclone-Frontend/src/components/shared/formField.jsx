import React from 'react'

const FormField = React.memo(function FormField({ label, ...props }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-2">
        <span>{label}</span>
        <input
          className="flex flex-col w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(223,184,13)]"
          autoComplete="on"
          {...props}
        />
      </label>
    </div>
  )
})

export default FormField
