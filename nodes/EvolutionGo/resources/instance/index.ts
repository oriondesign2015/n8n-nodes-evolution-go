import type { INodeProperties } from 'n8n-workflow';
import { createInstanceDescription } from './create';

const showOnlyForInstance = {
	resource: ['instance'],
};

export const instanceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForInstance,
		},
		options: [
			{
				name: 'Create Instance',
				value: 'create',
				action: 'Create a new instance',
				description: 'Create a new Evolution Go instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/create',
					},
				},
			},
		],
		default: 'create',
	},
	...createInstanceDescription,
];

