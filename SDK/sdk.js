(function (window) {
    let Perf = {};
    let key = "perf_client_id";
    let url = "https://127.0.0.1:3000/collect";

    Perf.init = function () {
        let clientIdIndex = document.cookie.split(";").findIndex(x => x.trim().startsWith(key))
        if (clientIdIndex < 0) {
            let guid = Math.random().toString(36).substring(2) + Date.now().toString(36)
            document.cookie = `${key}=${guid}`;
            window.addEventListener("unload", function log() {
                let navigation = performance.getEntriesByType('navigation')[0]
                let fcp = performance.getEntriesByType('paint')[1].startTime;
                let resources = [];
                performance.getEntriesByType('resource').forEach((resource) => {
                    resources.push({
                        /* Name */
                        "t": resource.name,
                        /* Type */
                        "e": resource.initiatorType,
                        /* Timing */
                        "c": resource.duration,
                        /* Size */
                        "h": resource.transferSize,
                    })
                });
                let data = JSON.stringify({
                    /* TTFB */
                    "t": navigation.responseStart - navigation.startTime,
                    /* DOM Load */
                    "r": performance.timing.domContentLoadedEventStart - performance.timing.navigationStart,
                    /* Load */
                    "e": navigation.responseStart - navigation.startTime,
                    /* First Content Paint */
                    "n": fcp,
                    /* Resources */
                    "d": resources,
                    /* Client Id */
                    "y": guid,
                    /* Date */
                    "o": new Date().getTime(),
                    /* URL */
                    "l": window.location.href
                });
                window.navigator.sendBeacon(url, data)
            });
        }
    };

    window.Perf = Perf;
})(window, undefined);