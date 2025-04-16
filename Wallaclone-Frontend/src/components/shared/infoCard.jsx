import React from 'react'
import { Link } from 'react-router-dom'

export function InfoCard({
  title,
  subtitle,
  message,
  footerText,
  linkText,
  linkTo,
  className = '',
  ...props
}) {
  return (
    <div className={className} {...props}>
      {title}
      {subtitle}
      {message }
      <div>
        {footerText}
        {linkText && linkTo && <Link to={linkTo}>{linkText}</Link>}
      </div>
    </div>
  )
}
