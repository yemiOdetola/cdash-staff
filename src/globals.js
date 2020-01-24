import toaster from "toasted-notes";

const globals = {
    capitalize: function (str) {
        if (typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    base_url: 'http://159.89.85.116/v1',
    tokens: JSON.parse(localStorage.getItem('activationTokens')),
    createToast: function (text, timeLeft, position) {
        return toaster.notify(text, {
            position: position,
            duration: timeLeft
        });
    },
    trimSubtitle: function(str) {
        if(typeof str !== 'string' && str.length > 136) {
            return;
        }
        let substr = str.substring(0, 136)
        return `${substr}...`
    },
    trimSearch: function(str) {
        if(typeof str !== 'string' && str.length > 75) {
            return;
        }
        let substr = str.substring(0, 75)
        return `${substr} ...`
    },
    getFirstChar: function(string) {
        if(string && string.length) {
            return string.charAt(0).toUpperCase();
        } else {
            return 'X'
        }
    }
}

export default globals;