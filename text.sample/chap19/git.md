## 02 初期設定

### バージョンの確認

```bash
git --version
```

### 名前とメールアドレスの設定

```bash
 git config --global user.name 'Kimiyuki Yamauchi'
 git config --global user.email 'yamauchi@std.it-college.ac.jp'
```

### デフォルトのブランチの設定

```bash
git config --global init.defaultBranch main
```

### git commit で使用するエディタの設定

```bash
git config --global core.editor "vim"
```

## 03 基本的な使い方

### ディレクトリの作成、移動

```bash
mkdir -p ~/git/findgrep
cd ~/git/findgrep/
```

### ディレクトリの初期化

```bash
git init
```

### リポジトリにファイルを追加する

```bash
touch findgrep.sh
chmod ugo+x,g-w findgrep.sh
vim findgrep.sh
```

```sh
#!/bin/bash

pattern=$1+
find "$directory" -type f | xargs grep -nH "$pattern"
```

```bash
git add findgrep.sh
```

```bash
git commit -m 'findgrep.sh新規作成'
```

### 差分の表示と再コミット

#### ファイルの変更

```bash
vim findgrep.sh
```

```sh
#!/bin/bash

pattern=$1
directory=$2
if [ -z "$directory" ]; then
        directory='.'
fi
find "$directory" -type f | xargs grep -nH "$pattern"
```

#### ワークツリーの状態を表示する

```bash
git status
```

#### 差分を表示する

```bash
git diff
```

#### もう一度ファイルを追加する

```bash
git add findgrep.sh
```

#### オプションを付けづにコミットする

```bash
git commit
```

```
ファイルを探すディレクトリを指定できるようにする

ディレクトリを移動しなくても任意の場所からファイルを探せるようにするため
```

### 変更履歴を確認する

#### 履歴を確認する

```bash
git log
```

#### 履歴表示で差分も表示する

```bash
git log -p
```

#### 特定のコミットからの差分

```bash
git log 2792d56370
```

## 04 ワークツリーとインデックス

### ファイルの変更

```bash
vim findgrep.sh
```

```sh
#!/bin/bash

pattern=$1
directory=$2
if [ -z "$directory" ]; then
        directory='.'
fi

# -n : print line number
# -H : print the file name
find "$directory" -type f | xargs grep -nH "$pattern"
```

### ワークツリーとインデックスの差分を表示する

```bash
git diff
```

#### git add の直後は差分は表示されない

```bash
git add findgrep.sh
git diff
```

#### インデックスとリポジトリの差分を表示する

```bash
git diff --cached
```

#### ワークツリーとリポジトリの差分を表示する

```bash
git diff HEAD
```

## 06 誤りから復旧する

### ワークツリーに対する誤りからの復旧

#### 誤って `findgrep.sh`を削除してしまった！

```bash
rm findgrep.sh
```

##### ワークツリーのリセット

```bash
git  restore --worktree .
```

#### 誤った修正をステージングしてしまった！

```bash
git  add .
```

##### ステージングしたものをワークツリーに戻す

```bash
git  restore --staged .
```

##### ワークツリーのリセット

```bash
git  restore --worktree .
```

##### ステージングしたものをワークツリーに戻す処理とワークツリーのリセットを一度に行う

```bash
git  restore --worktree --staged .
```

### 誤ったコミットの復旧

#### 誤った修正を commit してしまった！

```bash
git add .
git commit -m "findgrep.shの修正"
```

##### コミットを取り消す

```bash
git revert d08cefad
```

## 07 ブランチを使う

### ブランチを一覧表示する

```bash
git branch
```

### feature-name ブランチを作成する

```bash
git branch feature-name
```

### feature-name ブランチに切り替える

```bash
git switch feature-name
```

### feature-name ブランチで、「検索ファイルを絞り込みできる機能」を追加

```sh
#!/bin/bash

pattern=$1
directory=$2
name=$3

if [ -z "$directory" ]; then
        directory='.'
fi

if [ -z "$name" ]; then
  name='*'
fi

# -n : print line number
# -H : print the file name
find "$directory" -type f  -name "$name" | xargs grep -nH "$pattern"
```

```bash
git add .
git commit -m "検索ファイルを絞り込みできる機能"
```

#### ログの確認

```bash
git log --oneline --graph --all --decorate
```

### 追加した機能を main ブランチにマージ

#### main ブランチに切り替え

```bash
git switch main
```

#### feature-name ブランチをマージする

```bash
git merge feature-name
```

### feature-name ブランチを削除

```bash
git branch -d feature-name
```

## 08 リポジトリのバックアップを作成する

### github.com にリポジトリを作成し、リポジトリを push

- Repository name: unix1.2025

#### `git remote add origin git@github.com:KimiyukiYamauchi/unix1.2025.git`

- ✅ 意味：リモートリポジトリ（GitHub）を「origin」という名前で追加する

- 🔧 これにより、今後この URL に git push や git pull ができるようになります

- 💬 origin はリモートリポジトリ名の慣習的な名前（変更も可能）

- 🔗 SSH 形式の URL を使っており、GitHub と SSH 接続済みであることが前提です

#### `git branch -M main`

- ✅ 意味：現在のブランチ名を main に強制的に変更する（-M = --move --force）

- 🔧 すでにブランチ名が存在していても上書きします

- 📌 通常、初期ブランチが master の場合、これで main に統一できます

#### `git push -u origin main`

✅ 意味：main ブランチを origin（GitHub）に初めてプッシュする

- 🔧 -u は「上流ブランチとして登録する」という意味  
  　 → これにより、今後 git push や git pull を省略して簡単に使えるようになります  
  　（例：次回以降は git push だけで origin/main に反映される）

### README.md を作成し、add、commit、それから github.com に push

#### README.md の作成

```README.md
# unix1.2025

git/github練習用のリポジトリ
```

#### add、commit

```bash
git add README.md
git commit -m "README.mdを追加"
```

#### github.com に push

```bash
git push
```

## 09 2 人以上で作業する

### ユーザ 2 用のリポジトリを github からクローンする

#### 現在のリポジトリ(ユーザ 1)から抜ける

```bash
cd ..
```

#### github からクローンする **(クローン元のgithubは各自のものを使用)**

```bash
git clone git@github.com:KimiyukiYamauchi/unix1.2025.y.git user2
```

### ユーザ 1 で findgrep.sh を修正し、それをユーザ 2 に取り込む

#### ユーザ 1 のリポジトリに移動 (ユーザ 1)

```bash
cd ../findgrep
```

#### findgrep.sh の修正 (ユーザ 1)

```sh
#!/bin/bash

pattern=$1
directory=$2
name=$3

# 第2引数(起点ディレクトリ)が空文字列ならば、
# デフォルト値として . (カレントディレクトリ)を設定
if [ -z "$directory" ]; then
        directory='.'
fi

# 第3引数(検索ファイルパターン)が空文字列ならば、
# デフォルト値として'*'を設定
if [ -z "$name" ]; then
  name='*'
fi

# -n : print line number
# -H : print the file name
find "$directory" -type f  -name "$name" | xargs grep -nH "$pattern"
```

#### add、commit、push を実行 (ユーザ 1)

```bash
git add .
git commit -m "コメントを追加"
git push
```

#### ユーザ 2 のリポジトリに移動 (ユーザ 2)

```bash
cd ../user2
```

#### github の履歴を取得する (ユーザ 2)

```bash
git fetch origin
```

#### リモート追跡ブランチを表示する (ユーザ 2)

```bash
git branch -r
```

#### リモート追跡ブランチをマージする (ユーザ 2)

```bash
git switch main
git merge origin/main
```

## 10 競合を解決する

### ユーザ 2 の修正がユーザ 1 の修正と競合するのを解決する

#### ユーザ 2 のリポジトリに移動 (ユーザ 2)

```bash
cd ../user2
```

#### findgrep.sh の修正 (ユーザ 2)

```sh
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
        directory='.'
fi

# 第3引数(検索ファイルパターン)が空文字列ならば、
# デフォルト値として'*'を設定
if [ -z "$name" ]; then
  name='*'
fi

# -n : print line number
# -H : print the file name
find "$directory" -type f  -name "$name" | xargs grep -nH "$pattern"
```

#### add、commit、push を実行 (ユーザ 2)

```bash
git add .
git commit -m "ヘルプ機能を追加"
git push
```

#### ユーザ 1 のリポジトリに移動 (ユーザ 1)

```bash
cd ../findgrep
```

#### findgrep.sh の修正 (ユーザ 1)

```sh
#!/bin/bash

usage()
{
  # シェルスクリプトのファイル名を取得
  local script_name=$(basename $0)
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
        directory='.'
fi

# 第3引数(検索ファイルパターン)が空文字列ならば、
# デフォルト値として'*'を設定
if [ -z "$name" ]; then
  name='*'
fi

# -n : print line number
# -H : print the file name
find "$directory" -type f  -name "$name" | xargs grep -nH "$pattern"
```

#### add、commit を実行 (ユーザ 1)

```bash
git add .
git commit -m "ヘルプ機能を追加"
```

#### push を実行 (ユーザ 1) => 競合が発生する

```bash
git push
```

#### github の履歴を取得する (ユーザ 1)

```bash
git fetch
```

#### リモート追跡ブランチを表示する (ユーザ 1)

```bash
git branch -r
```

#### リモート追跡ブランチをマージする (ユーザ 1)

```bash
git switch main
git merge origin/main
```

#### findgrep を手動で修正 (ユーザ 1)

```bash
vi findgrep.sh
```

#### add、commit、push を実行 (ユーザ 1)

```bash
git add .
git commit -m "ヘルプ機能を追加(競合を解決)"
git push
```
