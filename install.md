## 1. 作業環境の構築 

### 1. 作業ディレクトリの作成

```
mkdir  unix1
cd unix1
```

### 2. Vagrantfile を初期化（CentOS Stream 9用Boxを指定）

``` bash
vagrant init centos/stream9
```
centos/stream9 は公式のCentOS Stream 9のBoxです。  
→ [Vagrant Cloudの公式Box](https://portal.cloud.hashicorp.com/vagrant/discover/centos/stream9)

### 3.仮想マシンを起動

``` bash
vagrant up
```

### 4.仮想マシンにログイン

``` bash
vagrant ssh
```

## 終了／削除したいとき

``` bash
vagrant halt      # 一時停止
vagrant destroy   # 完全削除（初期状態に戻す）

```

## 使えるBoxの確認

``` bash
vagrant box list

```