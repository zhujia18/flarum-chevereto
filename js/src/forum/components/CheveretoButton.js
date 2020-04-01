import Component from 'flarum/Component';
import app from 'flarum/app';

export default class CheveretoButton extends Component {
    init() {
        this.fields = [
            'src',
            'url',
            'autoinsert',
            'lang',
        ];
        this.settingsPrefix = 'jasper.chevereto';
        this.values = {};
        this.fields.forEach(key =>
            this.values[key] = app.forum.attribute(this.addPrefix(key))
        );
    }

    view() {
        return m('div', {
            id: "chevereto-pup-container"
        }, [m('div', {
            id: "chevereto-mark"
        })]);
    }

    loadChevereto() {
        var cheveretoBtn = document.getElementsByClassName("chevereto-pup-button")[0];
        if (cheveretoBtn) {
            return;
        }
        if (document.getElementById('chevereto')) {
            return;
        }
        var script = document.createElement("script");
        script.id = ('chevereto');
        script.type = "text/javascript";
        script.async = true;
        script.setAttribute('data-sibling-pos', 'after');
        script.setAttribute('data-sibling', '#chevereto-mark');
        if (this.values['src']) {
            script.src = this.values['src'];
        }
        if (this.values['url']) {
            script.setAttribute('data-url', this.values['url']);
        }
        if (this.values['lang']) {
            script.setAttribute('data-lang', this.values['lang']);
        }
        if (this.values['autoinsert']) {
            script.setAttribute('data-auto-insert', this.values['autoinsert']);
        }
        document.head.appendChild(script);
    }

    unloadChevereto() {
        var cheveretoBtn = document.getElementsByClassName("chevereto-pup-button")[0];
        if (cheveretoBtn) {
            return;
        }
        var script = document.getElementById('chevereto');
        if (script) {
            document.head.removeChild(script);
        }
    }

    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}