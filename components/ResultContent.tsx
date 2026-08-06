"use client";

import FakeLoading from "./FakeLoading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ResultContent() {
  const searchParams = useSearchParams();

  const image = searchParams.get("image");

  if (!image || !image.startsWith("/processed/")) {
    return (
      <FakeLoading/>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Processed Image
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your image has been processed successfully.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Upload Another
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Processed result"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="flex gap-3">
          <a
            href={image}
            download
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Download
          </a>

          <Link
            href="/"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Upload
          </Link>
        </div>
      </div>
    </div>
  );
}