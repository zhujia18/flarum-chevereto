import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';

export default class UploadPage extends Component {

    init() {
        this.loading = false;
        this.fields = [
            'src',
            'url',
            'autoinsert',
            'lang',
        ];
        const settings = app.data.settings;
        this.settingsPrefix = 'jasper.chevereto';
        this.values = {};
        this.fields.forEach(key =>
            this.values[key] = m.prop(settings[this.addPrefix(key)])
        );
    }

    view() {
        return [
            m('div', { className: 'CheveretoPage' }, [
                m('div', { className: 'container' }, [
                    m('form', { onsubmit: this.onsubmit.bind(this) }, [
                        m('fieldset', {
                            className: 'CheveretoPage-Setting',
                        }, [
                            m('legend', {}, app.translator.trans('jasper-chevereto.admin.setting.title')),
                            m('label', {}, app.translator.trans('jasper-chevereto.admin.setting.src')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.src() || '',
                                oninput: m.withAttr('value', this.values.src)
                            }),
                            m('label', {}, app.translator.trans('jasper-chevereto.admin.setting.url')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.url() || '',
                                oninput: m.withAttr('value', this.values.url)
                            }),
                            m('label', {}, app.translator.trans('jasper-chevereto.admin.setting.auto-insert')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.autoinsert() || '',
                                oninput: m.withAttr('value', this.values.autoinsert)
                            }),
                            m('label', {}, app.translator.trans('jasper-chevereto.admin.setting.lang')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.lang() || '',
                                oninput: m.withAttr('value', this.values.lang)
                            }),
                        ]),
                        Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('jasper-chevereto.admin.buttons.save'),
                            loading: this.loading,
                            disabled: !this.changed()
                        }),
                    ])
                ])
            ])
        ];
    }

    changed() {
        var fieldsCheck = this.fields.some(
            key => this.values[key]() !== app.data.settings[this.addPrefix(key)]);
        return fieldsCheck;
    }

    onsubmit(e) {
        e.preventDefault();
        if (this.loading) return;
        this.loading = true;
        app.alerts.dismiss(this.successAlert);
        const settings = {};
        this.fields.forEach(key => settings[this.addPrefix(key)] = this.values[key]());
        saveSettings(settings)
            .then(() => {
                app.alerts.show(this.successAlert = new Alert({
                    type: 'success',
                    children: app.translator.trans('core.admin.basics.saved_message')
                }));
            })
            .catch(() => {
            })
            .then(() => {
                this.loading = false;
                m.redraw();
            });
    }

    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}
