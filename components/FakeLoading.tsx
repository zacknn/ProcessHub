import React from 'react'
import Link from 'next/link'
function FakeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900">
            No processed image found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please upload an image first.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Go to Upload
          </Link>
        </div>
      </div>
  )
}

export default FakeLoading