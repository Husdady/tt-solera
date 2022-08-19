// React
// import React from 'react'

// Components
import AppLogo from './index'

// Librarys
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

test('Render Logo Image', () => {
  render(<AppLogo />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
