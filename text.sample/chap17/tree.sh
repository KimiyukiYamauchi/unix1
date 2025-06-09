#!/bin/bash

list_recursive ()
{
  local filepath=$1
  local indent=$2

  # インデント付きで、パス部分を取り除いてファイル名を表示する
  echo "${indent}${filepath##*/}"

  if [ -d "$filepath" ]; then
    local fname
    IFS=$'\n'
    for fname in $(ls "$filepath")
    do
      # インデントにスペースを追加して再帰呼び出し
      list_recursive "${filepath}/${fname}" "    $indent"
    done
  fi
}

list_recursive "$1" ""