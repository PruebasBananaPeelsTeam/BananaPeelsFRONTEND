import React from 'react'

const FormField = ({ label, ...props }) => {
  return (
    <div className="formField">
      <label className="formField-label">
        <span>{label}</span>
        <input className="formField-input" autoComplete="on" {...props} />
      </label>
    </div>
  )
}

export default FormField
