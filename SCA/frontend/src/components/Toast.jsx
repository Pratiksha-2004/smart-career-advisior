import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Toast.css'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const Toast = ({ toast, onClose }) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }

  return (
    <motion.div
      className={`toast toast-${toast.type}`}
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="toast-content">
        <div className="toast-icon">
          {icons[toast.type]}
        </div>
        <div className="toast-message">
          <h4>{toast.title}</h4>
          {toast.message && <p>{toast.message}</p>}
        </div>
        <button 
          className="toast-close"
          onClick={() => onClose(toast.id)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      
      <motion.div
        className="toast-progress"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: toast.duration / 1000, ease: "linear" }}
      />
    </motion.div>
  )
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now().toString()
    const newToast = {
      id,
      type: 'info',
      duration: 4000,
      ...toast
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const success = useCallback((title, message, options = {}) => {
    return addToast({ ...options, type: 'success', title, message })
  }, [addToast])

  const error = useCallback((title, message, options = {}) => {
    return addToast({ ...options, type: 'error', title, message, duration: 6000 })
  }, [addToast])

  const warning = useCallback((title, message, options = {}) => {
    return addToast({ ...options, type: 'warning', title, message })
  }, [addToast])

  const info = useCallback((title, message, options = {}) => {
    return addToast({ ...options, type: 'info', title, message })
  }, [addToast])

  const value = {
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              toast={toast}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}