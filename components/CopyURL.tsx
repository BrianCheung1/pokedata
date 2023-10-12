import { CopyButton, ActionIcon, Tooltip, rem } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { usePathname } from 'next/navigation'

export const CopyURL = () => {
  const pathname = usePathname()

  return (
    <CopyButton value={`https://pokedata-rose.vercel.app${pathname}`} timeout={2000}>
    {({ copied, copy }) => (
      <Tooltip label={copied ? 'Copied' : 'Copy URL'} withArrow position="left">
        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
          {copied ? (
            <IconCheck style={{ width: rem(16) }} />
          ) : (
            <IconCopy style={{ width: rem(16) }} />
          )}
        </ActionIcon>
      </Tooltip>
    )}
  </CopyButton>
  )
}
