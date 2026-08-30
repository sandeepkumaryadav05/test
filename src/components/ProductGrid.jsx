import ProductCard from './ProductCard'

export default function ProductGrid({ products = {}, columns = 4 }) {
  const productsList = Array.isArray(products) ? products : []
  void columns
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
      {productsList.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
