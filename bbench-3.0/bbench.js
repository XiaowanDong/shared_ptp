/*
 * Copyright (c) 2011-2013 The Regents of The University of Michigan
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met: redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer;
 * redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution;
 * neither the name of the copyright holders nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Author: Anthony Gutierrez (atgutier@umich.edu)
 */


var bbGlobalSiteIndex = 0;
var bbInit = false;
var bbNumIters = 0;
var bbSiteURLs = [];

function generateSiteArray(numTimesToExecute) {
    var bbPath = document.location.pathname;
    var bbHome = "file://"
                 + bbPath.substr(0, bbPath.length - 1 - "index.html".length);


    var bbSites = [];
    var bbSiteNames = [];

    for (var i = 0; i < numTimesToExecute * bbSiteURLs.length;
         i += bbSiteURLs.length) {
        for (var j = 0; j < bbSiteURLs.length; j++) {
            bbSites[i+j] = bbHome + bbSiteURLs[j];
        }
    }

    for (var k = 0; k < bbSiteURLs.length; k++) {
        var tmpString = bbSiteURLs[k].substring(7);
        var siteName = tmpString.substring(0, tmpString.indexOf("/"));

        bbSiteNames[k] = siteName;
    }

    bbSites[i] = bbHome + "/results.html";

    if (typeof(Storage) !== "undefined") {
        sessionStorage['siteURLs'] = JSON.stringify(bbSites);
        sessionStorage['siteNames'] = JSON.stringify(bbSiteNames);
    } else {
        alert("Your browser does not support storage.");
    }
}


/* gets the URL parameters and removes from window href */
function getAndRemoveURLParams(windowURL, param) {
    var regexString = "(.*)(\\?)" + param + "(=)([0-9]+)(&)(.*)";
    var regex = new RegExp(regexString);
    var results = regex.exec(windowURL.value);

    if (results == null) {
        return "";
    } else {
        windowURL.value = results[1] + results[6];
        return results[4];
    }
}

/* gets the URL parameters */
function getURLParams(param) {
    var regexString = "(.*)(\\?)" + param + "(=)([0-9]+)(&)(.*)";
    var regex = new RegExp(regexString);
    var results = regex.exec(window.location.href);

    if (results == null)
        return "";
    else
        return results[4];
}

/* gets all the parameters */
function getAllParams() {
    var regexString = "(\\?.*)(\\?siteIndex=)([0-9]+)(&)";
    var regex = new RegExp(regexString);
    var results = regex.exec(window.location.href);

    if (results == null)
        return "";
    else
        return results[1];
}

/* start the test, simply go to site 1. */
function startTest(n, scrollDelay, num_y, pgDel) {
    bbInit = true;
    generateSiteArray(n);
    var bbInitSites = JSON.parse(sessionStorage['siteURLs']);

    siteTest(bbInitSites[0], bbGlobalSiteIndex, new Date().getTime(), "scrollSize="
             + num_y + "&?scrollDelay=" + scrollDelay + "&?pageDelay=" + pgDel
             + "&?iterations=" + n + "&?" + "StartPage");
}

/* jump to the next site */
function goToSite(site) {
    window.location.href = site;
}

/*
  the test we want to run on the site.
  for now, simply scroll to the bottom
  and jump to the next site. in the
  future we will want to do some more
  realistic browsing tests.
*/
function siteTest(nextSite, siteIndex, startTime, siteName) {
    var scrollDelay = 500;
    var pgDelay = 500;
    var verticalScroll = 500;

    siteIndex++;

    if (!bbInit) {
        scrollDelay = getURLParams("scrollDelay") - 0;
        pgDelay = getURLParams("pageDelay") - 0;
        verticalScroll = getURLParams("scrollSize") - 0;
    }

    scrollToBottom(0, verticalScroll, scrollDelay,
        function() {
            cur_time = new Date().getTime();
            load_time = (cur_time - startTime);
            setTimeout(
                function() {
                    goToSite(nextSite + "?" + siteName + "=" + load_time + "&"
                    + "?siteIndex=" + siteIndex + "&");
                }, pgDelay);
        }
    );
}

/*
  scroll to the bottom of the page in
  num_y pixel increments. may want to
  do some horizontal scrolling in the
  future as well.
*/
function scrollToBottom(num_x, num_y, scrollDelay, goToNextSiteFunc) {
    var diff = (document.body.scrollHeight - 0) - num_y * bbNumIters;

    ++bbNumIters;

    if (num_y == 0) {
	k();
    } else if (diff > num_y) {
            setTimeout(
                function() {
                    self.scrollBy(num_x, num_y);
                    scrollToBottom(num_x, num_y, scrollDelay, goToNextSiteFunc);
                }, scrollDelay);
    } else{
	goToNextSiteFunc();
    }
}
