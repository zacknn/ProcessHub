import React from 'react'

interface buttonProps {
  buttonName: string
  content: string
}

function Button({ buttonName, content }: buttonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {buttonName}: {content}
    </button>
  )
}

export default Button