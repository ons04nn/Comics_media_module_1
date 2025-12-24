import '../index.css'
import React from 'react'

import { createRoot } from 'react-dom/client'



import O_Clicker  from '../components/O_Clicker.jsx'

const app = document.querySelector('.app')
const root = createRoot(app)
root.render(<O_Clicker />)