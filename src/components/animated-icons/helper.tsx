import { useAnimation } from 'motion/react'
import {
  createRef,
  type ForwardedRef,
  type HTMLAttributes,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { cn } from '~/src/utils/tailwind'

export const DEFAULT_SIZE = 17

const baseStyle =
  'cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center'

/**
 * Internal type helper for use in the animated icon components.
 *
 * `startAnimation` and `stopAnimation` are optional because they may be undefined
 * due to hydration error (I think) or other reason. So we're being defensive
 * here in favor of not throwing minor errors caused by undefined `startAnimation` or `stopAnimation`.
 */
export interface IconHandle {
  startAnimation?: () => void
  stopAnimation?: () => void
}

/**
 * Internal type helper for use in the animated icon components.
 */
export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
}

interface IconRef {
  ref: React.RefObject<IconHandle>
  onMouseProps: {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

/**
 * Internal helper hook that return common handles for creating an animated icons.
 * Use this in the icon files.
 */
export const useAnimatedIcon = (
  props: IconProps,
  ref: ForwardedRef<IconHandle>,
) => {
  const { onMouseEnter, onMouseLeave, className, size = DEFAULT_SIZE } = props
  const controls = useAnimation()
  const isControlledRef = useRef(false)

  useImperativeHandle(ref, () => {
    isControlledRef.current = true

    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    }
  })

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('animate')
      } else {
        onMouseEnter?.(e)
      }
    },
    [controls, onMouseEnter],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal')
      } else {
        onMouseLeave?.(e)
      }
    },
    [controls, onMouseLeave],
  )

  const WrapSVG = useMemo(() => {
    const Component = ({
      children,
      ...props
    }: { children: React.ReactNode } & IconProps) => {
      return (
        <div
          className={cn(baseStyle, className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </div>
      )
    }
    Component.displayName = 'WrapSVG'
    return Component
  }, [className, handleMouseEnter, handleMouseLeave])

  return { WrapSVG, controls, size }
}

/**
 * Hook to return ref handles for the animated icon components in the call sites.
 */
export const useIconsRef = <T extends string>(iconNames: T[]) => {
  const iconsRef = useRef<Record<T, IconRef>>(
    Object.fromEntries(
      iconNames.map((name) => [
        name,
        {
          ref: createRef<IconHandle>(),
          onMouseProps: {
            onMouseEnter: () => {
              iconsRef.current[name].ref.current?.startAnimation?.()
            },
            onMouseLeave: () => {
              iconsRef.current[name].ref.current?.stopAnimation?.()
            },
          },
        },
      ]),
    ) as Record<T, IconRef>,
  )

  return iconsRef.current
}
