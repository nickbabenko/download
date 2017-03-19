import * as $ from 'jquery';

export abstract class View {

    abstract get selector():string;

    get events():{ [selector:string]: { [event:string]:Function } } {
        return {};
    }

    constructor() {
        this.bindEvents();
    }

    private bindEvents() {
        let events = this.events;
        let body = $('body');
        for (let selector in events) {
            let elementEvents = events[selector];
            for (let event in elementEvents) {
                let handler = elementEvents[event];
                body.on(event, selector, (e:JQueryEventObject) => handler(e));
            }
        }
    }

}