---
title: Setting up my dev environment on windows 10
slug: setting-up-my-dev-environment-on-windows-10
date: "2017-03-01"
topic: coding
tags: ["windows", "vscode", "setup"]
---

I got a brand new Dell Latitude latpop just a few weeks ago. Here are some of the softwares I installed and settings I did to customise it. I wanted to share this because I have been enjoying what I have got going on.

### Softwares

- [Visual studio 2017](https://visualstudio.microsoft.com/vs/) for .Net Core projects
- [Visual studio Code](https://code.visualstudio.com/) as my main text editor
- [Hyper](https://hyper.is/) as my terminal
- [Trello](https://trello.com/) for project management
- [Microsoft Todo](https://todo.microsoft.com/) for tracking todos
- [DBeaver](https://dbeaver.io/) for database
- [FileZilla](https://filezilla-project.org/) for ftp

### Setting up WSL

##### Install ZSH and oh-my-zsh

```shell
# Set http_proxy if you are behind proxy
# sudo http_proxy=http://yourserver apt-get update
sudo apt update
sudo apt upgrade
sudo apt-get install zsh
sudo apt-get install git
sudo apt-get install hugo
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
git config --global http.sslverify false
git config --global core.autocrlf input
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Make zsh as your default shell by adding below line in your `~/.bashrc`

```shell
if test -t 1; then
exec zsh
fi
```

Disable permission errors by adding below in your `~/.zshrc`

`alias ls='ls 2>/dev/null`

Remove username from agnoster theme by changing the prompt_context() with below code

```shell
prompt_context() {
  prompt_segment $PRIMARY_FG default  "  🌈  "
}

prompt_dir() {
  prompt_segment blue $PRIMARY_FG ' %c '
}
```
Add below plugins in `~/.zshrc`

```shell
plugins=(
    git
    node
    npm
    npx
    nvm
    z
)
```

#### Install nodejs and yarn

```shell
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install --no-install-recommends yarn
yarn --version
```

Setup npm

```shell
npm config set strict-ssl false
# To set proxy for npm installs -> npm config set proxy http://proxy_host:port
```

Setup Yarn

```shell
yarn config set proxy http://username:password@host:port
yarn config set https-proxy http://username:password@host:port
```

Fix permission errors when installing global npm modules

```shell
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
vim ~/.profile
```
Add below line in your `.profile`

`export PATH=~/.npm-global/bin:$PATH`

Update system variables

```shell
source ~/.profile
```
##### Change theme of oh-myzsh

You can change theme of the shell by changing the value of `ZSH_THEME="agnoster"` in `~/.zshrc`

Some theme may want powerline fonts which can be found in below repository. Use the install script in the repo to install all the fonts at once.

```shell
Set-ExecutionPolicy Bypass
git clone https://github.com/powerline/fonts.git
.\install.ps1
```

Install monospaced version of powerline fonts from below link for internal terminal of VSCode and then change the integrated
terminal font family to Menlo for Powerline

`git clone https://github.com/abertsch/Menlo-for-Powerline.git`


### Plugins for Visual Studio Code

- Code Runner
- Eslint
- Markdown All in One
- Prettier
- Snazzy Operator
- stylelint

### Extensions for Google Chrome

- Grammarly
- ColorPick Eyedropper
- React developer tools
- Redux developer tools
- Tampermonkey
- Video speed controller
- Adblock plus
