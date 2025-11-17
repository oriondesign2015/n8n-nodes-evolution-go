import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSendText = {
	operation: ['sendText'],
	resource: ['sendMessage'],
};

export const sendTextDescription: INodeProperties[] = [
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForSendText,
		},
		description: 'The phone number to send the message to (with country code, e.g., 5511999999999)',
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForSendText,
		},
		description: 'The text message to send',
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},
];

