import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EvolutionGoApi implements ICredentialType {
	name = 'evolutionGoApi';

	displayName = 'Evolution Go API';

	icon: Icon = { light: 'file:../icons/evogo.svg', dark: 'file:../icons/evogo.dark.svg' };

	documentationUrl = 'https://doc.evolution-api.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://api.evolution-api.com',
			required: true,
			description: 'The base URL of your Evolution Go API instance',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The API key for authentication',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				apikey: '={{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/instance/status',
			method: 'GET',
		},
	};
}

