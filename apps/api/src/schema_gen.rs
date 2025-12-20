use std::fs;
use std::path::PathBuf;

mod schema;
mod types;
mod data;
mod email;

fn main() {
    let schema = schema::build_schema();
    let sdl = schema.sdl();

    let output_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .join("packages")
        .join("contracts")
        .join("schema.graphql");

    fs::write(&output_path, sdl).expect("failed to write schema.graphql");
    println!("Wrote {}", output_path.display());
}
