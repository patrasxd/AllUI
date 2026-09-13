import React from 'react'
import './Typography.css'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  children?: React.ReactNode
}

export function Heading({
  level = 2,
  children,
  className = '',
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType

  return (
    <Tag
      className={`all-heading all-heading--h${level} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}

export type TextVariant = 'body' | 'secondary' | 'dim' | 'caption' | 'code'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  as?: 'p' | 'span' | 'div' | 'label' | 'code'
  children?: React.ReactNode
}

export function Text({
  variant = 'body',
  as: Component = 'p',
  children,
  className = '',
  ...props
}: TextProps) {
  return (
    <Component
      className={`all-text-elem all-text--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}
