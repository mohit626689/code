export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center p-8 max-w-md mx-auto bg-base-100 rounded-2xl shadow-xl">
        <div className="mb-6">
          <div className="w-24 h-24 bg-warning mx-auto rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-warning-content"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2 12l3 3 5-7 5 7 3-3m0 0l-3-3m3 3l3 3"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-warning mb-2">
            Page Not Found
          </h2>
          <p className="text-base-content/60 mb-6">
            The board or page you are looking for does not exist.
          </p>
        </div>
        <a href="/" className="btn btn-primary w-full">
          Go Home
        </a>
      </div>
    </div>
  );
}
