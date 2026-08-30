export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-forest/5">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="flex items-center gap-2 pt-1">
          <div className="skeleton h-5 w-24 rounded-full" />
        </div>
        <div className="skeleton mt-2 h-10 w-full rounded-full" />
      </div>
    </div>
  )
}
