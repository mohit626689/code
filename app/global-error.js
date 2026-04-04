"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="text-center p-8 max-w-md mx-auto bg-base-100 rounded-2xl shadow-xl">
            <div className="mb-6">
              <div className="w-24 h-24 bg-error mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77 .833 .192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-error mb-2">
                Application error
              </h2>
              <p className="text-base-content/60 mb-6">
                An unexpected error has occurred.
              </p>
            </div>
            <button onClick={reset} className="btn btn-primary w-full mb-4">
              Reload page
            </button>
            <p className="text-sm text-base-content/50">
              Error: {error.message}
              {error.digest && <span> ({error.digest})</span>}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
