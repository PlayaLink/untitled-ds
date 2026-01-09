export function Placeholder({ text = 'Design System Ready' }: { text?: string }) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">{text}</h1>
      <p className="mt-2 text-gray-600">Add your first component to get started.</p>
    </div>
  )
}
