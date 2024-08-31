'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'

export default function Exams() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const openModal = (exam) => {
    setSelectedExam(exam)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedExam(null)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <div className="flex flex-col items-center px-4 py-12 space-y-12 bg-gradient-to-b from-gray-50 to-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">We cover all Exams and Classes</h1>
        <p className="mt-2 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          From videos to notes to tests, providing all you need to learn and practice in one place
        </p>
      </motion.div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="w-full max-w-6xl"
      >
        <motion.div
          variants={containerVariants}
          className="p-8 bg-white rounded-2xl shadow-lg mb-12"
        >
          <div className="flex items-center mb-8 justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">50+ Entrance Exams</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center">
              Explore all Exams
              <ChevronRight size={20} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "UPSC", icon: "/icons/upsc.png" },
              { name: "CAT", icon: "/icons/cat.png" },
              { name: "NEET", icon: "/icons/neet1.png" },
              { name: "JEE", icon: "/icons/jee1.png" },
              { name: "CLAT", icon: "/icons/clat1.png" },
              { name: "GATE", icon: "/icons/gate.png" },
              { name: "SSC", icon: "/icons/ssc.png" },
              { name: "Teaching", icon: "/icons/teaching.png" },
              { name: "Banking", icon: "/icons/banking.png" },
              { name: "Insurance", icon: "/icons/insurance.png" },
              { name: "State PSC", icon: "/icons/state.png" },
              { name: "State Exams", icon: "/icons/stateexam.png" },
              { name: "Defence", icon: "/icons/defence.png" },
              { name: "Police Exams", icon: "/icons/police.png" },
              { name: "Judiciary", icon: "/icons/judiciary.png" },
              { name: "GMAT", icon: "/icons/gmat.png" },
              { name: "IELTS", icon: "/icons/ielts.png" },
              { name: "GRE", icon: "/icons/gre.png" },
              { name: "IIT JAM", icon: "/icons/iitjam.png" },
              { name: "CA Exams", icon: "/icons/ca.png" },
              { name: "Railways", icon: "/icons/railways.png" },
              { name: "Agriculture", icon: "/icons/agriculture.png" },
            ].map((exam) => (
              <motion.div
                key={exam.name}
                variants={itemVariants}
                onClick={() => openModal(exam)}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md cursor-pointer group"
              >
                <div className="relative w-12 h-12 mb-2">
                  <Image 
                    src={exam.icon} 
                    alt={exam.name} 
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-blue-600">{exam.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="p-8 bg-white rounded-2xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">All School Classes</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center">
              Explore all Classes
              <ChevronRight size={20} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Class 1", icon: "/icons/class1.png" },
              { name: "Class 2", icon: "/icons/class2.png" },
              { name: "Class 3", icon: "/icons/class3.png" },
              { name: "Class 4", icon: "/icons/class4.png" },
              { name: "Class 5", icon: "/icons/class5.png" },
              { name: "Class 6", icon: "/icons/class6.png" },
              { name: "Class 7", icon: "/icons/class7.png" },
              { name: "Class 8", icon: "/icons/class8.png" },
              { name: "Class 9", icon: "/icons/class9.png" },
              { name: "Class 10", icon: "/icons/class10.png" },
              { name: "Class 11", icon: "/icons/class11.png" },
              { name: "Class 12", icon: "/icons/class12.png" },
            ].map((exam) => (
              <motion.div
                key={exam.name}
                variants={itemVariants}
                onClick={() => openModal(exam)}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md cursor-pointer group"
              >
                <div className="relative w-12 h-12 mb-2">
                  <Image 
                    src={exam.icon} 
                    alt={exam.name} 
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-blue-600">{exam.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {modalIsOpen && selectedExam && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src={selectedExam.icon}
                  alt={selectedExam.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedExam.name}</h2>
              <p className="text-gray-600 text-center mb-8">
                Here is a brief description of the {selectedExam.name} exam. This will give you a better idea of what to expect.
              </p>
              <div className="flex space-x-4">
                <Link href="/Main/signup">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center">
                    Know More
                    <ChevronRight size={20} className="ml-2" />
                  </button>
                </Link>
                <button 
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}