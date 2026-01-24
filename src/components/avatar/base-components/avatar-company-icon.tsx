import { cx, sortCx } from '@/utils/cx'

export const companyIconStyles = sortCx({
  base: 'absolute -right-0.5 -bottom-0.5 rounded-full bg-brand-25 object-cover ring-[1.5px] ring-bg-primary',
  sizes: {
    xs: 'size-2',
    sm: 'size-3',
    md: 'size-3.5',
    lg: 'size-4',
    xl: 'size-4.5',
    '2xl': 'size-5 ring-[1.67px]',
  },
})

export type CompanyIconSize = keyof typeof companyIconStyles.sizes

export interface AvatarCompanyIconProps {
  size: CompanyIconSize
  src: string
  alt?: string
}

export function AvatarCompanyIcon({ size, src, alt }: AvatarCompanyIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cx(companyIconStyles.base, companyIconStyles.sizes[size])}
    />
  )
}
