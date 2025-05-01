import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('es')}
        className="px-2 py-1 text-sm rounded hover:bg-gray-200"
      >
        🇪🇸 Español
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className="px-2 py-1 text-sm rounded hover:bg-gray-200"
      >
        🇬🇧 English
      </button>
    </div>
  )
}

export default LanguageSelector
