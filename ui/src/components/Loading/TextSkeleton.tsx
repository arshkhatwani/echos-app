export default function TextSkeleton() {
  return (
    <div role="status" className="max-w-md animate-pulse">
      <div className="h-1.5 bg-gray-300 rounded-full mb-2.5"></div>
      <div className="h-1.5 bg-gray-300 rounded-full max-w-3/4 mb-2.5"></div>
      <div className="h-1.5 bg-gray-300 rounded-full max-w-1/2 mb-2.5"></div>
      <div className="h-1.5 bg-gray-300 rounded-full max-w-3/4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
