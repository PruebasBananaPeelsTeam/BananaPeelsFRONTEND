import '../../styles/formsErrorPopUp.css'

function FormErrorPopup({ error, onClose }) {
  if (!error) return null

  return (
    <div className="relative">
      <div className="forms-Errors-Pop-up" onClick={onClose}>
        <div className="text-red-500 mr-2">{error.code}</div>
        {error.message}
      </div>
    </div>
  )
}

export default FormErrorPopup
