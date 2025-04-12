function Button({ type = 'button', onClick, children, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className="cursor-pointer px-4 py-2 bg-[rgb(223,184,13)] text-white font-semibold  rounded-xl hover:bg-yellow-600 transition disabled:opacity-50"
    >
      {children}
    </button>
  )
}

export default Button
