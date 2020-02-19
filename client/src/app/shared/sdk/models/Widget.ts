/* tslint:disable */

declare var Object: any;
export interface WidgetInterface {
  "id"?: number;
  "title": string;
  "date": Date;
  "price": number;
  "description": string;
}

export class Widget implements WidgetInterface {
  "id": number;
  "title": string;
  "date": Date;
  "price": number;
  "description": string;
  constructor(data?: WidgetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Widget`.
   */
  public static getModelName() {
    return "Widget";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Widget for dynamic purposes.
  **/
  public static factory(data: WidgetInterface): Widget{
    return new Widget(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Widget',
      plural: 'Widgets',
      path: 'Widgets',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "title": {
          name: 'title',
          type: 'string',
          default: 'Title'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "price": {
          name: 'price',
          type: 'number',
          default: 1
        },
        "description": {
          name: 'description',
          type: 'string',
          default: 'Description'
        },
      },
      relations: {
      }
    }
  }
}
