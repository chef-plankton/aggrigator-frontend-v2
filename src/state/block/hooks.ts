import { StaticJsonRpcProvider } from '@ethersproject/providers'
import useSWR, { useSWRConfig } from 'swr'

import useSWRImmutable from 'swr/immutable'
import useWallet from '../../components/Wallets/useWallet'

const REFRESH_BLOCK_INTERVAL = 6000

export const usePollBlockNumber = () => {

  const FAST_INTERVAL=1000, SLOW_INTERVAL=5000
  const { cache, mutate } = useSWRConfig()
  const hooks=useWallet('metamask')
  const {useProvider}=hooks
  // const provider=useProvider<StaticJsonRpcProvider>('https://data-seed-prebsc-2-s1.binance.org:8545/')
  const provider=useProvider()
  const { data } = useSWR(
    'blockNumber',
    async () => {
      const blockNumber = await provider.getBlockNumber()
      if (!cache.get('initialBlockNumber')) {
        mutate('initialBlockNumber', blockNumber)
      }
      return blockNumber
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    },
  )

  useSWR(
    [FAST_INTERVAL, 'blockNumber'],
    async () => {
      return data
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  useSWR(
    [SLOW_INTERVAL, 'blockNumber'],
    async () => {
      return data
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
}

export const useCurrentBlock = (): number => {
  const { data: currentBlock = 0 } = useSWRImmutable('blockNumber')
  return currentBlock
}

export const useInitialBlock = (): number => {
  const { data: initialBlock = 0 } = useSWRImmutable('initialBlockNumber')
  return initialBlock
}
