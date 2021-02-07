var p = 0;
var q = 0;
var a = 0;
var x = 0;

var n = 0;
var m = 0;
var b = 0;
var y = 0;

var stage = 0;

var dialogBox;
var dialogText;
var leftItem;
var centerItem;
var rightItem;

var stage0;
var stage1;
var stage2;
var stage3;
var stage4;
var stage5;
var stage6;
var stage7;
var stage8;
var stage9;

var pField;
var qField;
var aField;
var xField;

var nCalc;
var nValue;
var mValue;
var aValue;
var yCalc;
var yValue;
var bValue;
var xValue;

window.onload = function () {
    dialogBox = document.getElementById('dialog');
    dialogText = document.getElementById('text');

    leftItem = document.getElementById('left');
    centerItem = document.getElementById('center');
    rightItem = document.getElementById('right');

    stage0 = document.getElementById('stage-0');
    stage1 = document.getElementById('stage-1');
    stage2 = document.getElementById('stage-2');
    stage3 = document.getElementById('stage-3');
    stage4 = document.getElementById('stage-4');
    stage5 = document.getElementById('stage-5');
    stage6 = document.getElementById('stage-6');
    stage7 = document.getElementById('stage-7');
    stage8 = document.getElementById('stage-8');
    stage9 = document.getElementById('stage-9');

    pField = document.getElementById('p-field');
    qField = document.getElementById('q-field');
    aField = document.getElementById('a-field');
    xField = document.getElementById('x-field');

    nCalc = document.getElementById('n-calc');
    nValue = document.getElementById('n-value');
    mValue = document.getElementById('m-value');
    aValue = document.getElementById('a-value');
    yCalc = document.getElementById('y-calc');
    yValue = document.getElementById('y-value');
    bValue = document.getElementById('b-value');
    xValue = document.getElementById('x-value');
}

function next(curButton) {
    switch (stage) {
        case 0:
            curButton.setAttribute('hidden', '');

            dialogText.textContent = 'Hallo! Mein Freund Bob möchte mir eine Nachricht schicken. Aber ich will nicht, dass jeder diese Nachricht lesen kann.';
            leftItem.removeAttribute('hidden');
            rightItem.removeAttribute('hidden');

            setTimeout(() => {
                centerItem.removeAttribute('hidden');

                dialogText.textContent = 'Dafür verwende ich am besten RSA. Zuerst muss ich mir 2 Primzahlen ausdenken.';
                stage0.removeAttribute('hidden');
            }, 10000);
            break;

        case 1:
            if (p == 0 || q == 0)
                return;

            curButton.setAttribute('hidden', '');

            pField.setAttribute('disabled', '');
            qField.setAttribute('disabled', '');

            n = p * q;
            m = (p - 1) * (q - 1);

            nCalc.textContent = '\\(n = p \\cdot q = ' + n + '\\)';
            mValue.textContent = '\\(m = (p - 1) \\cdot (q - 1) = ' + m + '\\)';
            MathJax.typeset();

            dialogText.textContent = 'Nun rechne ich mir die geheimen Anteile der Schlüssel aus.';
            stage1.removeAttribute('hidden');
            break;

        case 2:
            curButton.setAttribute('hidden', '');
            dialogText.textContent = 'Außerdem brauche ich noch den bekannten Teil der Schlüssel.';
            stage2.removeAttribute('hidden');
            break;

        case 3:
            if (a == 0)
                return;

            curButton.setAttribute('hidden', '');

            aField.setAttribute('disabled', '');

            nValue.textContent = '\\(n = ' + n + '\\)';
            aValue.textContent = '\\(a = ' + a + '\\)';
            MathJax.typeset();

            dialogText.textContent = 'Jetzt schicke ich Bob den öffentlichen Schlüssel. Der besteht aus dem geheimen Teil und dem bekannten Teil.';
            stage3.removeAttribute('hidden');
            break;

        case 4:
            curButton.setAttribute('hidden', '');
            dialogText.textContent = 'Bob bereitet nun seine Nachricht vor.';
            stage4.removeAttribute('hidden');
            break;

        case 5:
            if (x == 0)
                return;

            curButton.setAttribute('hidden', '');

            xField.setAttribute('disabled', '');

            y = Math.pow(x, a) % n;

            yCalc.textContent = '\\(y = x^a \\bmod n = ' + y + '\\)';
            yValue.textContent = '\\(y = ' + y + '\\)';
            MathJax.typeset();

            dialogText.textContent = 'Jetzt verschlüsselt Bob seine Nachricht mit dem öffentlichen Schlüssel.';
            stage5.removeAttribute('hidden');
            break;

        case 6:
            curButton.setAttribute('hidden', '');
            dialogText.textContent = 'Danach schickt er mir die verschlüsselte Nachricht.';
            stage6.removeAttribute('hidden');
            break;

        case 7:
            curButton.setAttribute('hidden', '');

            b = modInverse(a, m);

            bValue.textContent = '\\(b = a^{-1} \\bmod m = ' + b + '\\)';
            MathJax.typeset();

            dialogText.textContent = 'Zuletzt entschlüssle ich die Nachricht mit dem privaten Schlüssel. Der besteht auch aus dem bekannten Teil und aus dem anderen geheimen Teil.';
            stage7.removeAttribute('hidden');
            break;

        case 8:
            curButton.setAttribute('hidden', '');

            xValue.textContent = '\\(x = y^b \\bmod n = ' + (Math.pow(y, b) % n) + '\\)';
            MathJax.typeset();

            dialogText.textContent = 'Juhu! Es hat geklappt.';
            stage8.removeAttribute('hidden');
            break;

        case 9:
            curButton.setAttribute('hidden', '');
            dialogBox.style.display = 'none';
            stage9.removeAttribute('hidden');
            break;

        default:
            alert("No stage with number: " + stage)
            break;
    }

    stage++;
}

function getInput(elem) {
    var i = elem.value;
    switch (elem.id.substring(0, 1)) {
        case 'p':
            if (isPrime(i) && i != q) {
                p = i;
            } else {
                elem.value = p != 0 ? p : '';
            }

            break;

        case 'q':
            if (isPrime(i) && i != p) {
                q = i;
            } else {
                elem.value = q != 0 ? q : '';
            }

            break;

        case 'a':
            if (findGreatestCommonDevisor(i, m) == 1) {
                a = i;
            } else {
                elem.value = a != 0 ? a : '';
            }

            break;

        case 'x':
            if (i < n) {
                x = i;
            } else {
                elem.value = x != 0 ? x : '';
            }

            break;

        default:
            alert('Input not recognised: ' + elem.id)
            break;
    }

}

function isPrime(x) {
    for (var i = 2; i < x; i++) {
        if (x % i === 0)
            return false;
    }

    return x > 1;
}

function findGreatestCommonDevisor(x, y) {
    if (y == 0)
        return x;

    return findGreatestCommonDevisor(y, x % y);
};

function modInverse(a, m) {
    a = (a % m + m) % m

    if (!a || m < 2) {
        return NaN
    }

    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({
            a,
            b
        })
    }

    if (a !== 1) {
        return NaN
    }


    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}