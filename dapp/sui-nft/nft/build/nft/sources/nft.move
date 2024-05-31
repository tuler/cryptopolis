
/// Module: nft
module nft::nft {

    use std::string::String;
    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: String
    }

    public fun mint_and_transfer(name: String, description: String, url: String, recipient: address, ctx: &mut TxContext) {
        let nft = NFT {
            id: object::new(ctx),
            name,
            description,
            url
        };
        transfer::transfer(nft, recipient);
    }
}

