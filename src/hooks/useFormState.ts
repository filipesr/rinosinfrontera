'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { FormData, SectionAnswer } from '@/types/form'

const STORAGE_KEY = 'rino-checklist-form'

function getEmptyAnswer(): SectionAnswer {
  return { selectedOptions: [], textarea: '' }
}

export function useFormState() {
  const [formData, setFormData] = useState<FormData>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setFormData(JSON.parse(stored))
      }
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true)
  }, [])

  // Persist to localStorage with debounce
  useEffect(() => {
    if (!isLoaded) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [formData, isLoaded])

  const updateSection = useCallback((sectionId: string, answer: Partial<SectionAnswer>) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...getEmptyAnswer(),
        ...prev[sectionId],
        ...answer,
      },
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData({})
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const isFormEmpty = Object.values(formData).every(
    a => a.selectedOptions.length === 0 && a.textarea.trim() === ''
  )

  return { formData, updateSection, resetForm, isFormEmpty, isLoaded }
}
