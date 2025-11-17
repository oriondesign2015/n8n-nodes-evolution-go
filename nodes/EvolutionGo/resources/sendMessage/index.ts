import type { INodeProperties } from 'n8n-workflow';
import { sendTextDescription } from './sendText';

const showOnlyForSendMessage = {
	resource: ['sendMessage'],
};

export const sendMessageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSendMessage,
		},
		options: [
			{
				name: 'Send Text',
				value: 'sendText',
				action: 'Send a text message',
				description: 'Send a text message to a WhatsApp number',
				routing: {
					request: {
						method: 'POST',
						url: '/send/text',
					},
				},
			},
		],
		default: 'sendText',
	},
	...sendTextDescription,
];

