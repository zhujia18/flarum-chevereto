import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";
import addCheveretoPane from "./addCheveretoPane";

app.initializers.add('jasper-chevereto', app => {
    addCheveretoPane();
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('chevereto', {
            icon: 'fas fa-upload',
            label: app.translator.trans('jasper-chevereto.admin.permissions.upload'),
            permission: 'jasper.chevereto.upload'
        });
    });
});
