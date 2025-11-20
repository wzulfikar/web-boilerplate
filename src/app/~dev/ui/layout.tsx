'use client'

import { useState } from 'react'
import ThemeToggle from '~/src/components/ThemeToggle'
import { Button } from '~/src/components/ui/button'
import { Card, CardContent } from '~/src/components/ui/card'
import { cn } from '~/src/utils/tailwind'

const variants = {
  size: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    default: 'max-w-7xl',
  },
}

export default function DevLayoutContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const [size, setSize] = useState<keyof typeof variants.size>('default')

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-end space-x-2 mb-4 sticky top-2 z-10">
        <ToggleVariant label="xs" value={size} onChange={setSize} />
        <ToggleVariant label="sm" value={size} onChange={setSize} />
        <ToggleVariant label="md" value={size} onChange={setSize} />
        <ThemeToggle side="bottom" variant="simple" />
      </div>
      <div className={cn('mx-auto', size ? variants.size[size] : 'max-w-7xl')}>
        <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}

function ToggleVariant<T extends keyof typeof variants.size>({
  label,
  value,
  onChange,
}: {
  label: T
  value: T
  onChange: (value: T) => void
}) {
  return (
    <Button
      className={cn(
        'font-mono transition bg-accent/20',
        label === value &&
          'border-2 border-inset border-foreground/80 dark:border-foreground font-bold',
      )}
      variant="outline"
      onClick={() => onChange(label === value ? ('default' as T) : label)}
    >
      {label}
    </Button>
  )
}
