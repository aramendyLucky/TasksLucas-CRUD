export function Spinner() {
  return (
    <div
      className="animate-spin inline-block w-8 h-8 border-4 border-t-primary-500 border-r-primary-500 border-b-gray-200 border-l-gray-200 rounded-full"
      role="status"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
