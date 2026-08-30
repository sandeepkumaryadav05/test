import { IMAGES } from '../utils/images'
import moment01 from '../assets/images/moments/moment-01.webp'
import moment02 from '../assets/images/moments/moment-02.webp'
import moment03 from '../assets/images/moments/moment-03.webp'
import moment04 from '../assets/images/moments/moment-04.webp'
import moment05 from '../assets/images/moments/moment-05.webp'
import moment06 from '../assets/images/moments/moment-06.webp'

export const baseTestimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'New Delhi',
    rating: 5,
    text: 'Devansh milk tastes completely different from regular packaged milk. It feels genuinely fresh — my kids refuse to drink anything else now.',
    createdAt: '2026-05-02',
  },
  {
    id: 2,
    name: 'Priya Nair',
    location: 'Bengaluru',
    rating: 5,
    text: 'The paneer is unbelievably soft. I have stopped buying from the local dairy entirely. Delivery arrives before 7 AM, still cold.',
    createdAt: '2026-05-18',
  },
  {
    id: 3,
    name: 'Anita Deshmukh',
    location: 'Pune',
    rating: 4.5,
    text: 'Their bilona ghee smells exactly like the one my grandmother made. The grainy texture and aroma are worth every rupee.',
    createdAt: '2026-06-04',
  },
  {
    id: 4,
    name: 'Vikram Malhotra',
    location: 'Gurugram',
    rating: 5,
    text: 'I took the daily milk subscription three months ago. Not a single late delivery, and the quality has been remarkably consistent.',
    createdAt: '2026-06-21',
  },
  {
    id: 5,
    name: 'Sneha Kulkarni',
    location: 'Mumbai',
    rating: 4.5,
    text: 'Greek yogurt with honey is my everyday breakfast now. Thick, high in protein and clearly made with care.',
    createdAt: '2026-07-08',
  },
  {
    id: 6,
    name: 'Arjun Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'You can taste the difference cold-chain delivery makes. The curd sets perfectly at home and the butter churns are divine.',
    createdAt: '2026-07-19',
  },
]

export const MOCK_USERS = [
  { id: 'u1', name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '9810012345', city: 'New Delhi', joined: '2026-01-10', orders: 14 },
  { id: 'u2', name: 'Priya Nair', email: 'priya.nair@example.com', phone: '9900456712', city: 'Bengaluru', joined: '2026-01-22', orders: 22 },
  { id: 'u3', name: 'Anita Deshmukh', email: 'anita.d@example.com', phone: '9822033456', city: 'Pune', joined: '2026-02-05', orders: 9 },
  { id: 'u4', name: 'Vikram Malhotra', email: 'vikram.m@example.com', phone: '9910123456', city: 'Gurugram', joined: '2026-02-17', orders: 31 },
  { id: 'u5', name: 'Sneha Kulkarni', email: 'sneha.k@example.com', phone: '9820112233', city: 'Mumbai', joined: '2026-03-03', orders: 17 },
]

export const DEFAULT_COUPONS = [
  { id: 'c1', code: 'FRESH20', type: 'percent', value: 20, active: true, note: 'First order — 20% off' },
  { id: 'c2', code: 'DDF50', type: 'flat', value: 50, active: true, note: 'Flat ₹50 off above ₹499' },
]

export const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 182000, orders: 410 },
  { month: 'Feb', revenue: 196500, orders: 442 },
  { month: 'Mar', revenue: 214800, orders: 488 },
  { month: 'Apr', revenue: 208300, orders: 461 },
  { month: 'May', revenue: 239600, orders: 530 },
  { month: 'Jun', revenue: 261200, orders: 574 },
  { month: 'Jul', revenue: 287400, orders: 618 },
  { month: 'Aug', revenue: 302900, orders: 651 },
  { month: 'Sep', revenue: 291700, orders: 604 },
  { month: 'Oct', revenue: 315000, orders: 662 },
  { month: 'Nov', revenue: 338600, orders: 701 },
  { month: 'Dec', revenue: 364300, orders: 742 },
]

export const WHY_CHOOSE_US = [
  {
    icon: 'Leaf',
    title: '100% Fresh',
    text: 'Milked at dawn and delivered before breakfast. Nothing sits around waiting to be sold.',
  },
  {
    icon: 'Tractor',
    title: 'Farm Direct',
    text: 'No middlemen, no collection centres. Your dairy travels straight from our farm to your door.',
  },
  {
    icon: 'ShieldCheck',
    title: 'No Unnecessary Preservatives',
    text: 'Short ingredient lists you can actually read. Milk, cultures, and nothing to hide.',
  },
  {
    icon: 'FlaskConical',
    title: 'Quality Tested',
    text: 'Every batch passes 26 quality checks for purity, fat content and freshness.',
  },
  {
    icon: 'ThermometerSnowflake',
    title: 'Cold Chain Delivery',
    text: 'Insulated crates keep everything under 4°C from our dairy plant to your doorstep.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Trusted by Families',
    text: 'Over 25,000 households begin their mornings with Devansh dairy on their table.',
  },
]

export const PROCESS_STEPS = [
  {
    num: '01',
    icon: 'Heart',
    title: 'Happy & Healthy Cows',
    text: 'Our Gir and Sahiwal cows graze freely on organic pastures, listen to music, and receive regular veterinary care. A stress-free cow gives better milk — it really is that simple.',
  },
  {
    num: '02',
    icon: 'Droplets',
    title: 'Fresh Milking',
    text: 'Milking happens twice daily in automated, hygienic parlours. The milk never touches human hands and is chilled to 4°C within 15 minutes of leaving the cow.',
  },
  {
    num: '03',
    icon: 'FlaskConical',
    title: 'Quality Testing',
    text: 'Every batch clears 26 laboratory checks — fat, SNF, antibiotics, adulterants and microbial counts — before it earns the Devansh label.',
  },
  {
    num: '04',
    icon: 'PackageCheck',
    title: 'Hygienic Packaging',
    text: 'Products are set, churned or packed in a fully automated dairy where air is filtered and surfaces are food-grade stainless steel. Sealed tight, labelled honestly.',
  },
  {
    num: '05',
    icon: 'Truck',
    title: 'Doorstep Delivery',
    text: 'Refrigerated vans carry your order through an unbroken cold chain, arriving at your door before sunrise, crisp and cold as promised.',
  },
]

export const GALLERY = [
  { id: moment01, caption: 'Desi cow grazing at Devansh Farm', tall: true },
  { id: moment02, caption: 'Cow and calf at the dairy shed' },
  { id: moment03, caption: 'Healthy cows in green pasture' },
  { id: moment04, caption: 'Farmer caring for our desi cows', tall: true },
  { id: moment05, caption: 'Our happy herd inside the farm' },
  { id: moment06, caption: 'Devansh Farm at golden hour' },
  { id: IMAGES.paneerSlices, caption: 'Fresh paneer for the day\'s orders' },
  { id: IMAGES.labScience, caption: 'Quality lab — 26 checks per batch' },
  { id: IMAGES.highlandCow, caption: 'New arrivals settling in' },
  { id: IMAGES.gheeJar, caption: 'Bilona ghee, slow-cooked in copper' },
  { id: IMAGES.droneFarm, caption: 'The farm from above', tall: true },
  { id: IMAGES.yogurtGlass, caption: 'Curd setting in earthen pots' },
]

export const FAQS = [
  {
    q: 'How fresh is the milk when it reaches me?',
    a: 'Milk is collected at dawn, processed within two hours, and delivered the same morning — typically within 10–12 hours of milking. It often arrives cooler than supermarket milk.',
  },
  {
    q: 'Do you use preservatives or milk powder?',
    a: 'No. Our ingredient lists stay deliberately short. Nothing is reconstituted, and we never add preservatives, starches or artificial flavour to core products.',
  },
  {
    q: 'What are the delivery charges?',
    a: 'Standard delivery is ₹40 and free on orders above ₹499. Express delivery (same-day evening slot) is ₹99 flat.',
  },
  {
    q: 'Can I pause my subscription?',
    a: 'Yes — subscriptions are flexible. Pause, resume or change frequency anytime from your Account page; changes apply from the next delivery cycle.',
  },
]
