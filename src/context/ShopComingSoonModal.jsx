// import { createContext, useContext, useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { X } from 'lucide-react'
// import logo from '../assets/products/cheese.png'

// const ShopModalContext = createContext(null)

// export function ShopModalProvider({ children }) {
//   const [isOpen, setIsOpen] = useState(false)

//   const openShopComingSoon = () => setIsOpen(true)
//   const closeShopComingSoon = () => setIsOpen(false)

//   return (
//     <ShopModalContext.Provider
//       value={{
//         openShopComingSoon,
//         closeShopComingSoon,
//       }}
//     >
//       {children}

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeShopComingSoon}
//           >
//             <motion.div
//               role="dialog"
//               aria-modal="true"
//               aria-labelledby="shop-coming-soon-title"
//               initial={{
//                 opacity: 0,
//                 scale: 0.88,
//                 y: 24,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.94,
//                 y: 12,
//               }}
//               transition={{
//                 duration: 0.45,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               onClick={(e) => e.stopPropagation()}
//               className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-cream-50 shadow-2xl"
//             >
//               {/* Close button */}
//               <button
//                 type="button"
//                 onClick={closeShopComingSoon}
//                 aria-label="Close"
//                 className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
//               >
//                 <X size={18} />
//               </button>

//               {/* Image */}
//               <div className="h-48 w-full overflow-hidden bg-forest-deeper">
//                 <img
//                   src={logo}
//                   alt="Devansh Dairy"
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-6 text-center sm:p-7">
//                 <span className="chip bg-gold/10 text-gold">
//                   Coming Soon
//                 </span>

//                 <h2
//                   id="shop-coming-soon-title"
//                   className="mt-3 font-display text-2xl font-semibold leading-tight text-forest-deeper"
//                 >
//                   Our Online Store Is Coming Soon...
//                 </h2>

//                 <p className="mt-4 text-sm leading-relaxed text-forest-deeper/60">
//                   We're putting the finishing touches on our online
//                   shop. Soon you'll be able to order fresh dairy products online
//                   directly from Devansh Dairy.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={closeShopComingSoon}
//                   className="btn-gold mt-6 w-full justify-center"
//                 >
//                   Got It
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </ShopModalContext.Provider>
//   )
// }

// export function useShopModal() {
//   const context = useContext(ShopModalContext)

//   if (!context) {
//     throw new Error(
//       'useShopModal must be used inside ShopModalProvider'
//     )
//   }

//   return context
// }




import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Settings, Clock3 } from 'lucide-react'

const ShopModalContext = createContext(null)

export function ShopModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openShopComingSoon = () => setIsOpen(true)
  const closeShopComingSoon = () => setIsOpen(false)

  return (
    <ShopModalContext.Provider
      value={{
        openShopComingSoon,
        closeShopComingSoon,
      }}
    >
      {children}


      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              fixed inset-0 z-[99999]
              flex items-center justify-center
              bg-forest-deeper/70
              px-4
              backdrop-blur-md
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeShopComingSoon}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="shop-coming-soon-title"
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 24,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                flex
                h-[95vh]
                w-full
                max-w-2xl
                flex-col
                overflow-hidden
                rounded-[2rem]
                bg-cream-50
                shadow-2xl
              "
            >
              {/* Decorative background */}
              <div
                className="
                  pointer-events-none
                  absolute -right-24 -top-24
                  h-64 w-64
                  rounded-full
                  bg-gold/10
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute -bottom-32 -left-24
                  h-72 w-72
                  rounded-full
                  bg-forest/5
                "
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={closeShopComingSoon}
                aria-label="Close"
                className="
                  absolute right-4 top-4 z-30
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-forest-deeper/80
                  text-white
                  shadow-lg
                  backdrop-blur-sm
                  transition-all duration-200
                  hover:rotate-90
                  hover:bg-forest-deeper
                "
              >
                <X size={18} />
              </button>

              {/* =================================
                  45% — HERO / ANIMATION
              ================================== */}
              <div
                className="
                  relative
                  h-[45%]
                  min-h-0
                  shrink-0
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  bg-forest-deeper
                "
              >
                {/* Decorative circle */}
                <motion.div
                  className="
                    absolute
                    h-40 w-40
                    rounded-full
                    border border-gold/20
                  "
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Rotating circle */}
                <motion.div
                  className="
                    absolute
                    h-56 w-56
                    rounded-full
                    border border-gold/10
                  "
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Floating dot */}
                <motion.span
                  className="
                    absolute
                    left-[18%] top-[25%]
                    h-2 w-2
                    rounded-full
                    bg-gold
                  "
                  animate={{
                    y: [-5, 10, -5],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                />

                {/* Floating dot */}
                <motion.span
                  className="
                    absolute
                    right-[20%] top-[30%]
                    h-3 w-3
                    rounded-full
                    bg-gold/50
                  "
                  animate={{
                    y: [10, -8, 10],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />

                {/* Main animation */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="
                      mx-auto
                      flex
                      h-20 w-20
                      items-center justify-center
                      rounded-3xl
                      border border-gold/30
                      bg-gold/10
                      text-gold
                      shadow-[0_0_50px_rgba(212,175,55,0.15)]
                    "
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Settings
                      size={44}
                      strokeWidth={1.5}
                      className="animate-spin"
                      style={{
                        animationDuration: '5s',
                      }}
                    />
                  </motion.div>

                  <div className="mt-3">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border border-gold/30
                        bg-gold/10
                        px-4 py-1.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-gold
                      "
                    >
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================
                  55% — CONTENT
              ================================== */}
              <div
                className="
                  relative z-10
                  flex
                  h-[55%]
                  min-h-0
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  px-6
                  py-5
                  text-center
                  sm:px-8
                "
              >
                {/* Heading */}
                <h2
                  id="shop-coming-soon-title"
                  className="
                    font-display
                    text-2xl
                    font-semibold
                    leading-tight
                    text-forest-deeper
                    sm:text-3xl
                  "
                >
                  Our Online Store
                  <br />
                  <span className="text-gold">
                    Is Coming Soon...
                  </span>
                </h2>

                {/* Description */}
                <p
                  className="
                    mx-auto
                    mt-3
                    max-w-lg
                    text-sm
                    leading-6
                    text-forest-deeper/60
                    sm:text-base
                  "
                >
                  We're putting the finishing touches on our
                  online shop. Soon you'll be able to order
                  fresh dairy products directly from
                  <span className="font-semibold text-forest-deeper">
                    {' '}Devansh Dairy.
                  </span>
                </p>

                {/* Progress */}
                {/* <div className="mx-auto mt-5 w-full max-w-md">
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                      text-xs
                    "
                  >
                    <span className="font-medium text-forest-deeper/50">
                      Website Progress
                    </span>

                    <span className="font-semibold text-gold">
                      Coming Soon
                    </span>
                  </div>

                  <div
                    className="
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-forest-deeper/10
                    "
                  >
                    <motion.div
                      className="
                        h-full
                        rounded-full
                        bg-gold
                      "
                      initial={{ width: '0%' }}
                      animate={{ width: '75%' }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div> */}

                {/* Patience */}
                <div
                  className="
                    mx-auto
                    mt-4
                    flex
                    w-full
                    max-w-md
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-forest-deeper/5
                    px-4
                    py-3
                    text-left
                  "
                >
                  <div
                    className="
                      flex
                      h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gold/10
                      text-gold
                    "
                  >
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-forest-deeper
                      "
                    >
                      Thank you for your patience!
                    </p>

                    <p
                      className="
                        text-xs
                        text-forest-deeper/50
                      "
                    >
                      We'll be ready to serve you soon.
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={closeShopComingSoon}
                  className="
                    btn-gold
                    mt-4
                    w-full
                    max-w-md
                    justify-center
                  "
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </ShopModalContext.Provider>
  )
}

export function useShopModal() {
  const context = useContext(ShopModalContext)

  if (!context) {
    throw new Error(
      'useShopModal must be used inside ShopModalProvider'
    )
  }

  return context
}

