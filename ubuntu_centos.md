# Ubuntu と CentOS の違い

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
