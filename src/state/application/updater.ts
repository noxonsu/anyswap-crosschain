import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ZERO_ADDRESS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useRouterConfigContract } from '../../hooks/useContract'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { getUrlData } from '../../utils/tools/axios'
import { updateBlockNumber, updateRouterData, updateActiveNetworks } from './actions'
import { useAppState } from './hooks'

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()
  const windowVisible = useIsWindowVisible()
  const { apiAddress, routerConfigAddress, routerConfigChainId } = useAppState()
  const routerConfig = useRouterConfigContract(routerConfigAddress, routerConfigChainId || 0)

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      if (chainId) {
        dispatch(updateBlockNumber({ chainId, blockNumber }))
      }
    },
    [chainId]
  )

  // attach/detach listeners

  useEffect(() => {
    const update = async () => {
      let networks: number[] = []

      try {
        const response: any = await getUrlData(`http://${apiAddress}/allchainids`)

        if (response?.msg === 'Success' && response?.data) {
          networks = response?.data
        }
      } catch (error) {
        console.error('Fetch active router networks: ', error)
      }

      dispatch(updateActiveNetworks({ networks }))
    }

    if (apiAddress) update()
  }, [apiAddress])

  useEffect(() => {
    if (!library || !chainId || !windowVisible) return

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch(error => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    library.on('block', blockNumberCallback)

    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [chainId, library, blockNumberCallback, windowVisible])

  useEffect(() => {
    const fetch = async () => {
      if (!routerConfig || !chainId) return

      const { RouterContract } = await routerConfig.methods.getChainConfig(chainId).call()

      dispatch(updateRouterData({ chainId, routerAddress: RouterContract === ZERO_ADDRESS ? '' : RouterContract }))
    }

    if (routerConfig && chainId) {
      fetch()
    } else {
      dispatch(updateRouterData({ chainId: chainId || 0, routerAddress: '' }))
    }
  }, [chainId, routerConfigAddress, routerConfigChainId, routerConfig])

  return null
}
