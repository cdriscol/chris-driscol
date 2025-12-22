#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$project_root/../.." && pwd)"
dist_dir="$repo_root/dist"
dist_zip="$dist_dir/lambda.zip"
lambda_dir="$project_root/target/lambda"
lambda_zip="$lambda_dir/bootstrap/bootstrap.zip"

mkdir -p "$dist_dir"

(cd "$project_root" && cargo lambda build --release --output-format zip --bin bootstrap)
find "$lambda_dir" -type f -name '*.zip' -print

if [[ ! -f "$lambda_zip" ]]; then
  found_zip="$(find "$lambda_dir" -type f -name 'bootstrap.zip' | head -n 1)"
  if [[ -z "$found_zip" ]]; then
    found_zip="$(find "$lambda_dir" -type f -name '*.zip' | head -n 1)"
  fi
  if [[ -z "$found_zip" ]]; then
    echo "Expected Lambda zip not found under $lambda_dir. Check cargo lambda output." >&2
    exit 1
  fi
  lambda_zip="$found_zip"
fi

cp -f "$lambda_zip" "$dist_zip"
echo "Wrote $dist_zip"
