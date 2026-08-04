"use client";

import { useState } from "react";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsUploading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);

      form.reset();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Upload Image
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose an image and apply an operation.
          </p>
        </div>

        {/* File Input */}
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
            accept="image/*"
            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-500 shadow-sm file:mr-4 file:cursor-pointer file:rounded-l-xl file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>

        {/* Select Input */}
        <div className="space-y-2">
          <label
            htmlFor="operation"
            className="block text-sm font-medium text-slate-700"
          >
            Operation
          </label>

          <div className="relative">
            <select
              id="operation"
              name="operation"
              className="block w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="grayscale">Grayscale</option>
              <option value="resize">Resize</option>
              <option value="compress">Compress</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
