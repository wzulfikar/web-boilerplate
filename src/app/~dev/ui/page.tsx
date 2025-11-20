'use client'

import { Button } from '~/src/components/ui/button'
import { cn } from '~/src/utils/tailwind'

export default function Page() {
  return (
    <Section title="Button" description="Different kind of button variants">
      <Button onClick={log('Button clicked!')} variant="link">
        Ghost
      </Button>
      <Button onClick={log('Button clicked!')} variant="outline">
        Outline
      </Button>
      <Button onClick={log('Button clicked!')} variant="link">
        Link
      </Button>
      <Button onClick={log('Button clicked!')} variant="destructive">
        Destructive
      </Button>
    </Section>
  )
}

/**
 * A section to showcase different variant of one component
 */
function Section({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-1">
        <h3 className="font-medium">{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className={cn('flex gap-2 flex-wrap', className)}>{children}</div>
    </div>
  )
}

function log(message: string) {
  return () => console.log('log:', message)
}
