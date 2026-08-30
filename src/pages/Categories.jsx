import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import SectionHeading from '../components/SectionHeading'
import usePageMeta from '../hooks/usePageMeta'
import { useApp } from '../context/AppContext'

export default function Categories() {
  usePageMeta({
    title: 'Dairy Categories',
    description: 'Explore all Devansh categories — milk, paneer, ghee, curd, butter, cheese, lassi and flavored milk.',
  })
  const { categories } = useApp()

  return (
    <div className="animate-page-in pb-20 pt-28 sm:pt-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Fresh From Our Farm"
          title="Explore Every Category"
          description="Eight dairy staples made in small batches and delivered at peak freshness."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link 
            // to="/shop" 
            className="btn-primary group">
              Shop All Products <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
