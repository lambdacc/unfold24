/// Creating NFT as tokens for share buying 
module sui_nft::share_nft;

use std::string::String;

// The creator bundle: these two packages often go together.
use sui::package;
use sui::display;

/// The Hero - an outstanding collection of digital art.
public struct Hero has key, store {
    id: UID,
    name: String,
    image_url: String,
}

/// One-Time-Witness for the module.
public struct SHARE_NFT has drop {}

fun init(otw: SHARE_NFT, ctx: &mut TxContext) {
    let keys = vector[
        b"name".to_string(),
        b"link".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        // For `name` one can use the `Hero.name` property
        b"{name}".to_string(),
        // For `link` one can build a URL using an `id` property
        b"https://hedgesphereio/shield/{id}".to_string(),
        // For `image_url` use an IPFS template + `image_url` property.
        b"ipfs://{image_url}".to_string(),
        // Description is static for all `Hero` objects.
        b"A true Hero of the Sui ecosystem!".to_string(),
        // Project URL is usually static
        b"https://hedgesphere.io".to_string(),
        // Creator field can be any
        b"Hedge Shield".to_string(),

    ];

    // Claim the `Publisher` for the package!
    let publisher = package::claim(otw, ctx);

    // Get a new `Display` object for the `Hero` type.
    let mut display = display::new_with_fields<Hero>(
        &publisher, keys, values, ctx
    );

    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

/// Anyone can mint their `Share Token`!
public fun mint(name: String, image_url: String, ctx: &mut TxContext) {
    let hero = Hero {
        id: object::new(ctx),
        name,
        image_url,
    };

    // Transfer the Share token  to the share buyer
    transfer::public_transfer(hero, tx_context::sender(ctx));
}
