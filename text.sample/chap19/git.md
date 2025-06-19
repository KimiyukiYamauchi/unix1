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
