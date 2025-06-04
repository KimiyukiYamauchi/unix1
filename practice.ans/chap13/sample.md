- memo.txt

```
このファイルは Linux の練習用です。
UNIX は古いけど今も使われています。
これはテストです。
Linuxコマンドは便利です。
BashはLinuxシェルの一種です。
macOSもUNIX系です。

```

- data.txt
```txt
This is a test.
An unknown ERROR occurred during the process.
Everything is fine.
A minor error was found in the report.
No issues detected.
Another line with Error.
```
- log.txt
```txt
2025-06-04 System started
2024-12-31 Backup completed
2025-01-01 New Year's log
ERROR occurred on 2025-03-15

```

- list.txt
```txt
install.sh
README.md
backup.SH
run_script.sh
notes.txt

```

- info.txt
```txt
network settings updated
System boot complete
Check network interface
User login successful

```

- sample.txt
```txt
abc
a c
adc
a--c
axc
ac

```

- sample.txt
```txt
hello
cat
box
sun
data

```

- sample.txt
```txt
abc
aaa
bbb
ccc
abd
xyz

```

- log.txt
```txt
abc
ab
ab123
a_b
cab
xabab

```

- text.txt
```txt
The color of the sky is blue.
She prefers the colour red.
This sentence does not mention any colors.
The colorful painting was admired by many.
Is it spelled color or colour in your country?
COLOr can be written differently in British English.

```

- data.txt
```txt
a
aa
aaa
aaaa
aaaaa
baaaac
no match here

```

- words.txt
```txt
The sky turned gray before the storm.
She painted the walls grey.
Grayson is a common name.
They argued over the spelling of gray vs grey.
This is just a test line.

```

- ommands.txt 
```txt
cat file.txt
cut -f1 data.csv
catch error
cute animal
cutting board
catapult

```

```bash
echo '<tag1><tag2><tag3><tag4>' | grep -o "<.*>"
```

```bash
echo '<tag1><tag2><tag3><tag4>' | grep -oE "<[^<]+>"
```

```bash
echo '<tag1><tag2><tag3><tag4>' | perl -nle 'print "$1" while /(<[^<]+>)/g'
```
```bash
echo "abc123xyz456x" | grep -E '[0-9].*x'
```

```bash
echo "abc123xyz456x" | grep -E '[0-9].[^x]+x'
```

```bash
echo "abc123xyz456x" | perl -nle 'print $1 if /([0-9].*?x)/'
```

- index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul>
        <li>item1</li><li>item2</li><li>item3</li><li>item4</li><li>item5</li>
    </ul>
</body>
</html>
```