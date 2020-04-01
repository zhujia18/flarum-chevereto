import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import CheveretoSetting from "./components/CheveretoSettingPage";

export default function () {
    app.routes['jasper-chevereto'] = {path: '/jasper/chevereto', component: CheveretoSetting.component()};
    app.extensionSettings['jasper-chevereto'] = () => m.route(app.route('jasper-chevereto'));
    extend(AdminNav.prototype, 'items', items => {
        items.add('jasper-chevereto', AdminLinkButton.component({
            href: app.route('jasper-chevereto'),
            icon: 'far fa-cloud-upload',
            children: 'Chevereto',
            description: app.translator.trans('jasper-chevereto.admin.AdminNav.description')
        }));
    });
}