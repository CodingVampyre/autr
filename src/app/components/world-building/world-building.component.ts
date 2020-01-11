import { Component, OnInit, ViewChild } from '@angular/core';
import { WorldBuilderService } from '../../services/world-builder.service';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { v1 as UUID } from 'uuid';
import { IImageTag } from '../../data-models/image-tag.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-world-building',
	templateUrl: './world-building.component.html',
	styleUrls: ['./world-building.component.less'],
})
export class WorldBuildingComponent implements OnInit {

	// representation of the entities as imagTags to have lists
	/***/
	public characters: IImageTag[] = [];
	/***/
	public objects: IImageTag[] = [];
	/***/
	public places: IImageTag[] = [];

	/***/
	@ViewChild('entityDetailsComponent', { static: true, read: EntityDetailsComponent })
	public entityDetailsComponent: EntityDetailsComponent;

	/***/
	private currentlySelectedName: string;
	private currentlySelectedId: string;

	/**
	 *
	 * @param worldBuilderService
	 * @param router
	 * @param route
	 */
	constructor(
		public worldBuilderService: WorldBuilderService,
		public router: Router,
		public route: ActivatedRoute,
	) { }

	public ngOnInit() {
		this.updateLists();
	}

	/** creates a new character and sets thee focus on editing that one */
	public onClickCreateCharacter(newCharacterName: string): void {
		const newCharacterId = UUID();
		const categoryTemplate = [
			{ category: { id: 'appearance', text: 'appearance' }, entity: [] },
			{ category: { id: 'mindset', text: 'mindset' }, entity: [] },
			{ category: { id: 'story', text: 'story' }, entity: [] },
		];

		this.worldBuilderService.createCharacter({
			id: newCharacterId,
			name: newCharacterName,
			imgUrl: 'http://nightmare.mit.edu/static/faces/4a58b263dff079c4c6f23a0ad8bba719.png',
			data: categoryTemplate,
		});

		this.updateLists();
	}

	/** creates a new place and sets thee focus on editing that one */
	public onClickCreatePlace(newPlaceName: string): void {
		const newPlaceId = UUID();
		const categoryTemplate = [
			{ category: { id: 'lore', text: 'lore' }, entity: [] },
			{ category: { id: 'appearance', text: 'appearance' }, entity: [] },
			{ category: { id: 'story', text: 'story' }, entity: [] },
		];

		this.worldBuilderService.createPlace({
			id: newPlaceId,
			name: newPlaceName,
			imgUrl: 'http://nightmare.mit.edu/static/faces/4a58b263dff079c4c6f23a0ad8bba719.png',
			data: categoryTemplate,
		});

		this.updateLists();
	}

	/** creates a new place and sets thee focus on editing that one */
	public onClickCreateObject(newObjectName: string): void {
		const newObjectId = UUID();
		const categoryTemplate = [
			{ category: { id: 'lore', text: 'lore' }, entity: [] },
			{ category: { id: 'appearance', text: 'appearance' }, entity: [] },
			{ category: { id: 'story', text: 'story' }, entity: [] },
		];

		this.worldBuilderService.createObject({
			id: newObjectId,
			name: newObjectName,
			imgUrl: 'http://nightmare.mit.edu/static/faces/4a58b263dff079c4c6f23a0ad8bba719.png',
			data: categoryTemplate,
		});

		this.updateLists();
	}

	public deleteCharacter() {
		const id = this.currentlySelectedId;
		this.currentlySelectedId = undefined;
		this.currentlySelectedName = undefined;
		// close details panel
		this.entityDetailsComponent.close();
		// delete out of list
		this.worldBuilderService.deleteCharacter(id);
		// update list
		this.updateLists();
	}

	public async navigateToWritingPanel() {
		const routerId = this.route.snapshot.paramMap.get('novelId');
		await this.router.navigate(['writing-board', routerId]);
	}

	/**
	 *
	 * @param characterId
	 */
	public activateCharacter(characterId: string) {
		const character = this.worldBuilderService.retrieveCharacter(characterId);
		if (character !== undefined) {

			// set metadata
			this.currentlySelectedName = character.name;
			this.currentlySelectedId = character.id;
			this.entityDetailsComponent.passContents(character.data);

		}
	}

	/**
	 *
	 * @param placeId
	 */
	public activatePlace(placeId: string) {
		const place = this.worldBuilderService.retrievePlace(placeId);
		if (place !== undefined) {

			// set metadata
			this.currentlySelectedName = place.name;
			this.currentlySelectedId = place.id;
			this.entityDetailsComponent.passContents(place.data);

		}
	}

	/**
	 *
	 * @param objectId
	 */
	public activateObject(objectId: string) {
		const object = this.worldBuilderService.retrieveObject(objectId);
		if (object !== undefined) {

			// set metadata
			this.currentlySelectedName = object.name;
			this.currentlySelectedId = object.id;
			this.entityDetailsComponent.passContents(object.data);

		}
	}

	private updateLists() {
		this.characters = this.worldBuilderService.characters.map((character) => {
			return { id: character.id, text: character.name, imgUrl: character.imgUrl };
		});
		this.places = this.worldBuilderService.places.map((place) => {
			return { id: place.id, text: place.name, imgUrl: place.imgUrl };
		});
		this.objects = this.worldBuilderService.objects.map((object) => {
			return { id: object.id, text: object.name, imgUrl: object.imgUrl };
		});
	}
}
