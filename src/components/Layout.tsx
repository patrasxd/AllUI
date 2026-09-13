import React, { forwardRef } from 'react'
import './Layout.css'

export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  gap?: Spacing
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
  inline?: boolean
  children?: React.ReactNode
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    direction = 'column',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    inline = false,
    children,
    className = '',
    ...props
  },
  ref
) {
  const classNames = [
    inline ? 'all-stack--inline' : 'all-stack',
    `all-stack--dir-${direction}`,
    `all-stack--gap-${gap}`,
    `all-stack--align-${align}`,
    `all-stack--justify-${justify}`,
    wrap ? 'all-stack--wrap' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  )
})

export interface FlexProps extends StackProps {}
export const Flex = Stack
