#!/usr/bin/env bash

cd "$(dirname ${BASH_SOURCE[0]})/.."

root_dir="$(realpath .)"
output_dir="$root_dir/.compress"

mkdir -p "$output_dir"
filename="$(node -p 'const {name,version}=require("./package.json"); `${name}-datapack_${version}`')"
zip_file="$output_dir/$filename.zip"

cd .sandstone/output/datapack
rm -f "$zip_file"
zip -r "$zip_file" *
