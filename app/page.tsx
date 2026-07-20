import Image from "next/image";

// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen p-12 max-w-2xl mx-auto">
      {/* Using the font utility class */}
      <h1 className="font-indie text-5xl mb-4">Indie Flower</h1>
      <p className="font-indie text-xl text-gray-600 mb-8">
        A cheerful handwriting font
      </p>
      
      {/* Various text sizes with the font */}
      <div className="space-y-4">
        <p className="font-indie text-6xl">Big heading</p>
        <p className="font-indie text-4xl">Medium heading</p>
        <p className="font-indie text-2xl">Sub heading</p>
        <p className="font-indie text-lg">Regular body text</p>
        <p className="font-indie text-base">Normal paragraph text</p>
        <p className="font-indie text-sm">Small text</p>
      </div>

      {/* Example with a card */}
      <div className="mt-12 p-8 bg-pink-50 rounded-2xl">
        <p className="font-indie text-2xl leading-relaxed">
          "Indie Flower has a friendly, bubbly feel that makes 
          any text look warm and welcoming!"
        </p>
        <p className="font-indie text-right mt-4 text-gray-500">
          — Happy user
        </p>
      </div>
    </div>
  )
}
