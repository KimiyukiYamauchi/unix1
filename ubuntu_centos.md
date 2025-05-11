# UbuntuとCentOSの違い

## 日本語環境

### Ubuntu

``` bash
sudo apt update
sudo apt install language-pack-ja
sudo update-locale LANG=ja_JP.UTF-8

```

### CentOS

``` bash
sudo dnf install glibc-common
sudo dnf install glibc-locale-source glibc-langpack-ja
sudo localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
sudo localectl set-locale LANG=ja_JP.UTF-8

```

### manの日本語化

### Ubuntu

``` bash
sudo apt install manpages-ja manpages-ja-dev

```

### CentOS

``` bash
git clone https://github.com/openlab-japan/man-pages-ja.git
cd man-pages-ja
# 必要なセクションをlessやmanで読む

```