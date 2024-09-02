import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const VECTOR_MAIN_CHAINID = 420044
export const VECTOR_MAIN = getLocalRPC(VECTOR_MAIN_CHAINID, 'https://testnet-rpc.vsgofficial.com')
export const VECTOR_MAIN_EXPLORER = 'https://testnet-scan.vsgofficial.com/'

export const tokenList = []
export const testTokenList = []

const symbol = 'VSG'

const bridgeToken = {
  [VERSION.V1]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
  },
  [VERSION.V5]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
    nativeToken: '',
    crossBridgeInitToken: ''
  },
  [VERSION.V7]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
    nativeToken: '',
    crossBridgeInitToken: ''
  },
}

export default {
  [VECTOR_MAIN_CHAINID]: {
    wrappedToken: '0xc6807ddc8DfB31c66114eFFaDe883b3C8eABBA83',
    tokenListUrl: tokenListUrl + VECTOR_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0x8D3185295E7800FB687BA75e8F9685e3D2435676',
    v1FactoryToken: '',
    v2FactoryToken: '',
    timelock: '',
    nodeRpc: VECTOR_MAIN,
    nodeRpcList: [VECTOR_MAIN],
    chainID: VECTOR_MAIN_CHAINID,
    lookHash: VECTOR_MAIN_EXPLORER + '/tx/',
    lookAddr: VECTOR_MAIN_EXPLORER + '/address/',
    lookBlock: VECTOR_MAIN_EXPLORER + '/block/',
    explorer: VECTOR_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Vector',
    networkName: 'Vector Testnet',
    networkLogo: 'VSG',
    type: 'main',
    label: VECTOR_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'VSG',
    anyToken: ''
  },
}