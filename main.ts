let p = 0
let dauerAus = 0
let beginnAus = false
let zuletztAus = 0
let dauerAn = 0
let zuletztAn = 0
let signalAn = false
let micWert = 0
let min = 0
let max = 0
let alleZeichen = "**ETIANMSURWDKGOHVF*L*PJBXCYZQ**"
let schwelleLang = 170
let neuerBuchstabe = 170
let neuesWort = 300
basic.forever(function () {
    max = 0
    min = 1023
    for (let i = 0; i <= 7; i++) {
        micWert = pins.analogReadPin(AnalogPin.MIC)
        if (max < micWert) {
            max = micWert
        }
        if (min > micWert) {
            min = micWert
        }
    }
    signalAn = max - min > 20
    if (signalAn) {
        zuletztAn = input.runningTime()
        dauerAn = zuletztAn - zuletztAus
        beginnAus = true
    } else {
        zuletztAus = input.runningTime()
        dauerAus = zuletztAus - zuletztAn
        if (beginnAus) {
            beginnAus = false
            if (dauerAn > schwelleLang) {
                p = 2 * p + 1
            } else {
                p = 2 * p
            }
        }
        if (dauerAus > neuerBuchstabe) {
            if (p > 1) {
                basic.showString(alleZeichen.charAt(p))
            }
            p = 1
        }
        if (dauerAus > neuesWort) {
            basic.clearScreen()
        }
    }
})
