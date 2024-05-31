
/// Module: nft
module nft::nft {

    use std::string::String;
    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        save: String,
        url: String
    }

    public fun mint_and_transfer(name: String, description: String, save: String, url: String, recipient: address, ctx: &mut TxContext) {
        let nft = NFT {
            id: object::new(ctx),
            name,
            description,
            url
        };
        transfer::transfer(nft, recipient);
    }
}
// sui client call --package 0x3e28adaeff4fe9b2a9d73a7a06f0e447b41ded2a1ca58887138a59f376db2af8 --module nft --function mint_and_transfer --args "Cryptopoly" '0,9,23,1,13,23,2,11,27,9,6,28,9,6,29,9,7,30,9,8,31,9,9,31,9,10,31,9,11,31,9,12,31,9,13,31,9,14,31,9,15,30,9,16,29,9,16,28' 'https://ipfs.io/ipfs/QmPVv7npG77rsYDf7wc1UuHH1Lywv43qK9wJvWPAMPqpxt' 0xfa939f43112cd4c1144434579858ec6e1151b2051f6e243d1e2cd402260a07f6

