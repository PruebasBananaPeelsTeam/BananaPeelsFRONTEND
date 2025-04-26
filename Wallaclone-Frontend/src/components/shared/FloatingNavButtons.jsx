import { ArrowLeft, ArrowRight } from 'lucide-react'

const FloatingNavButtons = ({ onPrev, onNext }) => {
  return (
    <>
      <button
  onClick={onPrev}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
  aria-label="Previous"
>
  <ArrowLeft size={20} />
</button>

<button
  onClick={onNext}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
  aria-label="Next"
>
  <ArrowRight size={20} />
</button>
    </>
  )
}

export default FloatingNavButtons