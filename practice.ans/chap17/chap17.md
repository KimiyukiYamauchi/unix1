### Q1:

**問題**: 演習 1「日記を書くためのシェルスクリプト」を完成させてください
**答え**:

```bash
#!/bin/bash

# 日記データの保存ディレクトリ
directory="${HOME}/diary"

# データ保存ディレクトリがなければ作成する
if [ ! -d "$directory" ]; then
  mkdir "$directory"
fi

# 日記ファイルパスの組み立て
diaryfile="${directory}/$(date '+%Y-%m-%d').txt"

# 日記ファイルがなければ(今日初めて書くならば)、先頭に日付を挿入
if [ ! -e "$diaryfile" ]; then
  date '+%Y/%m/%d' > "$diaryfile"
fi

vim "$diaryfile"

```

#### 正解: 17 / 不正解: 8 / 正解率: 68%

---

### Q2:

**問題**: 演習 2「指定したパス配下のファイル一覧表示」を完成させてください
**答え**:

```bash
#!/bin/bash

list_recursive ()
{
  local filepath=$1
  local indent=$2

  # インデント付きで、パス部分を取り除いてファイル名を表示する
  echo "${indent}${filepath##*/}"

  if [ -d "$filepath" ]; then
    local fname
    _IFS=$IFS
    IFS=$'\n'
    for fname in $(ls "$filepath")
    do
      # インデントにスペースを追加して再帰呼び出し
      list_recursive "${filepath}/${fname}" "    $indent"
    done
    IFS=$_IFS
  fi
}

list_recursive "$1" ""

```

#### 正解: 8 / 不正解: 17 / 正解率: 32%

---

### Q3:

**問題**: 演習 3「検索コマンド」を完成させてください
**答え**:

```bash
#!/bin/bash

usage()
{
  # シェルスクリプトのファイル名を取得
  local script_name=$(basename "$0")
  # ヒヤドキュメントでヘルプを表示
  cat << END
Usage: $script_name PATTERN [PATH] [NAME_PATTERN]
Find file in current directory recursively, and print lines which match PATTERN.

  PATH           find file in PATH directory, instead of current directory
  NAME_PATTERN   specify name pattern to find file

Examples:
  $script_name return
  $script_name return ~ '*.txt'
END
}

# コマンドライン引数が0個のとき (何も指定されないとき)
if [ "$#" -eq 0 ]; then
  usage
  exit 1        # 終了ステータス1で終了
fi

pattern=$1
directory=$2
name=$3

# 第2引数(起点ディレクトリ)が空文字列ならば、
# デフォルト値として . (カレントディレクトリ)を設定
if [ -z "$directory" ]; then
  directory="."
fi

# 第3引数(検索ファイルパターン)が空文字列ならば、
# デフォルト値として'*'を設定
if [ -z "$name" ]; then
  name='*'
fi

# 検索ディレクトリが存在しない場合はエラーメッセージを表示して終了
if [ ! -d "$directory" ]; then
  echo "$0: ${directory}: No such directory" 1>&2
  exit 2
fi

find "$directory" -type f -name "$name" | xargs grep -nH "$pattern"
```

#### 正解: 10 / 不正解: 15 / 正解率: 40%


---
