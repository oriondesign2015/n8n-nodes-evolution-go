import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCreateInstance = {
	operation: ['create'],
	resource: ['instance'],
};

export const createInstanceDescription: INodeProperties[] = [
	{
		displayName: 'Instance Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. MyInstance',
		displayOptions: {
			show: showOnlyForCreateInstance,
		},
		description: 'The name of the instance to create',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		placeholder: 'e.g. 1234-5678-9012-3456',
		displayOptions: {
			show: showOnlyForCreateInstance,
		},
		description: 'The token for the instance (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'token',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		displayOptions: {
			show: showOnlyForCreateInstance,
		},
		default: {},
		options: [
			{
				displayName: 'Proxy',
				name: 'proxy',
				type: 'fixedCollection',
				placeholder: 'Add Proxy',
				typeOptions: {
					multipleValues: false,
				},
				default: {
					proxy: {},
				},
				options: [
					{
						displayName: 'Proxy',
						name: 'proxy',
						values: [
							{
								displayName: 'Host',
								name: 'host',
								type: 'string',
								default: '',
								placeholder: 'e.g. 0.0.0.0',
								description: 'The proxy host',
							},
							{
								displayName: 'Port',
								name: 'port',
								type: 'string',
								default: '',
								placeholder: 'e.g. 8000',
								description: 'The proxy port',
							},
							{
								displayName: 'Username',
								name: 'username',
								type: 'string',
								default: '',
								placeholder: 'e.g. username',
								description: 'The proxy username (optional)',
							},
							{
								displayName: 'Proxy Password',
								name: 'proxyPassword',
								type: 'string',
								typeOptions: { password: true },
								default: '',
								placeholder: 'e.g. password123',
								description: 'The proxy password (optional)',
							},
						],
					},
				],
			},
			{
				displayName: 'Settings',
				name: 'settings',
				type: 'fixedCollection',
				placeholder: 'Add Settings',
				typeOptions: {
					multipleValues: false,
				},
				default: {
					settings: {},
				},
				options: [
					{
						displayName: 'Settings',
						name: 'settings',
						values: [
							{
								displayName: 'Always Online',
								name: 'alwaysOnline',
								type: 'boolean',
								default: false,
								description: 'Whether the instance should always be online',
							},
							{
								displayName: 'Reject Call',
								name: 'rejectCall',
								type: 'boolean',
								default: false,
								description: 'Whether to reject incoming calls',
							},
							{
								displayName: 'Call Rejection Message',
								name: 'msgRejectCall',
								type: 'string',
								default: '',
								placeholder: 'e.g. Call rejected automatically',
								displayOptions: {
									show: {
										rejectCall: [true],
									},
								},
								description: 'Message to send when rejecting calls',
							},
						],
					},
				],
			},
			{
				displayName: 'Webhook',
				name: 'webhook',
				type: 'fixedCollection',
				placeholder: 'Add Webhook',
				typeOptions: {
					multipleValues: false,
				},
				default: {
					webhook: {},
				},
				options: [
					{
						displayName: 'Webhook',
						name: 'webhook',
						values: [
							{
								displayName: 'Webhook URL',
								name: 'webhook',
								type: 'string',
								default: '',
								placeholder: 'e.g. https://webhook.example.com/endpoint',
								description: 'The webhook URL to receive events',
							},
							{
								displayName: 'Webhook Events',
								name: 'webhookEvents',
								type: 'multiOptions',
								default: ['MESSAGE'],
								options: [
									{
										name: 'CALL',
										value: 'CALL',
									},
									{
										name: 'CHAT_PRESENCE',
										value: 'CHAT_PRESENCE',
									},
									{
										name: 'CONNECTION',
										value: 'CONNECTION',
									},
									{
										name: 'CONTACT',
										value: 'CONTACT',
									},
									{
										name: 'GROUP',
										value: 'GROUP',
									},
									{
										name: 'HISTORY_SYNC',
										value: 'HISTORY_SYNC',
									},
									{
										name: 'LABEL',
										value: 'LABEL',
									},
									{
										name: 'MESSAGE',
										value: 'MESSAGE',
									},
									{
										name: 'NEWSLETTER',
										value: 'NEWSLETTER',
									},
									{
										name: 'PRESENCE',
										value: 'PRESENCE',
									},
									{
										name: 'QRCODE',
										value: 'QRCODE',
									},
									{
										name: 'READ_RECEIPT',
										value: 'READ_RECEIPT',
									},
									{
										name: 'SEND_MESSAGE',
										value: 'SEND_MESSAGE',
									},
								],
								description: 'Select webhook events to receive',
							},
						],
					},
				],
			},
		],
		description: 'Additional options for instance creation',
	},
	{
		displayName: 'Advanced Settings',
		name: 'advancedSettings',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['instance'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'advancedSettings',
				value: '={{(() => { const settingsData = $parameter.options?.settings?.settings; if (!settingsData) return undefined; const settings = {}; if (settingsData.alwaysOnline !== undefined) settings.alwaysOnline = settingsData.alwaysOnline; if (settingsData.rejectCall !== undefined) settings.rejectCall = settingsData.rejectCall; if (settingsData.rejectCall && settingsData.msgRejectCall !== undefined) settings.msgRejectCall = settingsData.msgRejectCall || null; return Object.keys(settings).length > 0 ? settings : undefined; })()}}',
			},
		},
	},
	{
		displayName: 'Proxy',
		name: 'proxy',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['instance'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'proxy',
				value: '={{(() => { const proxyData = $parameter.options?.proxy?.proxy; if (!proxyData) return undefined; const proxy = {}; if (proxyData.host) proxy.host = proxyData.host; if (proxyData.port) proxy.port = proxyData.port; if (proxyData.username) proxy.username = proxyData.username; if (proxyData.proxyPassword) proxy.password = proxyData.proxyPassword; return Object.keys(proxy).length > 0 ? proxy : undefined; })()}}',
			},
		},
	},
	{
		displayName: 'Webhook',
		name: 'webhook',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['instance'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'webhook',
				value: '={{$parameter.options?.webhook?.webhook?.webhook}}',
			},
		},
	},
	{
		displayName: 'Webhook Events',
		name: 'webhookEvents',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['instance'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'webhookEvents',
				value: '={{(() => { const webhookData = $parameter.options?.webhook?.webhook; if (!webhookData?.webhookEvents || !Array.isArray(webhookData.webhookEvents) || webhookData.webhookEvents.length === 0) return undefined; return webhookData.webhookEvents; })()}}',
			},
		},
	},
];

