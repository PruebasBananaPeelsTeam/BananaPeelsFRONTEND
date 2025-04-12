import '../../styles/formsErrorPopUp.css'

function FormErrorPopup({ error, onClose }) {
  if (!error) return null

  return (
    <div className="relative">
      <div className="forms-Errors-Pop-up" onClick={onClose}>
        {error.message}
      </div>
    </div>
  )
}

export default FormErrorPopup