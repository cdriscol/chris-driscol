#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$project_root/../.." && pwd)"
dist_dir="$repo_root/dist"
dist_zip="$dist_dir/lambda.zip"
lambda_dir="$project_root/target/lambda"
lambda_zip="$lambda_dir/bootstrap/bootstrap.zip"

echo "Building lambda from $project_root"
echo "Lambda output dir: $lambda_dir"
echo "Lambda dist zip: $dist_zip"

mkdir -p "$dist_dir"

echo "Tool versions:"
cargo lambda --version || true
zig version || true

echo "Running cargo lambda build..."
(cd "$project_root" && cargo lambda build --release --output-format zip --bin bootstrap)
echo "cargo lambda build completed."
if [[ -d "$lambda_dir" ]]; then
  find "$lambda_dir" -type f -name '*.zip' -print
else
  echo "Lambda output directory not found at $lambda_dir"
  lambda_dir="$project_root/target"
fi

if [[ ! -f "$lambda_zip" ]]; then
  found_zip="$(find "$lambda_dir" -type f -name 'bootstrap.zip' 2>/dev/null | head -n 1)"
  if [[ -z "$found_zip" ]]; then
    found_zip="$(find "$lambda_dir" -type f -name '*.zip' 2>/dev/null | head -n 1)"
  fi
  if [[ -z "$found_zip" ]]; then
    echo "Contents of $project_root/target (if any):"
    ls -la "$project_root/target" || true
    if [[ -d "$project_root/target/lambda" ]]; then
      echo "Contents of $project_root/target/lambda:"
      ls -la "$project_root/target/lambda" || true
    fi
    echo "Expected Lambda zip not found under $lambda_dir. Check cargo lambda output." >&2
    exit 1
  fi
  lambda_zip="$found_zip"
fi

cp -f "$lambda_zip" "$dist_zip"
echo "Copied $(basename "$lambda_zip") to $dist_zip"
ls -la "$dist_zip"
echo "Wrote $dist_zip"
