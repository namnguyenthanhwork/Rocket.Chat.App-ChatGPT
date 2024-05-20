<div align="center">
  <h1 align="center">
    Rocket.Chat.App-ChatGPT
    <br />
    <br />
    <img src="/icon.jpg" width="150px" height="150px" alt="Rocket.Chat.App-ChatGPT">
  </h1>
  <p>ChatGPT integration for Rocket.Chat</p>
</div>

## Install bot

**Step 1:** Clone this repository

**Step 2:** Click three dot in left sidebar -> App (Marketplace) -> Private Apps -> Upload a private app -> Choose file `gpt_1.0.0.zip` (in `dist` folder) -> Install

![demo](./docs/images/install.png)

**Step 3:** Click tab setting, fill `API Key` (get from [OpenAI](https://platform.openai.com/api-keys)) and choose `GPT MODEL` -> Save

![demo](./docs/images/settings.png)

**Step 4:** Go to channel, type `/gpt <prompt>`

![demo](./docs/images/demo.png)

## Development

1. Copy this folder to your Rocket.Chat App folder (in root folder of Rocket.Chat)
2. Check `Rocket.Chat Apps-Engine CLI` installed

```bash
rc-apps -v
```

![check-version](./docs/images/check-version.png)

If you don't have `Rocket.Chat Apps-Engine CLI`, install it

```bash
npm install -g @rocket.chat/apps-cli
```

**Error:** While attempting to execute the preceding command, if your operating system rejects the operation, it is likely that you do not have permission to access the file as the current user. If you suspect a permissions issue, please double-check your NPM installation, or rerun the command as root/Administrator.

**Resolution:** Prefix the command with sudo and execute as follows:

```bash
sudo npm install -g @rocket.chat/apps-cli
```

Next, install the Apps-Engine framework/library which allows applications to recognize Apps-Engine. To do this, open the terminal in Visual Studio and execute the following command:

```bash
npm install
```

Refer docs: [Create an App](https://developer.rocket.chat/apps-engine/creating-an-app)

You are now all set to develop your app. You can develop `gpt-bot` and run `rc-apps package` to package the app for distribution, and re-install or override package it in Private Apps.

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/namnguyenthanhwork/wiki-rocketchat-bot/issues) if you want to contribute.

## ❤ Show your support

Please ⭐️ this repository if this project helped you!