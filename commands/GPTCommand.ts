import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
const appConfig = require('./app.json');

export class GPTCommand implements ISlashCommand {
	public command = 'gpt';
	public i18nParamsExample = 'your_prompt';
	public i18nDescription = 'GPT_Command_Description';
	public providesPreview = false;
	private readonly url = 'https://api.openai.com/v1/chat/completions';

	public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
		const args = context.getArguments();
		const input = args.join(' ');

		// get settings values
		const apiKey = await read.getEnvironmentReader().getSettings().getValueById('gpt_api_key');
		const gptModel = await read.getEnvironmentReader().getSettings().getValueById('gpt_model');

		let gptResponse: any;

		if (!apiKey) {
			gptResponse = 'Invalid API key. Please enter a valid API key in the Apps (tab Settings).';
		} else {
			const result = await http.post(this.url, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${apiKey}`,
				},
				data: {
					model: gptModel,
					messages: [
						{
							role: 'user',
							content: input,
						},
					],
					temperature: 1,
					max_tokens: 256,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				},
			});

			if (result.statusCode === 200) {
				const data = JSON.parse(result.content || '{}');
				gptResponse = data.choices[0].message.content;
			} else {
				gptResponse = 'Error occurred while calling the API.';
			}
		}

		// Create a message
		const user = await read.getUserReader().getByUsername(context.getSender().username);
		const userBuilder = modify.getCreator().startMessage().setSender(user).setRoom(context.getRoom()).setText(input);
		await modify.getCreator().finish(userBuilder);

		const botUser = await read.getUserReader().getByUsername(`${appConfig.nameSlug}.bot`);
		const botBuilder = modify.getCreator().startMessage().setSender(botUser).setRoom(context.getRoom()).setText(gptResponse);
		await modify.getCreator().finish(botBuilder);
	}
}
