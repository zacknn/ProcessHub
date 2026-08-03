export default function Form() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <form
        action="/api/jobs"
        method="POST"
        encType="multipart/form-data"
        className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Image Processing
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Upload an image and choose an operation.
          </p>
        </div>

        {/* File input */}
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-slate-700"
          >
            Image
          </label>

          <input
            id="image"
            type="file"
            name="image"
            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-500 shadow-sm file:mr-4 file:cursor-pointer file:rounded-l-xl file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>

        {/* Select input */}
        <div className="space-y-2">
          <label
            htmlFor="operation"
            className="block text-sm font-medium text-slate-700"
          >
            Operation
          </label>

          <select
            id="operation"
            name="operation"
            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="grayscale">Grayscale</option>
            <option value="resize">Resize</option>
            <option value="compress">Compress</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}