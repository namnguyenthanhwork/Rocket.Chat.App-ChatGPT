import { IConfigurationExtend, IAppAccessors, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { GPTCommand } from './commands/GPTCommand';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';

export class ChatGPTApp extends App {
	constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
		super(info, logger, accessors);
	}

	public async extendConfiguration(configuration: IConfigurationExtend) {
		await configuration.settings.provideSetting({
			id: 'gpt_api_key',
			type: SettingType.STRING,
			packageValue: '',
			required: true,
			public: false,
			i18nLabel: 'GPT_Api_Key_Label',
			i18nDescription: 'GPT_Api_Key_Description',
			i18nPlaceholder: 'GPT_Api_Key_Placeholder',
		});

		await configuration.settings.provideSetting({
			id: 'gpt_model',
			type: SettingType.SELECT,
			packageValue: 'gpt-3.5-turbo-16k',
			values: [
				{ key: 'gpt-3.5-turbo', i18nLabel: 'gpt-3.5-turbo' },
				{ key: 'gpt-3.5-turbo-16k', i18nLabel: 'gpt-3.5-turbo-16k' },
				{ key: 'davinci-002', i18nLabel: 'davinci-002' },
			],
			required: true,
			public: false,
			i18nLabel: 'GPT_Model_Label',
			i18nDescription: 'GPT_Model_Description',
		});

		configuration.slashCommands.provideSlashCommand(new GPTCommand());
	}
}
