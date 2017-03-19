import {View} from './view';
import Type = ts.Type;

export class ViewContainer {

    private views:View[] = [];

    public autoBind() {
        $('[data-bind]').each(() => {
            const view = require('./view/' + $(this).data('bind'));
            this.register(view);
        });
    }

    public register(view:Type) {
        this.views.push(new view);
    }

}