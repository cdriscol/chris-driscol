#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$project_root/../.." && pwd)"
dist_dir="$repo_root/dist"
dist_zip="$dist_dir/lambda.zip"
lambda_zip="$project_root/target/lambda/bootstrap/bootstrap.zip"

mkdir -p "$dist_dir"

(cd "$project_root" && cargo lambda build --release --output-format zip --bin bootstrap)

if [[ ! -f "$lambda_zip" ]]; then
  echo "Expected Lambda zip not found at $lambda_zip. Check cargo lambda output." >&2
  exit 1
fi

cp -f "$lambda_zip" "$dist_zip"
echo "Wrote $dist_zip"
