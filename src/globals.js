import toaster from "toasted-notes";

const globals = {
    capitalize: function (str) {
        if (typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    base_url: 'https://api.cdash.com.ng/v1',
    tokens: JSON.parse(localStorage.getItem('activationTokens')),
    createToast: function (text, timeLeft, position) {
        return toaster.notify(text, {
            position: position,
            duration: timeLeft
        });
    },
    formatDate: function (date) {
        if (date) {
            let dDate = new Date(date);
            let newDate = dDate.getDate() + "/" + parseInt(dDate.getMonth() + 1) + "/" + dDate.getFullYear();
            return newDate;
        } else {
            return 'n/A';
        }
    },
    trimName: function (str) {
        if (typeof str !== 'string' || str.length < 14) {
            return str;
        }
        let substr = str.substring(0, 14)
        return `${substr}...`
    },
    trimSubtitle: function (str) {
        if (typeof str !== 'string' || str.length < 136) {
            return str;
        }
        let substr = str.substring(0, 136)
        return `${substr}...`
    },
    trimSearch: function (str) {
        if (typeof str !== 'string' || str.length < 75) {
            return str;
        }
        let substr = str.substring(0, 75)
        return `${substr} ...`
    },
    trimTr: function (str) {
        if (typeof str !== 'string') {
            return;
        }
        if (str.length < 45) {
            return str;
        }
        let substr = str.substring(0, 45)
        return `${substr} ...`
    },
    getFirstChar: function (string) {
        if (string && string.length) {
            return string.charAt(0).toUpperCase();
        } else {
            return 'X'
        }
    }
}

export default globals;