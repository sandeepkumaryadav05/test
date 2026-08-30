const PALETTES = [
  ['#E4EEE4', '#5C8A4A', '#1E4633'],
  ['#FAF4E8', '#D9A441', '#B8862B'],
  ['#F3EADA', '#A96F44', '#7C5A3A'],
  ['#EDF3E6', '#2C5C43', '#143122'],
]

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function fallbackImage(label = 'Devansh', seed = 0) {
  const p = PALETTES[Math.abs(seed) % PALETTES.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${p[0]}"/><stop offset="100%" stop-color="${p[1]}"/>
</linearGradient></defs>
<rect width="800" height="800" fill="url(#g)"/>
<circle cx="640" cy="140" r="180" fill="${p[2]}" opacity="0.12"/>
<circle cx="120" cy="680" r="220" fill="#FFFFFF" opacity="0.14"/>
<path d="M400 300c56 63 98 108 98 161a98 98 0 1 1-196 0c0-53 42-98 98-161z" fill="#FDFAF3" opacity="0.92"/>
<text x="400" y="600" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="${p[2]}">${esc(label)}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const PRODUCT_ASSETS = import.meta.glob('../assets/products/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

export function productAsset(name) {
  if (!name) return null
  const key = Object.keys(PRODUCT_ASSETS).find((k) =>
    k.toLowerCase().includes(`/${String(name).toLowerCase()}.`),
  )
  return key ? PRODUCT_ASSETS[key] : null
}

import cowsPasture from '../assets/images/cows/cows-pasture.webp'
import cowClose from '../assets/images/cows/cow-closeup.webp'
import cowNose from '../assets/images/cows/cow-face.webp'
import cowFarmShed from '../assets/images/cows/cow-farm-shed.webp'
import cowsGrazing from '../assets/images/cows/cows-grazing.webp'
import farmCows from '../assets/images/cows/farm-cows.webp'

import milkSplash from '../assets/images/dairy/milk-pour.webp'
import milkBottles from '../assets/images/dairy/milk-pour.webp'
import milkPour from '../assets/images/dairy/milk-pour.webp'
import yogurtBowl from '../assets/images/dairy/yogurt-bowl.webp'
import yogurtGlass from '../assets/images/dairy/yogurt-glass.webp'
import butter from '../assets/images/dairy/butter.webp'
import gheeJar from '../assets/products/ghee.png'
import goldenCream from '../assets/images/dairy/golden-cream.webp'

import paneerFresh from '../assets/images/products/paneer-fresh.webp'
import paneerBlock from '../assets/images/products/paneer-block.webp'
import paneerSlices from '../assets/images/products/paneer-slices.webp'
import paneerPlate from '../assets/images/products/paneer-plate.webp'
import cheeseBoard from '../assets/images/products/cheese-board.webp'
import cheesePlates from '../assets/images/products/cheese-plates.webp'
import cheddar from '../assets/images/products/cheddar.webp'
import milkshake from '../assets/images/products/milkshake.webp'
import smoothie from '../assets/images/products/smoothie.webp'
import mangoDrink from '../assets/images/products/mango-drink.webp'
import spicedDrink from '../assets/images/products/spiced-drink.webp'

import greenField from '../assets/images/farm/green-field.webp'
import sunsetField from '../assets/images/farm/sunset-field.webp'
import milkCrates from '../assets/images/farm/milk-crates.webp'
import cropField from '../assets/images/farm/crop-field.webp'
import droneFarm from '../assets/images/farm/drone-farm.webp'

import farmerHands from '../assets/images/farmers/farmer-hands.webp'

import labScience from '../assets/images/laboratory/lab-science.webp'
import labMicroscope from '../assets/images/laboratory/lab-microscope.webp'

export const IMAGES = {
  milkSplash,
  milkBottles,
  milkPour,
  yogurtBowl,
  yogurtGlass,
  butter,
  gheeJar,
  paneerFresh,
  paneerBlock,
  paneerSlices,
  paneerPlate,
  cheeseBoard,
  cheesePlates,
  cheddar,
  milkshake,
  smoothie,
  mangoDrink,
  spicedDrink,
  goldenCream,
  cowsPasture,
  cowClose,
  cowNose,
  highlandCow: farmCows,
  meadowCows: cowsGrazing,
  farmCow: cowFarmShed,
  farmAnimals: farmCows,
  farmerHands,
  greenField,
  sunsetField,
  milkCrates,
  cropField,
  droneFarm,
  labScience,
  labMicroscope,
}
