function Button({ type = 'button', onClick, children, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className="cursor-pointer w-full bg-[rgb(223,184,13)] text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition disabled:opacity-50"
    >
      {children}
    </button>
  )
}

export default Button
