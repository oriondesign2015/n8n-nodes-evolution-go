import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { sendMessageDescription } from './resources/sendMessage';
import { instanceDescription } from './resources/instance';

export class EvolutionGo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution Go',
		name: 'evolutionGo',
		icon: { light: 'file:../../icons/evogo.svg', dark: 'file:../../icons/evogo.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Send messages and interact with Evolution Go API',
		defaults: {
			name: 'Evolution Go',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'evolutionGoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Instance',
						value: 'instance',
					},
					{
						name: 'Send Message',
						value: 'sendMessage',
					},
				],
				default: 'sendMessage',
			},
			...instanceDescription,
			...sendMessageDescription,
		],
	};
}

