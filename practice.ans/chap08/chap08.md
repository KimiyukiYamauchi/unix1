### Q1:

**問題**: ls -la というコマンドに「ll」という名前のエイリアスを設定する Linux コマンドを記述しなさい。  
**答え**:

```bash
alias ll='ls -la'
```

#### 正解: 14 / 不正解: 7 / 正解率: 67%

---

### Q2:

**問題**: 現在設定されているエイリアスの一覧を表示する Linux コマンドを記述しなさい。  
**答え**:

```bash
alias
```

#### 正解: 17 / 不正解: 4 / 正解率: 81%

---

### Q3:

**問題**: 設定されているエイリアス「ll」を削除する Linux コマンドを記述しなさい。  
**答え**:

```bash
unalias ll
```

#### 正解: 14 / 不正解: 7 / 正解率: 67%

---

### Q4:

**問題**: ll というコマンドがエイリアスかどうか確認するための Linux コマンドを記述しなさい。  
**答え**:

```bash
type ll
```

#### 正解: 18 / 不正解: 3 / 正解率: 86%

---

### Q5:

**問題**: エイリアスの定義を恒久的に保存するために編集するファイル名を記述しなさい。  
**答え**:

```bash
.bashrc
```

#### 正解: 15 / 不正解: 6 / 正解率: 71%

---

### Q6:

**問題**: スクリプトで、エラーが発生した時点で処理を停止するように設定する set コマンドを記述しなさい。  
**答え**:

```bash
set -e
```

#### 正解: 16 / 不正解: 5 / 正解率: 76%

---

### Q7:

**問題**: スクリプトで、set -e を無効にしてエラーが出ても処理を継続するようにする set コマンドを記述しなさい。  
**答え**:

```bash
set +e
```

#### 正解: 15 / 不正解: 6 / 正解率: 71%

---

### Q8:

**問題**: ドットで始まるファイルもワイルドカード（\*）で展開できるようにする shopt コマンドを記述しなさい。  
**答え**:

```bash
shopt -s dotglob
```

#### 正解: 17 / 不正解: 4 / 正解率: 81%

---

### Q9:

**問題**: ワイルドカード（\*）でドットで始まるファイルを展開しないようにする shopt コマンドを記述しなさい。  
**答え**:

```bash
shopt -u dotglob
```

#### 正解: 16 / 不正解: 5 / 正解率: 76%

---

### Q10:

**問題**: 変数 name に文字列 Taro を代入する Linux コマンドを記述しなさい。  
**答え**:

```bash
name="Taro"
```

#### 正解: 18 / 不正解: 3 / 正解率: 86%

---

### Q11:

**問題**: 変数 name の値を参照して「Hello, Taro!」と表示する Linux コマンドを記述しなさい。  
**答え**:

```bash
echo "Hello, $name!"
```

#### 正解: 13 / 不正解: 8 / 正解率: 62%

---

### Q12:

**問題**: プロンプト変数 PS1 を「$ 」に変更する Linux コマンドを記述しなさい。  
**答え**:

```bash
PS1="$ "
```

#### 正解: 10 / 不正解: 11 / 正解率: 48%

---

### Q13:

**問題**: LANG 変数を日本語環境（ja_JP.UTF-8）に設定する Linux コマンドを記述しなさい。  
**答え**:

```bash
LANG=ja_JP.UTF-8
```

#### 正解: 13 / 不正解: 8 / 正解率: 62%

---

### Q14:

**問題**: 現在の LANG 環境変数の値を表示する Linux コマンドを記述しなさい。  
**答え**:

```bash
printenv LANG
```

#### 正解: 18 / 不正解: 3 / 正解率: 86%

---

### Q15:

**問題**: 変数 MYVAR に hello を代入し、環境変数として登録する Linux コマンドを記述しなさい。  
**答え**:

```bash
export MYVAR=hello
```

#### 正解: 17 / 不正解: 4 / 正解率: 81%

---
