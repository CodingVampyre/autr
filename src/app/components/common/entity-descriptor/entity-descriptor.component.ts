import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-entity-descriptor',
	templateUrl: './entity-descriptor.component.html',
	styleUrls: ['./entity-descriptor.component.less'],
})
export class EntityDescriptorComponent {

	@Input() public entity: KeyValueEntity;

	public addEntry() {
		this.entity.push({ name: 'new entry', value: 'write something' });
	}

}

export type KeyValueEntity = Array<{ name: string; value: string }>;
