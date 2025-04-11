function Button({ type = 'button', onClick, children, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className="cursor-pointer bg-transparent hover:bg-yellow-600 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded"
    >
      {children}
    </button>
  )
}

export default Button
