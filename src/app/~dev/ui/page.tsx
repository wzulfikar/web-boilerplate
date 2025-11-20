'use client'

import { Button } from '~/src/components/ui/button'

export default function Page() {
  return (
    <div>
      <Button onClick={() => console.log('Button clicked!')} variant="outline">
        Click me
      </Button>
    </div>
  )
}
