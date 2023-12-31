import {
    useContractRead,
    UseContractReadConfig,
    useContractWrite,
    UseContractWriteConfig,
    usePrepareContractWrite,
    UsePrepareContractWriteConfig,
    useContractEvent,
    UseContractEventConfig,
} from 'wagmi'
import {
    ReadContractResult,
    WriteContractMode,
    PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuthorityFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const authorityFactoryABI = [
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
        stateMutability: 'view',
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
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'nonpayable',
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
    },
] as const

export const authorityFactoryAddress =
    '0xf26a5b278C25D8D41A136d22Ad719EACEd9c3e63' as const

export const authorityFactoryConfig = {
    address: authorityFactoryAddress,
    abi: authorityFactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuthorityHistoryPairFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const authorityHistoryPairFactoryABI = [
    {
        stateMutability: 'nonpayable',
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
        stateMutability: 'view',
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
    },
    {
        stateMutability: 'view',
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
    },
    {
        stateMutability: 'view',
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
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'nonpayable',
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
    },
] as const

export const authorityHistoryPairFactoryAddress =
    '0x3890A047Cf9Af60731E80B2105362BbDCD70142D' as const

export const authorityHistoryPairFactoryConfig = {
    address: authorityHistoryPairFactoryAddress,
    abi: authorityHistoryPairFactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bitmask
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bitmaskABI = [] as const

export const bitmaskAddress =
    '0xF5B2d8c81cDE4D6238bBf20D3D77DB37df13f735' as const

export const bitmaskConfig = {
    address: bitmaskAddress,
    abi: bitmaskABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CartesiDAppFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cartesiDAppFactoryABI = [
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
        stateMutability: 'view',
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
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'nonpayable',
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
    },
] as const

export const cartesiDAppFactoryAddress =
    '0x7122cd1221C20892234186facfE8615e6743Ab02' as const

export const cartesiDAppFactoryConfig = {
    address: cartesiDAppFactoryAddress,
    abi: cartesiDAppFactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CartesiMathV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cartesiMathV2ABI = [
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'clz',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'ctz',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'getLog2Floor',
        outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'getLog2TableTimes1M',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'isPowerOf2',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_num', internalType: 'uint256', type: 'uint256' }],
        name: 'log2ApproxTimes1M',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
] as const

export const cartesiMathV2Address =
    '0xB634F716BEd5Dd5A2b9a91C92474C499e50Cb27D' as const

export const cartesiMathV2Config = {
    address: cartesiMathV2Address,
    abi: cartesiMathV2ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DAppAddressRelay
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dAppAddressRelayABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [{ name: '_dapp', internalType: 'address', type: 'address' }],
        name: 'relayDAppAddress',
        outputs: [],
    },
] as const

export const dAppAddressRelayAddress =
    '0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE' as const

export const dAppAddressRelayConfig = {
    address: dAppAddressRelayAddress,
    abi: dAppAddressRelayABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155BatchPortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155BatchPortalABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
    },
] as const

export const erc1155BatchPortalAddress =
    '0xedB53860A6B52bbb7561Ad596416ee9965B055Aa' as const

export const erc1155BatchPortalConfig = {
    address: erc1155BatchPortalAddress,
    abi: erc1155BatchPortalABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155SinglePortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155SinglePortalABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
    },
] as const

export const erc1155SinglePortalAddress =
    '0x7CFB0193Ca87eB6e48056885E026552c3A941FC4' as const

export const erc1155SinglePortalConfig = {
    address: erc1155SinglePortalAddress,
    abi: erc1155SinglePortalABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
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
        stateMutability: 'view',
        type: 'function',
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ type: 'uint256' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ type: 'bool' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'decimals',
        outputs: [{ type: 'uint8' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ type: 'string' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ type: 'string' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ type: 'uint256' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ type: 'bool' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'sender', type: 'address' },
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ type: 'bool' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'addedValue', type: 'uint256' },
        ],
        name: 'increaseAllowance',
        outputs: [{ type: 'bool' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'subtractedValue', type: 'uint256' },
        ],
        name: 'decreaseAllowance',
        outputs: [{ type: 'bool' }],
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Portal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20PortalABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
    },
] as const

export const erc20PortalAddress =
    '0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB' as const

export const erc20PortalConfig = {
    address: erc20PortalAddress,
    abi: erc20PortalABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
    {
        type: 'event',
        inputs: [
            { name: 'owner', type: 'address', indexed: true },
            { name: 'spender', type: 'address', indexed: true },
            { name: 'tokenId', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        inputs: [
            { name: 'owner', type: 'address', indexed: true },
            { name: 'operator', type: 'address', indexed: true },
            { name: 'approved', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        inputs: [
            { name: 'from', type: 'address', indexed: true },
            { name: 'to', type: 'address', indexed: true },
            { name: 'tokenId', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ type: 'address' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ type: 'bool' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ type: 'string' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: 'owner', type: 'address' }],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'id', type: 'uint256' },
            { name: 'data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'operator', type: 'address' },
            { name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ type: 'string' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'index', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'index', type: 'uint256' },
        ],
        name: 'tokenByIndex',
        outputs: [{ name: 'tokenId', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ type: 'string' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ type: 'uint256' }],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            { name: 'sender', type: 'address' },
            { name: 'recipient', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Portal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721PortalABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
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
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
    },
] as const

export const erc721PortalAddress =
    '0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87' as const

export const erc721PortalConfig = {
    address: erc721PortalAddress,
    abi: erc721PortalABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EtherPortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const etherPortalABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_inputBox',
                internalType: 'contract IInputBox',
                type: 'address',
            },
        ],
    },
    { type: 'error', inputs: [], name: 'EtherTransferFailed' },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_execLayerData', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'depositEther',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'getInputBox',
        outputs: [
            { name: '', internalType: 'contract IInputBox', type: 'address' },
        ],
    },
] as const

export const etherPortalAddress =
    '0xFfdbe43d4c855BF7e0f105c400A50857f53AB044' as const

export const etherPortalConfig = {
    address: etherPortalAddress,
    abi: etherPortalABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HistoryFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const historyFactoryABI = [
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
        stateMutability: 'view',
        type: 'function',
        inputs: [
            { name: '_historyOwner', internalType: 'address', type: 'address' },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'calculateHistoryAddress',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: '_historyOwner', internalType: 'address', type: 'address' },
            { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
        ],
        name: 'newHistory',
        outputs: [
            { name: '', internalType: 'contract History', type: 'address' },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: '_historyOwner', internalType: 'address', type: 'address' },
        ],
        name: 'newHistory',
        outputs: [
            { name: '', internalType: 'contract History', type: 'address' },
        ],
    },
] as const

export const historyFactoryAddress =
    '0x1f158b5320BBf677FdA89F9a438df99BbE560A26' as const

export const historyFactoryConfig = {
    address: historyFactoryAddress,
    abi: historyFactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InputBox
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const inputBoxABI = [
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
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_input', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'addInput',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            { name: '_dapp', internalType: 'address', type: 'address' },
            { name: '_index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'getInputHash',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: '_dapp', internalType: 'address', type: 'address' }],
        name: 'getNumberOfInputs',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
] as const

export const inputBoxAddress =
    '0x59b22D57D4f067708AB0c00552767405926dc768' as const

export const inputBoxConfig = {
    address: inputBoxAddress,
    abi: inputBoxABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MerkleV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const merkleV2ABI = [
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [
            { name: 'hashes', internalType: 'bytes32[]', type: 'bytes32[]' },
        ],
        name: 'calculateRootFromPowerOfTwo',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
        name: 'getEmptyTreeHashAtIndex',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [
            { name: '_data', internalType: 'bytes', type: 'bytes' },
            { name: '_wordIndex', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'getHashOfWordAtIndex',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [
            { name: '_data', internalType: 'bytes', type: 'bytes' },
            { name: '_log2Size', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'getMerkleRootFromBytes',
        outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    },
    {
        stateMutability: 'pure',
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
    },
] as const

export const merkleV2Address =
    '0x33436035441927Df1a73FE3AAC5906854632e53d' as const

export const merkleV2Config = {
    address: merkleV2Address,
    abi: merkleV2ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UnrolledCordic
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const unrolledCordicABI = [
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [{ name: 'val', internalType: 'uint256', type: 'uint256' }],
        name: 'log2Times1e18',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
] as const

export const unrolledCordicAddress =
    '0x3F8FdcD1B0F421D817BF58C96b7C91B98100B450' as const

export const unrolledCordicConfig = {
    address: unrolledCordicAddress,
    abi: unrolledCordicABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link authorityFactoryABI}__.
 */
export function useAuthorityFactoryRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof authorityFactoryABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof authorityFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        ...config,
    } as UseContractReadConfig<
        typeof authorityFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link authorityFactoryABI}__ and `functionName` set to `"calculateAuthorityAddress"`.
 */
export function useAuthorityFactoryCalculateAuthorityAddress<
    TFunctionName extends 'calculateAuthorityAddress',
    TSelectData = ReadContractResult<typeof authorityFactoryABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof authorityFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        functionName: 'calculateAuthorityAddress',
        ...config,
    } as UseContractReadConfig<
        typeof authorityFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link authorityFactoryABI}__.
 */
export function useAuthorityFactoryWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof authorityFactoryABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof authorityFactoryABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof authorityFactoryABI, TFunctionName, TMode>({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link authorityFactoryABI}__ and `functionName` set to `"newAuthority"`.
 */
export function useAuthorityFactoryNewAuthority<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof authorityFactoryABI,
                  'newAuthority'
              >['request']['abi'],
              'newAuthority',
              TMode
          > & { functionName?: 'newAuthority' }
        : UseContractWriteConfig<
              typeof authorityFactoryABI,
              'newAuthority',
              TMode
          > & {
              abi?: never
              functionName?: 'newAuthority'
          } = {} as any,
) {
    return useContractWrite<typeof authorityFactoryABI, 'newAuthority', TMode>({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        functionName: 'newAuthority',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link authorityFactoryABI}__.
 */
export function usePrepareAuthorityFactoryWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof authorityFactoryABI,
            TFunctionName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof authorityFactoryABI,
        TFunctionName
    >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link authorityFactoryABI}__ and `functionName` set to `"newAuthority"`.
 */
export function usePrepareAuthorityFactoryNewAuthority(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof authorityFactoryABI,
            'newAuthority'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        functionName: 'newAuthority',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof authorityFactoryABI,
        'newAuthority'
    >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link authorityFactoryABI}__.
 */
export function useAuthorityFactoryEvent<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<typeof authorityFactoryABI, TEventName>,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractEvent({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        ...config,
    } as UseContractEventConfig<typeof authorityFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link authorityFactoryABI}__ and `eventName` set to `"AuthorityCreated"`.
 */
export function useAuthorityFactoryAuthorityCreatedEvent(
    config: Omit<
        UseContractEventConfig<typeof authorityFactoryABI, 'AuthorityCreated'>,
        'abi' | 'address' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: authorityFactoryABI,
        address: authorityFactoryAddress,
        eventName: 'AuthorityCreated',
        ...config,
    } as UseContractEventConfig<typeof authorityFactoryABI, 'AuthorityCreated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__.
 */
export function useAuthorityHistoryPairFactoryRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof authorityHistoryPairFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        ...config,
    } as UseContractReadConfig<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__ and `functionName` set to `"calculateAuthorityHistoryAddressPair"`.
 */
export function useAuthorityHistoryPairFactoryCalculateAuthorityHistoryAddressPair<
    TFunctionName extends 'calculateAuthorityHistoryAddressPair',
    TSelectData = ReadContractResult<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof authorityHistoryPairFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'calculateAuthorityHistoryAddressPair',
        ...config,
    } as UseContractReadConfig<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__ and `functionName` set to `"getAuthorityFactory"`.
 */
export function useAuthorityHistoryPairFactoryGetAuthorityFactory<
    TFunctionName extends 'getAuthorityFactory',
    TSelectData = ReadContractResult<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof authorityHistoryPairFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'getAuthorityFactory',
        ...config,
    } as UseContractReadConfig<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__ and `functionName` set to `"getHistoryFactory"`.
 */
export function useAuthorityHistoryPairFactoryGetHistoryFactory<
    TFunctionName extends 'getHistoryFactory',
    TSelectData = ReadContractResult<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof authorityHistoryPairFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'getHistoryFactory',
        ...config,
    } as UseContractReadConfig<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__.
 */
export function useAuthorityHistoryPairFactoryWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof authorityHistoryPairFactoryABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof authorityHistoryPairFactoryABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName,
        TMode
    >({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__ and `functionName` set to `"newAuthorityHistoryPair"`.
 */
export function useAuthorityHistoryPairFactoryNewAuthorityHistoryPair<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof authorityHistoryPairFactoryABI,
                  'newAuthorityHistoryPair'
              >['request']['abi'],
              'newAuthorityHistoryPair',
              TMode
          > & { functionName?: 'newAuthorityHistoryPair' }
        : UseContractWriteConfig<
              typeof authorityHistoryPairFactoryABI,
              'newAuthorityHistoryPair',
              TMode
          > & {
              abi?: never
              functionName?: 'newAuthorityHistoryPair'
          } = {} as any,
) {
    return useContractWrite<
        typeof authorityHistoryPairFactoryABI,
        'newAuthorityHistoryPair',
        TMode
    >({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'newAuthorityHistoryPair',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__.
 */
export function usePrepareAuthorityHistoryPairFactoryWrite<
    TFunctionName extends string,
>(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof authorityHistoryPairFactoryABI,
            TFunctionName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof authorityHistoryPairFactoryABI,
        TFunctionName
    >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__ and `functionName` set to `"newAuthorityHistoryPair"`.
 */
export function usePrepareAuthorityHistoryPairFactoryNewAuthorityHistoryPair(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof authorityHistoryPairFactoryABI,
            'newAuthorityHistoryPair'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        functionName: 'newAuthorityHistoryPair',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof authorityHistoryPairFactoryABI,
        'newAuthorityHistoryPair'
    >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__.
 */
export function useAuthorityHistoryPairFactoryEvent<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<
            typeof authorityHistoryPairFactoryABI,
            TEventName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractEvent({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        ...config,
    } as UseContractEventConfig<
        typeof authorityHistoryPairFactoryABI,
        TEventName
    >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link authorityHistoryPairFactoryABI}__ and `eventName` set to `"AuthorityHistoryPairFactoryCreated"`.
 */
export function useAuthorityHistoryPairFactoryAuthorityHistoryPairFactoryCreatedEvent(
    config: Omit<
        UseContractEventConfig<
            typeof authorityHistoryPairFactoryABI,
            'AuthorityHistoryPairFactoryCreated'
        >,
        'abi' | 'address' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: authorityHistoryPairFactoryABI,
        address: authorityHistoryPairFactoryAddress,
        eventName: 'AuthorityHistoryPairFactoryCreated',
        ...config,
    } as UseContractEventConfig<
        typeof authorityHistoryPairFactoryABI,
        'AuthorityHistoryPairFactoryCreated'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiDAppFactoryABI}__.
 */
export function useCartesiDAppFactoryRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<
        typeof cartesiDAppFactoryABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiDAppFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        ...config,
    } as UseContractReadConfig<
        typeof cartesiDAppFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiDAppFactoryABI}__ and `functionName` set to `"calculateApplicationAddress"`.
 */
export function useCartesiDAppFactoryCalculateApplicationAddress<
    TFunctionName extends 'calculateApplicationAddress',
    TSelectData = ReadContractResult<
        typeof cartesiDAppFactoryABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiDAppFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        functionName: 'calculateApplicationAddress',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiDAppFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cartesiDAppFactoryABI}__.
 */
export function useCartesiDAppFactoryWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof cartesiDAppFactoryABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof cartesiDAppFactoryABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof cartesiDAppFactoryABI, TFunctionName, TMode>(
        {
            abi: cartesiDAppFactoryABI,
            address: cartesiDAppFactoryAddress,
            ...config,
        } as any,
    )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link cartesiDAppFactoryABI}__ and `functionName` set to `"newApplication"`.
 */
export function useCartesiDAppFactoryNewApplication<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof cartesiDAppFactoryABI,
                  'newApplication'
              >['request']['abi'],
              'newApplication',
              TMode
          > & { functionName?: 'newApplication' }
        : UseContractWriteConfig<
              typeof cartesiDAppFactoryABI,
              'newApplication',
              TMode
          > & {
              abi?: never
              functionName?: 'newApplication'
          } = {} as any,
) {
    return useContractWrite<
        typeof cartesiDAppFactoryABI,
        'newApplication',
        TMode
    >({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        functionName: 'newApplication',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cartesiDAppFactoryABI}__.
 */
export function usePrepareCartesiDAppFactoryWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof cartesiDAppFactoryABI,
            TFunctionName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof cartesiDAppFactoryABI,
        TFunctionName
    >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link cartesiDAppFactoryABI}__ and `functionName` set to `"newApplication"`.
 */
export function usePrepareCartesiDAppFactoryNewApplication(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof cartesiDAppFactoryABI,
            'newApplication'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        functionName: 'newApplication',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof cartesiDAppFactoryABI,
        'newApplication'
    >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cartesiDAppFactoryABI}__.
 */
export function useCartesiDAppFactoryEvent<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<typeof cartesiDAppFactoryABI, TEventName>,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractEvent({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        ...config,
    } as UseContractEventConfig<typeof cartesiDAppFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link cartesiDAppFactoryABI}__ and `eventName` set to `"ApplicationCreated"`.
 */
export function useCartesiDAppFactoryApplicationCreatedEvent(
    config: Omit<
        UseContractEventConfig<
            typeof cartesiDAppFactoryABI,
            'ApplicationCreated'
        >,
        'abi' | 'address' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: cartesiDAppFactoryABI,
        address: cartesiDAppFactoryAddress,
        eventName: 'ApplicationCreated',
        ...config,
    } as UseContractEventConfig<
        typeof cartesiDAppFactoryABI,
        'ApplicationCreated'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__.
 */
export function useCartesiMathV2Read<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__ and `functionName` set to `"clz"`.
 */
export function useCartesiMathV2Clz<
    TFunctionName extends 'clz',
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        functionName: 'clz',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__ and `functionName` set to `"ctz"`.
 */
export function useCartesiMathV2Ctz<
    TFunctionName extends 'ctz',
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        functionName: 'ctz',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__ and `functionName` set to `"getLog2Floor"`.
 */
export function useCartesiMathV2GetLog2Floor<
    TFunctionName extends 'getLog2Floor',
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        functionName: 'getLog2Floor',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__ and `functionName` set to `"getLog2TableTimes1M"`.
 */
export function useCartesiMathV2GetLog2TableTimes1M<
    TFunctionName extends 'getLog2TableTimes1M',
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        functionName: 'getLog2TableTimes1M',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__ and `functionName` set to `"isPowerOf2"`.
 */
export function useCartesiMathV2IsPowerOf2<
    TFunctionName extends 'isPowerOf2',
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        functionName: 'isPowerOf2',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link cartesiMathV2ABI}__ and `functionName` set to `"log2ApproxTimes1M"`.
 */
export function useCartesiMathV2Log2ApproxTimes1M<
    TFunctionName extends 'log2ApproxTimes1M',
    TSelectData = ReadContractResult<typeof cartesiMathV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof cartesiMathV2ABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: cartesiMathV2ABI,
        address: cartesiMathV2Address,
        functionName: 'log2ApproxTimes1M',
        ...config,
    } as UseContractReadConfig<
        typeof cartesiMathV2ABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dAppAddressRelayABI}__.
 */
export function useDAppAddressRelayRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof dAppAddressRelayABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof dAppAddressRelayABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: dAppAddressRelayABI,
        address: dAppAddressRelayAddress,
        ...config,
    } as UseContractReadConfig<
        typeof dAppAddressRelayABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dAppAddressRelayABI}__ and `functionName` set to `"getInputBox"`.
 */
export function useDAppAddressRelayGetInputBox<
    TFunctionName extends 'getInputBox',
    TSelectData = ReadContractResult<typeof dAppAddressRelayABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof dAppAddressRelayABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: dAppAddressRelayABI,
        address: dAppAddressRelayAddress,
        functionName: 'getInputBox',
        ...config,
    } as UseContractReadConfig<
        typeof dAppAddressRelayABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dAppAddressRelayABI}__.
 */
export function useDAppAddressRelayWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof dAppAddressRelayABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof dAppAddressRelayABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof dAppAddressRelayABI, TFunctionName, TMode>({
        abi: dAppAddressRelayABI,
        address: dAppAddressRelayAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link dAppAddressRelayABI}__ and `functionName` set to `"relayDAppAddress"`.
 */
export function useDAppAddressRelayRelayDAppAddress<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof dAppAddressRelayABI,
                  'relayDAppAddress'
              >['request']['abi'],
              'relayDAppAddress',
              TMode
          > & { functionName?: 'relayDAppAddress' }
        : UseContractWriteConfig<
              typeof dAppAddressRelayABI,
              'relayDAppAddress',
              TMode
          > & {
              abi?: never
              functionName?: 'relayDAppAddress'
          } = {} as any,
) {
    return useContractWrite<
        typeof dAppAddressRelayABI,
        'relayDAppAddress',
        TMode
    >({
        abi: dAppAddressRelayABI,
        address: dAppAddressRelayAddress,
        functionName: 'relayDAppAddress',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dAppAddressRelayABI}__.
 */
export function usePrepareDAppAddressRelayWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof dAppAddressRelayABI,
            TFunctionName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: dAppAddressRelayABI,
        address: dAppAddressRelayAddress,
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof dAppAddressRelayABI,
        TFunctionName
    >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link dAppAddressRelayABI}__ and `functionName` set to `"relayDAppAddress"`.
 */
export function usePrepareDAppAddressRelayRelayDAppAddress(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof dAppAddressRelayABI,
            'relayDAppAddress'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: dAppAddressRelayABI,
        address: dAppAddressRelayAddress,
        functionName: 'relayDAppAddress',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof dAppAddressRelayABI,
        'relayDAppAddress'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155BatchPortalABI}__.
 */
export function useErc1155BatchPortalRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<
        typeof erc1155BatchPortalABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc1155BatchPortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: erc1155BatchPortalABI,
        address: erc1155BatchPortalAddress,
        ...config,
    } as UseContractReadConfig<
        typeof erc1155BatchPortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155BatchPortalABI}__ and `functionName` set to `"getInputBox"`.
 */
export function useErc1155BatchPortalGetInputBox<
    TFunctionName extends 'getInputBox',
    TSelectData = ReadContractResult<
        typeof erc1155BatchPortalABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc1155BatchPortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc1155BatchPortalABI,
        address: erc1155BatchPortalAddress,
        functionName: 'getInputBox',
        ...config,
    } as UseContractReadConfig<
        typeof erc1155BatchPortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155BatchPortalABI}__.
 */
export function useErc1155BatchPortalWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc1155BatchPortalABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof erc1155BatchPortalABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof erc1155BatchPortalABI, TFunctionName, TMode>(
        {
            abi: erc1155BatchPortalABI,
            address: erc1155BatchPortalAddress,
            ...config,
        } as any,
    )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155BatchPortalABI}__ and `functionName` set to `"depositBatchERC1155Token"`.
 */
export function useErc1155BatchPortalDepositBatchErc1155Token<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc1155BatchPortalABI,
                  'depositBatchERC1155Token'
              >['request']['abi'],
              'depositBatchERC1155Token',
              TMode
          > & { functionName?: 'depositBatchERC1155Token' }
        : UseContractWriteConfig<
              typeof erc1155BatchPortalABI,
              'depositBatchERC1155Token',
              TMode
          > & {
              abi?: never
              functionName?: 'depositBatchERC1155Token'
          } = {} as any,
) {
    return useContractWrite<
        typeof erc1155BatchPortalABI,
        'depositBatchERC1155Token',
        TMode
    >({
        abi: erc1155BatchPortalABI,
        address: erc1155BatchPortalAddress,
        functionName: 'depositBatchERC1155Token',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155BatchPortalABI}__.
 */
export function usePrepareErc1155BatchPortalWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof erc1155BatchPortalABI,
            TFunctionName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc1155BatchPortalABI,
        address: erc1155BatchPortalAddress,
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof erc1155BatchPortalABI,
        TFunctionName
    >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155BatchPortalABI}__ and `functionName` set to `"depositBatchERC1155Token"`.
 */
export function usePrepareErc1155BatchPortalDepositBatchErc1155Token(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof erc1155BatchPortalABI,
            'depositBatchERC1155Token'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc1155BatchPortalABI,
        address: erc1155BatchPortalAddress,
        functionName: 'depositBatchERC1155Token',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof erc1155BatchPortalABI,
        'depositBatchERC1155Token'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155SinglePortalABI}__.
 */
export function useErc1155SinglePortalRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<
        typeof erc1155SinglePortalABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc1155SinglePortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: erc1155SinglePortalABI,
        address: erc1155SinglePortalAddress,
        ...config,
    } as UseContractReadConfig<
        typeof erc1155SinglePortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155SinglePortalABI}__ and `functionName` set to `"getInputBox"`.
 */
export function useErc1155SinglePortalGetInputBox<
    TFunctionName extends 'getInputBox',
    TSelectData = ReadContractResult<
        typeof erc1155SinglePortalABI,
        TFunctionName
    >,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc1155SinglePortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc1155SinglePortalABI,
        address: erc1155SinglePortalAddress,
        functionName: 'getInputBox',
        ...config,
    } as UseContractReadConfig<
        typeof erc1155SinglePortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155SinglePortalABI}__.
 */
export function useErc1155SinglePortalWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc1155SinglePortalABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof erc1155SinglePortalABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<
        typeof erc1155SinglePortalABI,
        TFunctionName,
        TMode
    >({
        abi: erc1155SinglePortalABI,
        address: erc1155SinglePortalAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155SinglePortalABI}__ and `functionName` set to `"depositSingleERC1155Token"`.
 */
export function useErc1155SinglePortalDepositSingleErc1155Token<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc1155SinglePortalABI,
                  'depositSingleERC1155Token'
              >['request']['abi'],
              'depositSingleERC1155Token',
              TMode
          > & { functionName?: 'depositSingleERC1155Token' }
        : UseContractWriteConfig<
              typeof erc1155SinglePortalABI,
              'depositSingleERC1155Token',
              TMode
          > & {
              abi?: never
              functionName?: 'depositSingleERC1155Token'
          } = {} as any,
) {
    return useContractWrite<
        typeof erc1155SinglePortalABI,
        'depositSingleERC1155Token',
        TMode
    >({
        abi: erc1155SinglePortalABI,
        address: erc1155SinglePortalAddress,
        functionName: 'depositSingleERC1155Token',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155SinglePortalABI}__.
 */
export function usePrepareErc1155SinglePortalWrite<
    TFunctionName extends string,
>(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof erc1155SinglePortalABI,
            TFunctionName
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc1155SinglePortalABI,
        address: erc1155SinglePortalAddress,
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof erc1155SinglePortalABI,
        TFunctionName
    >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155SinglePortalABI}__ and `functionName` set to `"depositSingleERC1155Token"`.
 */
export function usePrepareErc1155SinglePortalDepositSingleErc1155Token(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof erc1155SinglePortalABI,
            'depositSingleERC1155Token'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc1155SinglePortalABI,
        address: erc1155SinglePortalAddress,
        functionName: 'depositSingleERC1155Token',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof erc1155SinglePortalABI,
        'depositSingleERC1155Token'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
    TFunctionName extends 'allowance',
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        functionName: 'allowance',
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
    TFunctionName extends 'balanceOf',
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        functionName: 'balanceOf',
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
    TFunctionName extends 'decimals',
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        functionName: 'decimals',
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
    TFunctionName extends 'name',
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        functionName: 'name',
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
    TFunctionName extends 'symbol',
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        functionName: 'symbol',
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
    TFunctionName extends 'totalSupply',
    TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20ABI,
        functionName: 'totalSupply',
        ...config,
    } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20ABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
        abi: erc20ABI,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20ABI,
                  'approve'
              >['request']['abi'],
              'approve',
              TMode
          > & { functionName?: 'approve' }
        : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
              abi?: never
              functionName?: 'approve'
          } = {} as any,
) {
    return useContractWrite<typeof erc20ABI, 'approve', TMode>({
        abi: erc20ABI,
        functionName: 'approve',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20ABI,
                  'transfer'
              >['request']['abi'],
              'transfer',
              TMode
          > & { functionName?: 'transfer' }
        : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
              abi?: never
              functionName?: 'transfer'
          } = {} as any,
) {
    return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
        abi: erc20ABI,
        functionName: 'transfer',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20ABI,
                  'transferFrom'
              >['request']['abi'],
              'transferFrom',
              TMode
          > & { functionName?: 'transferFrom' }
        : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
              abi?: never
              functionName?: 'transferFrom'
          } = {} as any,
) {
    return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
        abi: erc20ABI,
        functionName: 'transferFrom',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useErc20IncreaseAllowance<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20ABI,
                  'increaseAllowance'
              >['request']['abi'],
              'increaseAllowance',
              TMode
          > & { functionName?: 'increaseAllowance' }
        : UseContractWriteConfig<
              typeof erc20ABI,
              'increaseAllowance',
              TMode
          > & {
              abi?: never
              functionName?: 'increaseAllowance'
          } = {} as any,
) {
    return useContractWrite<typeof erc20ABI, 'increaseAllowance', TMode>({
        abi: erc20ABI,
        functionName: 'increaseAllowance',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useErc20DecreaseAllowance<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20ABI,
                  'decreaseAllowance'
              >['request']['abi'],
              'decreaseAllowance',
              TMode
          > & { functionName?: 'decreaseAllowance' }
        : UseContractWriteConfig<
              typeof erc20ABI,
              'decreaseAllowance',
              TMode
          > & {
              abi?: never
              functionName?: 'decreaseAllowance'
          } = {} as any,
) {
    return useContractWrite<typeof erc20ABI, 'decreaseAllowance', TMode>({
        abi: erc20ABI,
        functionName: 'decreaseAllowance',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
        'abi'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20ABI,
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20ABI,
        functionName: 'approve',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20ABI,
        functionName: 'transfer',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20ABI,
        functionName: 'transferFrom',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareErc20IncreaseAllowance(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20ABI,
        functionName: 'increaseAllowance',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareErc20DecreaseAllowance(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20ABI,
        functionName: 'decreaseAllowance',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<typeof erc20ABI, TEventName>,
        'abi'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc20ABI,
        ...config,
    } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
    config: Omit<
        UseContractEventConfig<typeof erc20ABI, 'Approval'>,
        'abi' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc20ABI,
        eventName: 'Approval',
        ...config,
    } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
    config: Omit<
        UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
        'abi' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc20ABI,
        eventName: 'Transfer',
        ...config,
    } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20PortalABI}__.
 */
export function useErc20PortalRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof erc20PortalABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc20PortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20PortalABI,
        address: erc20PortalAddress,
        ...config,
    } as UseContractReadConfig<
        typeof erc20PortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20PortalABI}__ and `functionName` set to `"getInputBox"`.
 */
export function useErc20PortalGetInputBox<
    TFunctionName extends 'getInputBox',
    TSelectData = ReadContractResult<typeof erc20PortalABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc20PortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc20PortalABI,
        address: erc20PortalAddress,
        functionName: 'getInputBox',
        ...config,
    } as UseContractReadConfig<
        typeof erc20PortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20PortalABI}__.
 */
export function useErc20PortalWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20PortalABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof erc20PortalABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof erc20PortalABI, TFunctionName, TMode>({
        abi: erc20PortalABI,
        address: erc20PortalAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20PortalABI}__ and `functionName` set to `"depositERC20Tokens"`.
 */
export function useErc20PortalDepositErc20Tokens<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc20PortalABI,
                  'depositERC20Tokens'
              >['request']['abi'],
              'depositERC20Tokens',
              TMode
          > & { functionName?: 'depositERC20Tokens' }
        : UseContractWriteConfig<
              typeof erc20PortalABI,
              'depositERC20Tokens',
              TMode
          > & {
              abi?: never
              functionName?: 'depositERC20Tokens'
          } = {} as any,
) {
    return useContractWrite<typeof erc20PortalABI, 'depositERC20Tokens', TMode>(
        {
            abi: erc20PortalABI,
            address: erc20PortalAddress,
            functionName: 'depositERC20Tokens',
            ...config,
        } as any,
    )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20PortalABI}__.
 */
export function usePrepareErc20PortalWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc20PortalABI, TFunctionName>,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20PortalABI,
        address: erc20PortalAddress,
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc20PortalABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20PortalABI}__ and `functionName` set to `"depositERC20Tokens"`.
 */
export function usePrepareErc20PortalDepositErc20Tokens(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof erc20PortalABI,
            'depositERC20Tokens'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc20PortalABI,
        address: erc20PortalAddress,
        functionName: 'depositERC20Tokens',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof erc20PortalABI,
        'depositERC20Tokens'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
    TFunctionName extends 'balanceOf',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'balanceOf',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
    TFunctionName extends 'getApproved',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'getApproved',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
    TFunctionName extends 'isApprovedForAll',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'isApprovedForAll',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
    TFunctionName extends 'name',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'name',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
    TFunctionName extends 'ownerOf',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'ownerOf',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
    TFunctionName extends 'symbol',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'symbol',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721TokenByIndex<
    TFunctionName extends 'tokenByIndex',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'tokenByIndex',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
    TFunctionName extends 'tokenURI',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'tokenURI',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721TotalSupply<
    TFunctionName extends 'totalSupply',
    TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721ABI,
        functionName: 'totalSupply',
        ...config,
    } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721ABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
        abi: erc721ABI,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721ABI,
                  'approve'
              >['request']['abi'],
              'approve',
              TMode
          > & { functionName?: 'approve' }
        : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
              abi?: never
              functionName?: 'approve'
          } = {} as any,
) {
    return useContractWrite<typeof erc721ABI, 'approve', TMode>({
        abi: erc721ABI,
        functionName: 'approve',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721ABI,
                  'safeTransferFrom'
              >['request']['abi'],
              'safeTransferFrom',
              TMode
          > & { functionName?: 'safeTransferFrom' }
        : UseContractWriteConfig<
              typeof erc721ABI,
              'safeTransferFrom',
              TMode
          > & {
              abi?: never
              functionName?: 'safeTransferFrom'
          } = {} as any,
) {
    return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
        abi: erc721ABI,
        functionName: 'safeTransferFrom',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721ABI,
                  'setApprovalForAll'
              >['request']['abi'],
              'setApprovalForAll',
              TMode
          > & { functionName?: 'setApprovalForAll' }
        : UseContractWriteConfig<
              typeof erc721ABI,
              'setApprovalForAll',
              TMode
          > & {
              abi?: never
              functionName?: 'setApprovalForAll'
          } = {} as any,
) {
    return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
        abi: erc721ABI,
        functionName: 'setApprovalForAll',
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721ABI,
                  'transferFrom'
              >['request']['abi'],
              'transferFrom',
              TMode
          > & { functionName?: 'transferFrom' }
        : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
              abi?: never
              functionName?: 'transferFrom'
          } = {} as any,
) {
    return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
        abi: erc721ABI,
        functionName: 'transferFrom',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
        'abi'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721ABI,
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721ABI,
        functionName: 'approve',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721ABI,
        functionName: 'safeTransferFrom',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721ABI,
        functionName: 'setApprovalForAll',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
        'abi' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721ABI,
        functionName: 'transferFrom',
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<typeof erc721ABI, TEventName>,
        'abi'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc721ABI,
        ...config,
    } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
    config: Omit<
        UseContractEventConfig<typeof erc721ABI, 'Approval'>,
        'abi' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc721ABI,
        eventName: 'Approval',
        ...config,
    } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
    config: Omit<
        UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
        'abi' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc721ABI,
        eventName: 'ApprovalForAll',
        ...config,
    } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
    config: Omit<
        UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
        'abi' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: erc721ABI,
        eventName: 'Transfer',
        ...config,
    } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721PortalABI}__.
 */
export function useErc721PortalRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof erc721PortalABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc721PortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721PortalABI,
        address: erc721PortalAddress,
        ...config,
    } as UseContractReadConfig<
        typeof erc721PortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721PortalABI}__ and `functionName` set to `"getInputBox"`.
 */
export function useErc721PortalGetInputBox<
    TFunctionName extends 'getInputBox',
    TSelectData = ReadContractResult<typeof erc721PortalABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof erc721PortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: erc721PortalABI,
        address: erc721PortalAddress,
        functionName: 'getInputBox',
        ...config,
    } as UseContractReadConfig<
        typeof erc721PortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721PortalABI}__.
 */
export function useErc721PortalWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721PortalABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof erc721PortalABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof erc721PortalABI, TFunctionName, TMode>({
        abi: erc721PortalABI,
        address: erc721PortalAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721PortalABI}__ and `functionName` set to `"depositERC721Token"`.
 */
export function useErc721PortalDepositErc721Token<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof erc721PortalABI,
                  'depositERC721Token'
              >['request']['abi'],
              'depositERC721Token',
              TMode
          > & { functionName?: 'depositERC721Token' }
        : UseContractWriteConfig<
              typeof erc721PortalABI,
              'depositERC721Token',
              TMode
          > & {
              abi?: never
              functionName?: 'depositERC721Token'
          } = {} as any,
) {
    return useContractWrite<
        typeof erc721PortalABI,
        'depositERC721Token',
        TMode
    >({
        abi: erc721PortalABI,
        address: erc721PortalAddress,
        functionName: 'depositERC721Token',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721PortalABI}__.
 */
export function usePrepareErc721PortalWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof erc721PortalABI, TFunctionName>,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721PortalABI,
        address: erc721PortalAddress,
        ...config,
    } as UsePrepareContractWriteConfig<typeof erc721PortalABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721PortalABI}__ and `functionName` set to `"depositERC721Token"`.
 */
export function usePrepareErc721PortalDepositErc721Token(
    config: Omit<
        UsePrepareContractWriteConfig<
            typeof erc721PortalABI,
            'depositERC721Token'
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: erc721PortalABI,
        address: erc721PortalAddress,
        functionName: 'depositERC721Token',
        ...config,
    } as UsePrepareContractWriteConfig<
        typeof erc721PortalABI,
        'depositERC721Token'
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link etherPortalABI}__.
 */
export function useEtherPortalRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof etherPortalABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof etherPortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: etherPortalABI,
        address: etherPortalAddress,
        ...config,
    } as UseContractReadConfig<
        typeof etherPortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link etherPortalABI}__ and `functionName` set to `"getInputBox"`.
 */
export function useEtherPortalGetInputBox<
    TFunctionName extends 'getInputBox',
    TSelectData = ReadContractResult<typeof etherPortalABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof etherPortalABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: etherPortalABI,
        address: etherPortalAddress,
        functionName: 'getInputBox',
        ...config,
    } as UseContractReadConfig<
        typeof etherPortalABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link etherPortalABI}__.
 */
export function useEtherPortalWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof etherPortalABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof etherPortalABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof etherPortalABI, TFunctionName, TMode>({
        abi: etherPortalABI,
        address: etherPortalAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link etherPortalABI}__ and `functionName` set to `"depositEther"`.
 */
export function useEtherPortalDepositEther<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof etherPortalABI,
                  'depositEther'
              >['request']['abi'],
              'depositEther',
              TMode
          > & { functionName?: 'depositEther' }
        : UseContractWriteConfig<
              typeof etherPortalABI,
              'depositEther',
              TMode
          > & {
              abi?: never
              functionName?: 'depositEther'
          } = {} as any,
) {
    return useContractWrite<typeof etherPortalABI, 'depositEther', TMode>({
        abi: etherPortalABI,
        address: etherPortalAddress,
        functionName: 'depositEther',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link etherPortalABI}__.
 */
export function usePrepareEtherPortalWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof etherPortalABI, TFunctionName>,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: etherPortalABI,
        address: etherPortalAddress,
        ...config,
    } as UsePrepareContractWriteConfig<typeof etherPortalABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link etherPortalABI}__ and `functionName` set to `"depositEther"`.
 */
export function usePrepareEtherPortalDepositEther(
    config: Omit<
        UsePrepareContractWriteConfig<typeof etherPortalABI, 'depositEther'>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: etherPortalABI,
        address: etherPortalAddress,
        functionName: 'depositEther',
        ...config,
    } as UsePrepareContractWriteConfig<typeof etherPortalABI, 'depositEther'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link historyFactoryABI}__.
 */
export function useHistoryFactoryRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof historyFactoryABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof historyFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        ...config,
    } as UseContractReadConfig<
        typeof historyFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link historyFactoryABI}__ and `functionName` set to `"calculateHistoryAddress"`.
 */
export function useHistoryFactoryCalculateHistoryAddress<
    TFunctionName extends 'calculateHistoryAddress',
    TSelectData = ReadContractResult<typeof historyFactoryABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof historyFactoryABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        functionName: 'calculateHistoryAddress',
        ...config,
    } as UseContractReadConfig<
        typeof historyFactoryABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link historyFactoryABI}__.
 */
export function useHistoryFactoryWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof historyFactoryABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<
              typeof historyFactoryABI,
              TFunctionName,
              TMode
          > & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof historyFactoryABI, TFunctionName, TMode>({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link historyFactoryABI}__ and `functionName` set to `"newHistory"`.
 */
export function useHistoryFactoryNewHistory<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof historyFactoryABI,
                  'newHistory'
              >['request']['abi'],
              'newHistory',
              TMode
          > & { functionName?: 'newHistory' }
        : UseContractWriteConfig<
              typeof historyFactoryABI,
              'newHistory',
              TMode
          > & {
              abi?: never
              functionName?: 'newHistory'
          } = {} as any,
) {
    return useContractWrite<typeof historyFactoryABI, 'newHistory', TMode>({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        functionName: 'newHistory',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link historyFactoryABI}__.
 */
export function usePrepareHistoryFactoryWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof historyFactoryABI, TFunctionName>,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        ...config,
    } as UsePrepareContractWriteConfig<typeof historyFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link historyFactoryABI}__ and `functionName` set to `"newHistory"`.
 */
export function usePrepareHistoryFactoryNewHistory(
    config: Omit<
        UsePrepareContractWriteConfig<typeof historyFactoryABI, 'newHistory'>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        functionName: 'newHistory',
        ...config,
    } as UsePrepareContractWriteConfig<typeof historyFactoryABI, 'newHistory'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link historyFactoryABI}__.
 */
export function useHistoryFactoryEvent<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<typeof historyFactoryABI, TEventName>,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractEvent({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        ...config,
    } as UseContractEventConfig<typeof historyFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link historyFactoryABI}__ and `eventName` set to `"HistoryCreated"`.
 */
export function useHistoryFactoryHistoryCreatedEvent(
    config: Omit<
        UseContractEventConfig<typeof historyFactoryABI, 'HistoryCreated'>,
        'abi' | 'address' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: historyFactoryABI,
        address: historyFactoryAddress,
        eventName: 'HistoryCreated',
        ...config,
    } as UseContractEventConfig<typeof historyFactoryABI, 'HistoryCreated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link inputBoxABI}__.
 */
export function useInputBoxRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof inputBoxABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof inputBoxABI, TFunctionName, TSelectData>,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: inputBoxABI,
        address: inputBoxAddress,
        ...config,
    } as UseContractReadConfig<typeof inputBoxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link inputBoxABI}__ and `functionName` set to `"getInputHash"`.
 */
export function useInputBoxGetInputHash<
    TFunctionName extends 'getInputHash',
    TSelectData = ReadContractResult<typeof inputBoxABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof inputBoxABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: inputBoxABI,
        address: inputBoxAddress,
        functionName: 'getInputHash',
        ...config,
    } as UseContractReadConfig<typeof inputBoxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link inputBoxABI}__ and `functionName` set to `"getNumberOfInputs"`.
 */
export function useInputBoxGetNumberOfInputs<
    TFunctionName extends 'getNumberOfInputs',
    TSelectData = ReadContractResult<typeof inputBoxABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof inputBoxABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: inputBoxABI,
        address: inputBoxAddress,
        functionName: 'getNumberOfInputs',
        ...config,
    } as UseContractReadConfig<typeof inputBoxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link inputBoxABI}__.
 */
export function useInputBoxWrite<
    TFunctionName extends string,
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof inputBoxABI,
                  string
              >['request']['abi'],
              TFunctionName,
              TMode
          >
        : UseContractWriteConfig<typeof inputBoxABI, TFunctionName, TMode> & {
              abi?: never
          } = {} as any,
) {
    return useContractWrite<typeof inputBoxABI, TFunctionName, TMode>({
        abi: inputBoxABI,
        address: inputBoxAddress,
        ...config,
    } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link inputBoxABI}__ and `functionName` set to `"addInput"`.
 */
export function useInputBoxAddInput<
    TMode extends WriteContractMode = undefined,
>(
    config: TMode extends 'prepared'
        ? UseContractWriteConfig<
              PrepareWriteContractResult<
                  typeof inputBoxABI,
                  'addInput'
              >['request']['abi'],
              'addInput',
              TMode
          > & { functionName?: 'addInput' }
        : UseContractWriteConfig<typeof inputBoxABI, 'addInput', TMode> & {
              abi?: never
              functionName?: 'addInput'
          } = {} as any,
) {
    return useContractWrite<typeof inputBoxABI, 'addInput', TMode>({
        abi: inputBoxABI,
        address: inputBoxAddress,
        functionName: 'addInput',
        ...config,
    } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link inputBoxABI}__.
 */
export function usePrepareInputBoxWrite<TFunctionName extends string>(
    config: Omit<
        UsePrepareContractWriteConfig<typeof inputBoxABI, TFunctionName>,
        'abi' | 'address'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: inputBoxABI,
        address: inputBoxAddress,
        ...config,
    } as UsePrepareContractWriteConfig<typeof inputBoxABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link inputBoxABI}__ and `functionName` set to `"addInput"`.
 */
export function usePrepareInputBoxAddInput(
    config: Omit<
        UsePrepareContractWriteConfig<typeof inputBoxABI, 'addInput'>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return usePrepareContractWrite({
        abi: inputBoxABI,
        address: inputBoxAddress,
        functionName: 'addInput',
        ...config,
    } as UsePrepareContractWriteConfig<typeof inputBoxABI, 'addInput'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link inputBoxABI}__.
 */
export function useInputBoxEvent<TEventName extends string>(
    config: Omit<
        UseContractEventConfig<typeof inputBoxABI, TEventName>,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractEvent({
        abi: inputBoxABI,
        address: inputBoxAddress,
        ...config,
    } as UseContractEventConfig<typeof inputBoxABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link inputBoxABI}__ and `eventName` set to `"InputAdded"`.
 */
export function useInputBoxInputAddedEvent(
    config: Omit<
        UseContractEventConfig<typeof inputBoxABI, 'InputAdded'>,
        'abi' | 'address' | 'eventName'
    > = {} as any,
) {
    return useContractEvent({
        abi: inputBoxABI,
        address: inputBoxAddress,
        eventName: 'InputAdded',
        ...config,
    } as UseContractEventConfig<typeof inputBoxABI, 'InputAdded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link merkleV2ABI}__.
 */
export function useMerkleV2Read<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof merkleV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: merkleV2ABI,
        address: merkleV2Address,
        ...config,
    } as UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link merkleV2ABI}__ and `functionName` set to `"calculateRootFromPowerOfTwo"`.
 */
export function useMerkleV2CalculateRootFromPowerOfTwo<
    TFunctionName extends 'calculateRootFromPowerOfTwo',
    TSelectData = ReadContractResult<typeof merkleV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: merkleV2ABI,
        address: merkleV2Address,
        functionName: 'calculateRootFromPowerOfTwo',
        ...config,
    } as UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link merkleV2ABI}__ and `functionName` set to `"getEmptyTreeHashAtIndex"`.
 */
export function useMerkleV2GetEmptyTreeHashAtIndex<
    TFunctionName extends 'getEmptyTreeHashAtIndex',
    TSelectData = ReadContractResult<typeof merkleV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: merkleV2ABI,
        address: merkleV2Address,
        functionName: 'getEmptyTreeHashAtIndex',
        ...config,
    } as UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link merkleV2ABI}__ and `functionName` set to `"getHashOfWordAtIndex"`.
 */
export function useMerkleV2GetHashOfWordAtIndex<
    TFunctionName extends 'getHashOfWordAtIndex',
    TSelectData = ReadContractResult<typeof merkleV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: merkleV2ABI,
        address: merkleV2Address,
        functionName: 'getHashOfWordAtIndex',
        ...config,
    } as UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link merkleV2ABI}__ and `functionName` set to `"getMerkleRootFromBytes"`.
 */
export function useMerkleV2GetMerkleRootFromBytes<
    TFunctionName extends 'getMerkleRootFromBytes',
    TSelectData = ReadContractResult<typeof merkleV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: merkleV2ABI,
        address: merkleV2Address,
        functionName: 'getMerkleRootFromBytes',
        ...config,
    } as UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link merkleV2ABI}__ and `functionName` set to `"getRootAfterReplacementInDrive"`.
 */
export function useMerkleV2GetRootAfterReplacementInDrive<
    TFunctionName extends 'getRootAfterReplacementInDrive',
    TSelectData = ReadContractResult<typeof merkleV2ABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: merkleV2ABI,
        address: merkleV2Address,
        functionName: 'getRootAfterReplacementInDrive',
        ...config,
    } as UseContractReadConfig<typeof merkleV2ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link unrolledCordicABI}__.
 */
export function useUnrolledCordicRead<
    TFunctionName extends string,
    TSelectData = ReadContractResult<typeof unrolledCordicABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof unrolledCordicABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address'
    > = {} as any,
) {
    return useContractRead({
        abi: unrolledCordicABI,
        address: unrolledCordicAddress,
        ...config,
    } as UseContractReadConfig<
        typeof unrolledCordicABI,
        TFunctionName,
        TSelectData
    >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link unrolledCordicABI}__ and `functionName` set to `"log2Times1e18"`.
 */
export function useUnrolledCordicLog2Times1e18<
    TFunctionName extends 'log2Times1e18',
    TSelectData = ReadContractResult<typeof unrolledCordicABI, TFunctionName>,
>(
    config: Omit<
        UseContractReadConfig<
            typeof unrolledCordicABI,
            TFunctionName,
            TSelectData
        >,
        'abi' | 'address' | 'functionName'
    > = {} as any,
) {
    return useContractRead({
        abi: unrolledCordicABI,
        address: unrolledCordicAddress,
        functionName: 'log2Times1e18',
        ...config,
    } as UseContractReadConfig<
        typeof unrolledCordicABI,
        TFunctionName,
        TSelectData
    >)
}
