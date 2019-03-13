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


// default number of iterations
var numIters = 5;
var pageDelay = 0;
var scrollDelay = 0;
var scrollSize = 500;


// configure the number of iterations
function setIters() {
    numIters = document.config_form.numIterations.value - 0;

    if (numIters <= 0)
        numIters = 1;
}

function numItersDec() {
    if (numIters > 1)
        numIters = eval(numIters - 1);
    else
        numIters = 1;

    return numIters;
}

function numItersInc() {
    if (numIters <= 0)
        numIters = 1;
    else
        numIters = eval(numIters + 1);

    return numIters;
}

// configure the scroll delay
function setScrollDelay() {
    scrollDelay = document.config_form.scrollDelay.value - 0;

    if (scrollDelay < 0)
        scrollDelay = 0;
}

function scrollDelayDec() {
    if (scrollDelay >= 100)
        scrollDelay = eval(scrollDelay - 100);
    else
        scrollDelay = 0;

    return scrollDelay;
}

function scrollDelayInc() {
    if (scrollDelay <= 0)
        scrollDelay = 100;
    else
        scrollDelay = eval(scrollDelay + 100);

    return scrollDelay;
}

// configure the scroll size
function setScrollSize() {
    scrollSize = document.config_form.scrollSize.value - 0;

    if (scrollSize < 0)
        scrollSize = 0;
}

function scrollSizeDec() {
    if (scrollSize > 100)
        scrollSize = eval(scrollSize - 100);
    else
        scrollSize = 0;

    return scrollSize;
}

function scrollSizeInc() {
    if (scrollSize <= 0)
        scrollSize = 100;
    else
        scrollSize = eval(scrollSize + 100);

    return scrollSize;
}

// configure the page delay
function setPageDelay() {
    pageDelay = document.config_form.pageDelay.value - 0;

    if (pageDelay <= 0)
        pageDelay = 0;
}

function pageDelayDec() {
    if (pageDelay >= 100)
        pageDelay = eval(pageDelay - 100);
    else
        pageDelay = 0;

    return pageDelay;
}

function pageDelayInc() {
    if (pageDelay <= 0)
        pageDelay = 100;
    else
        pageDelay = eval(pageDelay + 100);

    return pageDelay;
}
