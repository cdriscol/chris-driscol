#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$project_root/../.." && pwd)"
dist_dir="$repo_root/dist"
dist_zip="$dist_dir/lambda.zip"
target_root="$repo_root/target"
lambda_dir="$target_root/lambda"
lambda_zip="$lambda_dir/bootstrap/bootstrap.zip"

echo "Building lambda from $project_root"
echo "Lambda output dir: $lambda_dir"
echo "Lambda dist zip: $dist_zip"
echo "Cargo target dir: $target_root"

mkdir -p "$dist_dir"

echo "Tool versions:"
cargo lambda --version || true
zig version || true

echo "Running cargo lambda build..."
(cd "$project_root" && CARGO_TARGET_DIR="$target_root" cargo lambda build --release --output-format zip --bin bootstrap)
echo "cargo lambda build completed."
if [[ -d "$lambda_dir" ]]; then
  find "$lambda_dir" -type f -name '*.zip' -print
else
  echo "Lambda output directory not found at $lambda_dir"
  lambda_dir="$target_root"
fi

if [[ ! -f "$lambda_zip" ]]; then
  found_zip=""
  search_dirs=("$lambda_dir" "$target_root" "$target_root/x86_64-unknown-linux-musl/lambda")
  for dir in "${search_dirs[@]}"; do
    if [[ ! -d "$dir" ]]; then
      continue
    fi
    found_zip="$(find "$dir" -type f -name 'bootstrap.zip' 2>/dev/null | head -n 1)"
    if [[ -z "$found_zip" ]]; then
      found_zip="$(find "$dir" -type f -name '*.zip' 2>/dev/null | head -n 1)"
    fi
    if [[ -n "$found_zip" ]]; then
      break
    fi
  done
  if [[ -z "$found_zip" ]]; then
    echo "Contents of $target_root (if any):"
    ls -la "$target_root" || true
    if [[ -d "$target_root/lambda" ]]; then
      echo "Contents of $target_root/lambda:"
      ls -la "$target_root/lambda" || true
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
