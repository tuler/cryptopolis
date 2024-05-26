import {
    createUseReadContract,
    createUseWriteContract,
    createUseSimulateContract,
    createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuthorityFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const authorityFactoryAbi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'authorityOwner',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'authority',
                internalType: 'contract Authority',
                type: 'address',
                indexed: false,
            },
        ],
        name: 'AuthorityCreated',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_authorityOwner',
                internalType: 'address',
                type: 'address',
            },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'calculateAuthorityAddress',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_authorityOwner',
                internalType: 'address',
                type: 'address',
            },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'newAuthority',
        outputs: [
            { name: '', internalType: 'contract Authority', type: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_authorityOwner',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'newAuthority',
        outputs: [
            { name: '', internalType: 'contract Authority', type: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
] as const

export const authorityFactoryAddress =
    '0xf26a5b278C25D8D41A136d22Ad719EACEd9c3e63' as const

export const authorityFactoryConfig = {
    address: authorityFactoryAddress,
    abi: authorityFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuthorityHistoryPairFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const authorityHistoryPairFactoryAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_authorityFactory',
                internalType: 'contract IAuthorityFactory',
                type: 'address',
            },
            {
                name: '_historyFactory',
                internalType: 'contract IHistoryFactory',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'authorityFactory',
                internalType: 'contract IAuthorityFactory',
                type: 'address',
                indexed: false,
            },
            {
                name: 'historyFactory',
                internalType: 'contract IHistoryFactory',
                type: 'address',
                indexed: false,
            },
        ],
        name: 'AuthorityHistoryPairFactoryCreated',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_authorityOwner',
                internalType: 'address',
                type: 'address',
            },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'calculateAuthorityHistoryAddressPair',
        outputs: [
            {
                name: 'authorityAddress_',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'historyAddress_',
                internalType: 'address',
                type: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getAuthorityFactory',
        outputs: [
            {
                name: '',
                internalType: 'contract IAuthorityFactory',
                type: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getHistoryFactory',
        outputs: [
            {
                name: '',
                internalType: 'contract IHistoryFactory',
                type: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_authorityOwner',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'newAuthorityHistoryPair',
        outputs: [
            {
                name: 'authority_',
                internalType: 'contract Authority',
                type: 'address',
            },
            {
                name: 'history_',
                internalType: 'contract History',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_authorityOwner',
                internalType: 'address',
                type: 'address',
            },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'newAuthorityHistoryPair',
        outputs: [
            {
                name: 'authority_',
                internalType: 'contract Authority',
                type: 'address',
            },
            {
                name: 'history_',
                internalType: 'contract History',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
] as const

export const authorityHistoryPairFactoryAddress =
    '0x3890A047Cf9Af60731E80B2105362BbDCD70142D' as const

export const authorityHistoryPairFactoryConfig = {
    address: authorityHistoryPairFactoryAddress,
    abi: authorityHistoryPairFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bitmask
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bitmaskAbi = [] as const

export const bitmaskAddress =
    '0xF5B2d8c81cDE4D6238bBf20D3D77DB37df13f735' as const

export const bitmaskConfig = {
    address: bitmaskAddress,
    abi: bitmaskAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CartesiDAppFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cartesiDAppFactoryAbi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'consensus',
                internalType: 'contract IConsensus',
                type: 'address',
                indexed: true,
            },
            {
                name: 'dappOwner',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'templateHash',
                internalType: 'bytes32',
                type: 'bytes32',
                indexed: false,
            },
            {
                name: 'application',
                internalType: 'contract CartesiDApp',
                type: 'address',
                indexed: false,
            },
        ],
        name: 'ApplicationCreated',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_consensus',
                internalType: 'contract IConsensus',
                type: 'address',
            },
            { name: '_dappOwner', internalType: 'address', type: 'address' },
            { name: '_templateHash', internalType: 'bytes32', type: 'bytes32' },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'calculateApplicationAddress',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_consensus',
                internalType: 'contract IConsensus',
                type: 'address',
            },
            { name: '_dappOwner', internalType: 'address', type: 'address' },
            { name: '_templateHash', internalType: 'bytes32', type: 'bytes32' },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'newApplication',
        outputs: [
            { name: '', internalType: 'contract CartesiDApp', type: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_consensus',
                internalType: 'contract IConsensus',
                type: 'address',
            },
            { name: '_dappOwner', internalType: 'address', type: 'address' },
            { name: '_templateHash', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'newApplication',
        outputs: [
            { name: '', internalType: 'contract CartesiDApp', type: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
] as const

export const cartesiDAppFactoryAddress =
    '0x7122cd1221C20892234186facfE8615e6743Ab02' as const

export const cartesiDAppFactoryConfig = {
    address: cartesiDAppFactoryAddress,
    abi: cartesiDAppFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CartesiMathV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cartesiMathV2Abi = [
    {
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'clz',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'ctz',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'getLog2Floor',
        outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'getLog2TableTimes1M',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'isPowerOf2',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'log2ApproxTimes1M',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'pure',
    },
] as const

export const cartesiMathV2Address =
    '0xB634F716BEd5Dd5A2b9a91C92474C499e50Cb27D' as const

export const cartesiMathV2Config = {
    address: cartesiMathV2Address,
    abi: cartesiMathV2Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DAppAddressRelay
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dAppAddressRelayAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: '_dapp', internalType: 'address', type: 'address' }],
        name: 'relayDAppAddress',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

export const dAppAddressRelayAddress =
    '0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE' as const

export const dAppAddressRelayConfig = {
    address: dAppAddressRelayAddress,
    abi: dAppAddressRelayAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155BatchPortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155BatchPortalAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_token',
                internalType: 'contract IERC1155',
                type: 'address',
            },
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
            { name: '_values', internalType: 'uint256[]', type: 'uint256[]' },
            { name: '_baseLayerData', internalType: 'bytes', type: 'bytes' },
            { name: '_execLayerData', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'depositBatchERC1155Token',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
        stateMutability: 'view',
    },
] as const

export const erc1155BatchPortalAddress =
    '0xedB53860A6B52bbb7561Ad596416ee9965B055Aa' as const

export const erc1155BatchPortalConfig = {
    address: erc1155BatchPortalAddress,
    abi: erc1155BatchPortalAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155SinglePortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155SinglePortalAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_token',
                internalType: 'contract IERC1155',
                type: 'address',
            },
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
            { name: '_value', internalType: 'uint256', type: 'uint256' },
            { name: '_baseLayerData', internalType: 'bytes', type: 'bytes' },
            { name: '_execLayerData', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'depositSingleERC1155Token',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
        stateMutability: 'view',
    },
] as const

export const erc1155SinglePortalAddress =
    '0x7CFB0193Ca87eB6e48056885E026552c3A941FC4' as const

export const erc1155SinglePortalConfig = {
    address: erc1155SinglePortalAddress,
    abi: erc1155SinglePortalAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Portal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20PortalAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_token',
                internalType: 'contract IERC20',
                type: 'address',
            },
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_amount', internalType: 'uint256', type: 'uint256' },
            { name: '_execLayerData', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'depositERC20Tokens',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
        stateMutability: 'view',
    },
] as const

export const erc20PortalAddress =
    '0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB' as const

export const erc20PortalConfig = {
    address: erc20PortalAddress,
    abi: erc20PortalAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Portal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721PortalAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            {
                name: '_token',
                internalType: 'contract IERC721',
                type: 'address',
            },
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
            { name: '_baseLayerData', internalType: 'bytes', type: 'bytes' },
            { name: '_execLayerData', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'depositERC721Token',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
        stateMutability: 'view',
    },
] as const

export const erc721PortalAddress =
    '0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87' as const

export const erc721PortalConfig = {
    address: erc721PortalAddress,
    abi: erc721PortalAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EtherPortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const etherPortalAbi = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    { type: 'error', inputs: [], name: 'EtherTransferFailed' },
    {
        type: 'function',
        inputs: [
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_execLayerData', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'depositEther',
        outputs: [],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
        stateMutability: 'view',
    },
] as const

export const etherPortalAddress =
    '0xFfdbe43d4c855BF7e0f105c400A50857f53AB044' as const

export const etherPortalConfig = {
    address: etherPortalAddress,
    abi: etherPortalAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HistoryFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const historyFactoryAbi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'historyOwner',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'history',
                internalType: 'contract History',
                type: 'address',
                indexed: false,
            },
        ],
        name: 'HistoryCreated',
    },
    {
        type: 'function',
        inputs: [
            { name: '_historyOwner', internalType: 'address', type: 'address' },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'calculateHistoryAddress',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: '_historyOwner', internalType: 'address', type: 'address' },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'newHistory',
        outputs: [
            { name: '', internalType: 'contract History', type: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: '_historyOwner', internalType: 'address', type: 'address' },
        ],
        name: 'newHistory',
        outputs: [
            { name: '', internalType: 'contract History', type: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
] as const

export const historyFactoryAddress =
    '0x1f158b5320BBf677FdA89F9a438df99BbE560A26' as const

export const historyFactoryConfig = {
    address: historyFactoryAddress,
    abi: historyFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InputBox
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const inputBoxAbi = [
    { type: 'error', inputs: [], name: 'InputSizeExceedsLimit' },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'dapp',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'inputIndex',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true,
            },
            {
                name: 'sender',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'input',
                internalType: 'bytes',
                type: 'bytes',
                indexed: false,
            },
        ],
        name: 'InputAdded',
    },
    {
        type: 'function',
        inputs: [
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_input', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'addInput',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'getInputHash',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: '_dapp', internalType: 'address', type: 'address' }],
        name: 'getNumberOfInputs',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
] as const

export const inputBoxAddress =
    '0x59b22D57D4f067708AB0c00552767405926dc768' as const

export const inputBoxConfig = {
    address: inputBoxAddress,
    abi: inputBoxAbi,
} as const


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MerkleV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const merkleV2Abi = [
    {
        type: 'function',
        inputs: [
            { name: 'hashes', internalType: 'bytes32[]', type: 'bytes32[]' },
        ],
        name: 'calculateRootFromPowerOfTwo',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
        name: 'getEmptyTreeHashAtIndex',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [
            { name: '_data', internalType: 'bytes', type: 'bytes' },
            { name: '_wordIndex', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'getHashOfWordAtIndex',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [
            { name: '_data', internalType: 'bytes', type: 'bytes' },
            { name: '_log2Size', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'getMerkleRootFromBytes',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        inputs: [
            { name: '_position', internalType: 'uint256', type: 'uint256' },
            {
                name: '_logSizeOfReplacement',
                internalType: 'uint256',
                type: 'uint256',
            },
            {
                name: '_logSizeOfFullDrive',
                internalType: 'uint256',
                type: 'uint256',
            },
            { name: '_replacement', internalType: 'bytes32', type: 'bytes32' },
            { name: 'siblings', internalType: 'bytes32[]', type: 'bytes32[]' },
        ],
        name: 'getRootAfterReplacementInDrive',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        stateMutability: 'pure',
    },
] as const

export const merkleV2Address =
    '0x33436035441927Df1a73FE3AAC5906854632e53d' as const

export const merkleV2Config = {
    address: merkleV2Address,
    abi: merkleV2Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UnrolledCordic
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const unrolledCordicAbi = [
    {
        type: 'function',
        inputs: [{ name: 'val', internalType: 'uint256', type: 'uint256' }],
        name: 'log2Times1e18',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'pure',
    },
] as const

export const unrolledCordicAddress =
    '0x3F8FdcD1B0F421D817BF58C96b7C91B98100B450' as const

export const unrolledCordicConfig = {
    address: unrolledCordicAddress,
    abi: unrolledCordicAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
    {
        type: 'event',
        inputs: [
            { name: 'owner', type: 'address', indexed: true },
            { name: 'spender', type: 'address', indexed: true },
            { name: 'value', type: 'uint256', indexed: false },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        inputs: [
            { name: 'from', type: 'address', indexed: true },
            { name: 'to', type: 'address', indexed: true },
            { name: 'value', type: 'uint256', indexed: false },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'decimals',
        outputs: [{ type: 'uint8' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'sender', type: 'address' },
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ type: 'bool' }],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link authorityFactoryAbi}__
 */
export const useReadAuthorityFactory = /*#__PURE__*/ createUseReadContract({
    abi: authorityFactoryAbi,
    address: authorityFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link authorityFactoryAbi}__ and `functionName` set to `"calculateAuthorityAddress"`
 */
export const useReadAuthorityFactoryCalculateAuthorityAddress =
    /*#__PURE__*/ createUseReadContract({
        abi: authorityFactoryAbi,
        address: authorityFactoryAddress,
        functionName: 'calculateAuthorityAddress',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link authorityFactoryAbi}__
 */
export const useWriteAuthorityFactory = /*#__PURE__*/ createUseWriteContract({
    abi: authorityFactoryAbi,
    address: authorityFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link authorityFactoryAbi}__ and `functionName` set to `"newAuthority"`
 */
export const useWriteAuthorityFactoryNewAuthority =
    /*#__PURE__*/ createUseWriteContract({
        abi: authorityFactoryAbi,
        address: authorityFactoryAddress,
        functionName: 'newAuthority',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link authorityFactoryAbi}__
 */
export const useSimulateAuthorityFactory =
    /*#__PURE__*/ createUseSimulateContract({
        abi: authorityFactoryAbi,
        address: authorityFactoryAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link authorityFactoryAbi}__ and `functionName` set to `"newAuthority"`
 */
export const useSimulateAuthorityFactoryNewAuthority =
    /*#__PURE__*/ createUseSimulateContract({
        abi: authorityFactoryAbi,
        address: authorityFactoryAddress,
        functionName: 'newAuthority',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link authorityFactoryAbi}__
 */
export const useWatchAuthorityFactoryEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: authorityFactoryAbi,
        address: authorityFactoryAddress,
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link authorityFactoryAbi}__ and `eventName` set to `"AuthorityCreated"`
 */
export const useWatchAuthorityFactoryAuthorityCreatedEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: authorityFactoryAbi,
        address: authorityFactoryAddress,
        eventName: 'AuthorityCreated',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__
 */
export const useReadAuthorityHistoryPairFactory =
    /*#__PURE__*/ createUseReadContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__ and `functionName` set to `"calculateAuthorityHistoryAddressPair"`
 */
export const useReadAuthorityHistoryPairFactoryCalculateAuthorityHistoryAddressPair =
    /*#__PURE__*/ createUseReadContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'calculateAuthorityHistoryAddressPair',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__ and `functionName` set to `"getAuthorityFactory"`
 */
export const useReadAuthorityHistoryPairFactoryGetAuthorityFactory =
    /*#__PURE__*/ createUseReadContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'getAuthorityFactory',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__ and `functionName` set to `"getHistoryFactory"`
 */
export const useReadAuthorityHistoryPairFactoryGetHistoryFactory =
    /*#__PURE__*/ createUseReadContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'getHistoryFactory',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__
 */
export const useWriteAuthorityHistoryPairFactory =
    /*#__PURE__*/ createUseWriteContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__ and `functionName` set to `"newAuthorityHistoryPair"`
 */
export const useWriteAuthorityHistoryPairFactoryNewAuthorityHistoryPair =
    /*#__PURE__*/ createUseWriteContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'newAuthorityHistoryPair',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__
 */
export const useSimulateAuthorityHistoryPairFactory =
    /*#__PURE__*/ createUseSimulateContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__ and `functionName` set to `"newAuthorityHistoryPair"`
 */
export const useSimulateAuthorityHistoryPairFactoryNewAuthorityHistoryPair =
    /*#__PURE__*/ createUseSimulateContract({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'newAuthorityHistoryPair',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__
 */
export const useWatchAuthorityHistoryPairFactoryEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link authorityHistoryPairFactoryAbi}__ and `eventName` set to `"AuthorityHistoryPairFactoryCreated"`
 */
export const useWatchAuthorityHistoryPairFactoryAuthorityHistoryPairFactoryCreatedEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: authorityHistoryPairFactoryAbi,
        address: authorityHistoryPairFactoryAddress,
        eventName: 'AuthorityHistoryPairFactoryCreated',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__
 */
export const useReadCartesiDAppFactory = /*#__PURE__*/ createUseReadContract({
    abi: cartesiDAppFactoryAbi,
    address: cartesiDAppFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__ and `functionName` set to `"calculateApplicationAddress"`
 */
export const useReadCartesiDAppFactoryCalculateApplicationAddress =
    /*#__PURE__*/ createUseReadContract({
        abi: cartesiDAppFactoryAbi,
        address: cartesiDAppFactoryAddress,
        functionName: 'calculateApplicationAddress',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__
 */
export const useWriteCartesiDAppFactory = /*#__PURE__*/ createUseWriteContract({
    abi: cartesiDAppFactoryAbi,
    address: cartesiDAppFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__ and `functionName` set to `"newApplication"`
 */
export const useWriteCartesiDAppFactoryNewApplication =
    /*#__PURE__*/ createUseWriteContract({
        abi: cartesiDAppFactoryAbi,
        address: cartesiDAppFactoryAddress,
        functionName: 'newApplication',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__
 */
export const useSimulateCartesiDAppFactory =
    /*#__PURE__*/ createUseSimulateContract({
        abi: cartesiDAppFactoryAbi,
        address: cartesiDAppFactoryAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__ and `functionName` set to `"newApplication"`
 */
export const useSimulateCartesiDAppFactoryNewApplication =
    /*#__PURE__*/ createUseSimulateContract({
        abi: cartesiDAppFactoryAbi,
        address: cartesiDAppFactoryAddress,
        functionName: 'newApplication',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__
 */
export const useWatchCartesiDAppFactoryEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: cartesiDAppFactoryAbi,
        address: cartesiDAppFactoryAddress,
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cartesiDAppFactoryAbi}__ and `eventName` set to `"ApplicationCreated"`
 */
export const useWatchCartesiDAppFactoryApplicationCreatedEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: cartesiDAppFactoryAbi,
        address: cartesiDAppFactoryAddress,
        eventName: 'ApplicationCreated',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__
 */
export const useReadCartesiMathV2 = /*#__PURE__*/ createUseReadContract({
    abi: cartesiMathV2Abi,
    address: cartesiMathV2Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__ and `functionName` set to `"clz"`
 */
export const useReadCartesiMathV2Clz = /*#__PURE__*/ createUseReadContract({
    abi: cartesiMathV2Abi,
    address: cartesiMathV2Address,
    functionName: 'clz',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__ and `functionName` set to `"ctz"`
 */
export const useReadCartesiMathV2Ctz = /*#__PURE__*/ createUseReadContract({
    abi: cartesiMathV2Abi,
    address: cartesiMathV2Address,
    functionName: 'ctz',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__ and `functionName` set to `"getLog2Floor"`
 */
export const useReadCartesiMathV2GetLog2Floor =
    /*#__PURE__*/ createUseReadContract({
        abi: cartesiMathV2Abi,
        address: cartesiMathV2Address,
        functionName: 'getLog2Floor',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__ and `functionName` set to `"getLog2TableTimes1M"`
 */
export const useReadCartesiMathV2GetLog2TableTimes1M =
    /*#__PURE__*/ createUseReadContract({
        abi: cartesiMathV2Abi,
        address: cartesiMathV2Address,
        functionName: 'getLog2TableTimes1M',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__ and `functionName` set to `"isPowerOf2"`
 */
export const useReadCartesiMathV2IsPowerOf2 =
    /*#__PURE__*/ createUseReadContract({
        abi: cartesiMathV2Abi,
        address: cartesiMathV2Address,
        functionName: 'isPowerOf2',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cartesiMathV2Abi}__ and `functionName` set to `"log2ApproxTimes1M"`
 */
export const useReadCartesiMathV2Log2ApproxTimes1M =
    /*#__PURE__*/ createUseReadContract({
        abi: cartesiMathV2Abi,
        address: cartesiMathV2Address,
        functionName: 'log2ApproxTimes1M',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dAppAddressRelayAbi}__
 */
export const useReadDAppAddressRelay = /*#__PURE__*/ createUseReadContract({
    abi: dAppAddressRelayAbi,
    address: dAppAddressRelayAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dAppAddressRelayAbi}__ and `functionName` set to `"getInputBox"`
 */
export const useReadDAppAddressRelayGetInputBox =
    /*#__PURE__*/ createUseReadContract({
        abi: dAppAddressRelayAbi,
        address: dAppAddressRelayAddress,
        functionName: 'getInputBox',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dAppAddressRelayAbi}__
 */
export const useWriteDAppAddressRelay = /*#__PURE__*/ createUseWriteContract({
    abi: dAppAddressRelayAbi,
    address: dAppAddressRelayAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link dAppAddressRelayAbi}__ and `functionName` set to `"relayDAppAddress"`
 */
export const useWriteDAppAddressRelayRelayDAppAddress =
    /*#__PURE__*/ createUseWriteContract({
        abi: dAppAddressRelayAbi,
        address: dAppAddressRelayAddress,
        functionName: 'relayDAppAddress',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dAppAddressRelayAbi}__
 */
export const useSimulateDAppAddressRelay =
    /*#__PURE__*/ createUseSimulateContract({
        abi: dAppAddressRelayAbi,
        address: dAppAddressRelayAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link dAppAddressRelayAbi}__ and `functionName` set to `"relayDAppAddress"`
 */
export const useSimulateDAppAddressRelayRelayDAppAddress =
    /*#__PURE__*/ createUseSimulateContract({
        abi: dAppAddressRelayAbi,
        address: dAppAddressRelayAddress,
        functionName: 'relayDAppAddress',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155BatchPortalAbi}__
 */
export const useReadErc1155BatchPortal = /*#__PURE__*/ createUseReadContract({
    abi: erc1155BatchPortalAbi,
    address: erc1155BatchPortalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155BatchPortalAbi}__ and `functionName` set to `"getInputBox"`
 */
export const useReadErc1155BatchPortalGetInputBox =
    /*#__PURE__*/ createUseReadContract({
        abi: erc1155BatchPortalAbi,
        address: erc1155BatchPortalAddress,
        functionName: 'getInputBox',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155BatchPortalAbi}__
 */
export const useWriteErc1155BatchPortal = /*#__PURE__*/ createUseWriteContract({
    abi: erc1155BatchPortalAbi,
    address: erc1155BatchPortalAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155BatchPortalAbi}__ and `functionName` set to `"depositBatchERC1155Token"`
 */
export const useWriteErc1155BatchPortalDepositBatchErc1155Token =
    /*#__PURE__*/ createUseWriteContract({
        abi: erc1155BatchPortalAbi,
        address: erc1155BatchPortalAddress,
        functionName: 'depositBatchERC1155Token',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155BatchPortalAbi}__
 */
export const useSimulateErc1155BatchPortal =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc1155BatchPortalAbi,
        address: erc1155BatchPortalAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155BatchPortalAbi}__ and `functionName` set to `"depositBatchERC1155Token"`
 */
export const useSimulateErc1155BatchPortalDepositBatchErc1155Token =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc1155BatchPortalAbi,
        address: erc1155BatchPortalAddress,
        functionName: 'depositBatchERC1155Token',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SinglePortalAbi}__
 */
export const useReadErc1155SinglePortal = /*#__PURE__*/ createUseReadContract({
    abi: erc1155SinglePortalAbi,
    address: erc1155SinglePortalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SinglePortalAbi}__ and `functionName` set to `"getInputBox"`
 */
export const useReadErc1155SinglePortalGetInputBox =
    /*#__PURE__*/ createUseReadContract({
        abi: erc1155SinglePortalAbi,
        address: erc1155SinglePortalAddress,
        functionName: 'getInputBox',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155SinglePortalAbi}__
 */
export const useWriteErc1155SinglePortal = /*#__PURE__*/ createUseWriteContract(
    { abi: erc1155SinglePortalAbi, address: erc1155SinglePortalAddress },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155SinglePortalAbi}__ and `functionName` set to `"depositSingleERC1155Token"`
 */
export const useWriteErc1155SinglePortalDepositSingleErc1155Token =
    /*#__PURE__*/ createUseWriteContract({
        abi: erc1155SinglePortalAbi,
        address: erc1155SinglePortalAddress,
        functionName: 'depositSingleERC1155Token',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155SinglePortalAbi}__
 */
export const useSimulateErc1155SinglePortal =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc1155SinglePortalAbi,
        address: erc1155SinglePortalAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155SinglePortalAbi}__ and `functionName` set to `"depositSingleERC1155Token"`
 */
export const useSimulateErc1155SinglePortalDepositSingleErc1155Token =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc1155SinglePortalAbi,
        address: erc1155SinglePortalAddress,
        functionName: 'depositSingleERC1155Token',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PortalAbi}__
 */
export const useReadErc20Portal = /*#__PURE__*/ createUseReadContract({
    abi: erc20PortalAbi,
    address: erc20PortalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20PortalAbi}__ and `functionName` set to `"getInputBox"`
 */
export const useReadErc20PortalGetInputBox =
    /*#__PURE__*/ createUseReadContract({
        abi: erc20PortalAbi,
        address: erc20PortalAddress,
        functionName: 'getInputBox',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PortalAbi}__
 */
export const useWriteErc20Portal = /*#__PURE__*/ createUseWriteContract({
    abi: erc20PortalAbi,
    address: erc20PortalAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20PortalAbi}__ and `functionName` set to `"depositERC20Tokens"`
 */
export const useWriteErc20PortalDepositErc20Tokens =
    /*#__PURE__*/ createUseWriteContract({
        abi: erc20PortalAbi,
        address: erc20PortalAddress,
        functionName: 'depositERC20Tokens',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PortalAbi}__
 */
export const useSimulateErc20Portal = /*#__PURE__*/ createUseSimulateContract({
    abi: erc20PortalAbi,
    address: erc20PortalAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20PortalAbi}__ and `functionName` set to `"depositERC20Tokens"`
 */
export const useSimulateErc20PortalDepositErc20Tokens =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc20PortalAbi,
        address: erc20PortalAddress,
        functionName: 'depositERC20Tokens',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721PortalAbi}__
 */
export const useReadErc721Portal = /*#__PURE__*/ createUseReadContract({
    abi: erc721PortalAbi,
    address: erc721PortalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc721PortalAbi}__ and `functionName` set to `"getInputBox"`
 */
export const useReadErc721PortalGetInputBox =
    /*#__PURE__*/ createUseReadContract({
        abi: erc721PortalAbi,
        address: erc721PortalAddress,
        functionName: 'getInputBox',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721PortalAbi}__
 */
export const useWriteErc721Portal = /*#__PURE__*/ createUseWriteContract({
    abi: erc721PortalAbi,
    address: erc721PortalAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc721PortalAbi}__ and `functionName` set to `"depositERC721Token"`
 */
export const useWriteErc721PortalDepositErc721Token =
    /*#__PURE__*/ createUseWriteContract({
        abi: erc721PortalAbi,
        address: erc721PortalAddress,
        functionName: 'depositERC721Token',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721PortalAbi}__
 */
export const useSimulateErc721Portal = /*#__PURE__*/ createUseSimulateContract({
    abi: erc721PortalAbi,
    address: erc721PortalAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc721PortalAbi}__ and `functionName` set to `"depositERC721Token"`
 */
export const useSimulateErc721PortalDepositErc721Token =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc721PortalAbi,
        address: erc721PortalAddress,
        functionName: 'depositERC721Token',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etherPortalAbi}__
 */
export const useReadEtherPortal = /*#__PURE__*/ createUseReadContract({
    abi: etherPortalAbi,
    address: etherPortalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etherPortalAbi}__ and `functionName` set to `"getInputBox"`
 */
export const useReadEtherPortalGetInputBox =
    /*#__PURE__*/ createUseReadContract({
        abi: etherPortalAbi,
        address: etherPortalAddress,
        functionName: 'getInputBox',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link etherPortalAbi}__
 */
export const useWriteEtherPortal = /*#__PURE__*/ createUseWriteContract({
    abi: etherPortalAbi,
    address: etherPortalAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link etherPortalAbi}__ and `functionName` set to `"depositEther"`
 */
export const useWriteEtherPortalDepositEther =
    /*#__PURE__*/ createUseWriteContract({
        abi: etherPortalAbi,
        address: etherPortalAddress,
        functionName: 'depositEther',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link etherPortalAbi}__
 */
export const useSimulateEtherPortal = /*#__PURE__*/ createUseSimulateContract({
    abi: etherPortalAbi,
    address: etherPortalAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link etherPortalAbi}__ and `functionName` set to `"depositEther"`
 */
export const useSimulateEtherPortalDepositEther =
    /*#__PURE__*/ createUseSimulateContract({
        abi: etherPortalAbi,
        address: etherPortalAddress,
        functionName: 'depositEther',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link historyFactoryAbi}__
 */
export const useReadHistoryFactory = /*#__PURE__*/ createUseReadContract({
    abi: historyFactoryAbi,
    address: historyFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link historyFactoryAbi}__ and `functionName` set to `"calculateHistoryAddress"`
 */
export const useReadHistoryFactoryCalculateHistoryAddress =
    /*#__PURE__*/ createUseReadContract({
        abi: historyFactoryAbi,
        address: historyFactoryAddress,
        functionName: 'calculateHistoryAddress',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link historyFactoryAbi}__
 */
export const useWriteHistoryFactory = /*#__PURE__*/ createUseWriteContract({
    abi: historyFactoryAbi,
    address: historyFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link historyFactoryAbi}__ and `functionName` set to `"newHistory"`
 */
export const useWriteHistoryFactoryNewHistory =
    /*#__PURE__*/ createUseWriteContract({
        abi: historyFactoryAbi,
        address: historyFactoryAddress,
        functionName: 'newHistory',
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link historyFactoryAbi}__
 */
export const useSimulateHistoryFactory =
    /*#__PURE__*/ createUseSimulateContract({
        abi: historyFactoryAbi,
        address: historyFactoryAddress,
    })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link historyFactoryAbi}__ and `functionName` set to `"newHistory"`
 */
export const useSimulateHistoryFactoryNewHistory =
    /*#__PURE__*/ createUseSimulateContract({
        abi: historyFactoryAbi,
        address: historyFactoryAddress,
        functionName: 'newHistory',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link historyFactoryAbi}__
 */
export const useWatchHistoryFactoryEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: historyFactoryAbi,
        address: historyFactoryAddress,
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link historyFactoryAbi}__ and `eventName` set to `"HistoryCreated"`
 */
export const useWatchHistoryFactoryHistoryCreatedEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: historyFactoryAbi,
        address: historyFactoryAddress,
        eventName: 'HistoryCreated',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inputBoxAbi}__
 */
export const useReadInputBox = /*#__PURE__*/ createUseReadContract({
    abi: inputBoxAbi,
    address: inputBoxAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inputBoxAbi}__ and `functionName` set to `"getInputHash"`
 */
export const useReadInputBoxGetInputHash = /*#__PURE__*/ createUseReadContract({
    abi: inputBoxAbi,
    address: inputBoxAddress,
    functionName: 'getInputHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inputBoxAbi}__ and `functionName` set to `"getNumberOfInputs"`
 */
export const useReadInputBoxGetNumberOfInputs =
    /*#__PURE__*/ createUseReadContract({
        abi: inputBoxAbi,
        address: inputBoxAddress,
        functionName: 'getNumberOfInputs',
    })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inputBoxAbi}__
 */
export const useWriteInputBox = /*#__PURE__*/ createUseWriteContract({
    abi: inputBoxAbi,
    address: inputBoxAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inputBoxAbi}__ and `functionName` set to `"addInput"`
 */
export const useWriteInputBoxAddInput = /*#__PURE__*/ createUseWriteContract({
    abi: inputBoxAbi,
    address: inputBoxAddress,
    functionName: 'addInput',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inputBoxAbi}__
 */
export const useSimulateInputBox = /*#__PURE__*/ createUseSimulateContract({
    abi: inputBoxAbi,
    address: inputBoxAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inputBoxAbi}__ and `functionName` set to `"addInput"`
 */
export const useSimulateInputBoxAddInput =
    /*#__PURE__*/ createUseSimulateContract({
        abi: inputBoxAbi,
        address: inputBoxAddress,
        functionName: 'addInput',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inputBoxAbi}__
 */
export const useWatchInputBoxEvent = /*#__PURE__*/ createUseWatchContractEvent({
    abi: inputBoxAbi,
    address: inputBoxAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inputBoxAbi}__ and `eventName` set to `"InputAdded"`
 */
export const useWatchInputBoxInputAddedEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: inputBoxAbi,
        address: inputBoxAddress,
        eventName: 'InputAdded',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleV2Abi}__
 */
export const useReadMerkleV2 = /*#__PURE__*/ createUseReadContract({
    abi: merkleV2Abi,
    address: merkleV2Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleV2Abi}__ and `functionName` set to `"calculateRootFromPowerOfTwo"`
 */
export const useReadMerkleV2CalculateRootFromPowerOfTwo =
    /*#__PURE__*/ createUseReadContract({
        abi: merkleV2Abi,
        address: merkleV2Address,
        functionName: 'calculateRootFromPowerOfTwo',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleV2Abi}__ and `functionName` set to `"getEmptyTreeHashAtIndex"`
 */
export const useReadMerkleV2GetEmptyTreeHashAtIndex =
    /*#__PURE__*/ createUseReadContract({
        abi: merkleV2Abi,
        address: merkleV2Address,
        functionName: 'getEmptyTreeHashAtIndex',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleV2Abi}__ and `functionName` set to `"getHashOfWordAtIndex"`
 */
export const useReadMerkleV2GetHashOfWordAtIndex =
    /*#__PURE__*/ createUseReadContract({
        abi: merkleV2Abi,
        address: merkleV2Address,
        functionName: 'getHashOfWordAtIndex',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleV2Abi}__ and `functionName` set to `"getMerkleRootFromBytes"`
 */
export const useReadMerkleV2GetMerkleRootFromBytes =
    /*#__PURE__*/ createUseReadContract({
        abi: merkleV2Abi,
        address: merkleV2Address,
        functionName: 'getMerkleRootFromBytes',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleV2Abi}__ and `functionName` set to `"getRootAfterReplacementInDrive"`
 */
export const useReadMerkleV2GetRootAfterReplacementInDrive =
    /*#__PURE__*/ createUseReadContract({
        abi: merkleV2Abi,
        address: merkleV2Address,
        functionName: 'getRootAfterReplacementInDrive',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link unrolledCordicAbi}__
 */
export const useReadUnrolledCordic = /*#__PURE__*/ createUseReadContract({
    abi: unrolledCordicAbi,
    address: unrolledCordicAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link unrolledCordicAbi}__ and `functionName` set to `"log2Times1e18"`
 */
export const useReadUnrolledCordicLog2Times1e18 =
    /*#__PURE__*/ createUseReadContract({
        abi: unrolledCordicAbi,
        address: unrolledCordicAddress,
        functionName: 'log2Times1e18',
    })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
    functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
    functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
    functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
    functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
    functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
    abi: erc20Abi,
    functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
    abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
    abi: erc20Abi,
    functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
    abi: erc20Abi,
    functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
    { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
    /*#__PURE__*/ createUseSimulateContract({
        abi: erc20Abi,
        functionName: 'transferFrom',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: erc20Abi,
        eventName: 'Approval',
    })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
    /*#__PURE__*/ createUseWatchContractEvent({
        abi: erc20Abi,
        eventName: 'Transfer',
    })
