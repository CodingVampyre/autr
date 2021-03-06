import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-entity-descriptor',
	templateUrl: './entity-descriptor.component.html',
	styleUrls: ['./entity-descriptor.component.less'],
})
export class EntityDescriptorComponent {

	@Input() public entity: IKeyValueEntity[];
	@Output() public onContentEdited = new EventEmitter();

	public addEntry() {
		this.entity.push({ name: 'new entry', value: 'write something' });
	}

	public deleteEntry(index: number) {
		this.entity.splice(index, 1);
	}
}

export interface IKeyValueEntity { name: string; value: string; }
