import React from 'react'

const FormField = React.memo(function FormField({ label, error, ...props }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-2">
        <span>{label}</span>
        <input
          className={`flex w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-[rgb(223,184,13)]'
          }`}
          autoComplete="on"
          {...props}
        />
      </label>

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  )
})

export default FormField
