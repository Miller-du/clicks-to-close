(function () {
    "use strict";

    if (String.prototype.format == undefined) {
        let string_format_V2_0_2 = function () {
            let args = arguments;
            let cnt = 0;
            return this.match(/{(\d+)}/g) == null && this.match(/{}/g) != null ?
                this.replace(/{}/g, (match) => {
                    return typeof args[cnt] != 'undefined' ? args[cnt++] : match;
                }) :
                this.replace(/{(\d+)}/g, (match, number) => {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
        };
        String.prototype.format = string_format_V2_0_2;
    } else {
        if (String.prototype.format.name != 'string_format_V2_0_2') {
            throw 'String.prototype.format defined.';
        }
    }
})();

function nclickEvent(n, interval, dom, fn) {    
    "use strict";

    n = parseInt(n) < 1 ? 1 : parseInt(n);
    let count = 0, lastTime = 0;
    let handler = (event) => {
        let currentTime = new Date().getTime();
        count = (currentTime - lastTime) < interval ? count + 1 : 0;
        console.log('click event: last since {} ms;\nconsecutive {} times.\n'.format(currentTime - lastTime, count + 1));
        lastTime = new Date().getTime();
        if (count >= n - 1) {
            fn(event, n);
            count = 0;
        }
    };
    dom.addEventListener('click', handler);
}

(function () {
    "use strict";
  
    nclickEvent(4, 250, document, (_event, n) => {
        console.log(n + 'click');
        window.opener = null;
        window.open('', '_self');
        setTimeout(() => window.close(), 1);
    });
})();
