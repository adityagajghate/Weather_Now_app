export default function ErrorMessage({ message }) {
  return (
    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 w-full mx-auto text-center">
      <p className="text-pink-700 text-sm font-medium flex items-center justify-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        {message}
      </p>
    </div>
  );
}