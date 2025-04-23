function Button({ type = 'button', onClick, children, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className="cursor-pointer px-4 py-1.5 min-w-[90px] text-sm font-medium rounded-lg bg-[#1e1e1e]/90 text-white hover:bg-[#1e3a8a] transition-all duration-200"
    >
      {children}
    </button>
  )
}

export default Button
