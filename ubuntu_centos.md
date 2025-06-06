# Ubuntu と CentOS の違い

## PATHの設定

### Ubuntu

/etc/environment
```
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
```
~/profile

```
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```

### CentOS

/etc/profile

```

```


~/.bashrc
```
# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]
then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH
```


## 日本語環境

### Ubuntu

```bash
sudo apt update
sudo apt install language-pack-ja
sudo update-locale LANG=ja_JP.UTF-8

```

### CentOS

```bash
sudo dnf install glibc-common
sudo dnf install glibc-locale-source glibc-langpack-ja
sudo localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
sudo localectl set-locale LANG=ja_JP.UTF-8

```

## man の日本語化

### Ubuntu

```bash
sudo apt install manpages-ja manpages-ja-dev

```

### CentOS

```bash


```

## locate コマンドのインストール

### Ubuntu

```bash
sudo apt update
sudo apt install plocate
sudo updatedb
```

### CentOS

```bash
sudo dnf install mlocate
sudo updatedb

```

## git のインストール

### Ubuntu

```bash
sudo apt update
sudo apt install git

```

### CentOS

```bash
sudo dnf install git
# CentOS 7 の場合:
# sudo yum install git

```

## ImageMagick のインストール

### Ubuntu

```bash
sudo apt update
sudo apt install imagemagick

```

### CentOS

```bash
sudo dnf install epel-release
sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm
sudo dnf makecache
dnf --enablerepo=remi search imagemagick
sudo dnf --enablerepo=remi install ImageMagick7

```
