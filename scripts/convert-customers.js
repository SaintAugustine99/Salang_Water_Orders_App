const fs = require('fs');

// Manually enter your customers from the PDF
const customersData = [

        {
          id: "01-01",
          name: "JAMES THAMAINI",
          phone: "0703378720",
          balance: 151,
          group: "01"
        },
        {
          id: "01-02",
          name: "MARIA CHERONO",
          phone: "0722287105",
          balance: 262,
          group: "01"
        },
        {
          id: "01-03",
          name: "SALIM MOHAMMED",
          phone: "0724354656",
          balance: 143,
          group: "01"
        },
        {
          id: "01-04",
          name: "DANIEL GICHURU",
          phone: "0722319513",
          balance: 278,
          group: "01"
        },
        {
          id: "01-05",
          name: "PROTUS WAMALWA",
          phone: "0725164240",
          balance: 458,
          group: "01"
        },
        {
          id: "01-06",
          name: "EDWIN OKONG'O",
          phone: "0724449356",
          balance: 90,
          group: "01"
        },
        {
          id: "01-08",
          name: "PATROBER SEUREI",
          phone: "0722831203",
          balance: 779,
          group: "01"
        },
        {
          id: "01-09",
          name: "ESTHER MURATHE",
          phone: "0727746721",
          balance: 192,
          group: "01"
        },
        {
          id: "01-10",
          name: "SAMSON GATWEKU",
          phone: "0722889963",
          balance: 262,
          group: "01"
        },
        {
          id: "01-11",
          name: "DAVID KOOME",
          phone: "0722762232",
          balance: 1078,
          group: "01"
        },
        {
          id: "01-12",
          name: "PAUL WANJOHI",
          phone: "0720534722",
          balance: 43,
          group: "01"
        },
        {
          id: "01-13",
          name: "DENNIS ONYARU",
          phone: "0713743335",
          balance: 782,
          group: "01"
        },
        {
          id: "01-14",
          name: "JOSEPH GITUMA",
          phone: "0722900032",
          balance: 78,
          group: "01"
        },
        {
          id: "01-15",
          name: "SUSAN WAWERU",
          phone: "0726757511",
          balance: 545,
          group: "01"
        },
        {
          id: "01-16",
          name: "JEREMIAH KURIA",
          phone: "0792182718",
          balance: 841,
          group: "01"
        },
        {
          id: "01-17",
          name: "JOHN MUNORU",
          phone: "0721852154",
          balance: 56,
          group: "01"
        },
        {
          id: "01-18",
          name: "STELLA NG'ETICH",
          phone: "0722457616",
          balance: 868,
          group: "01"
        },
        {
          id: "01-19",
          name: "MONICA MUTHONI",
          phone: "0726960650",
          balance: 257,
          group: "01"
        },
        {
          id: "01-20",
          name: "ROSE KIPYEGO",
          phone: "0721324866",
          balance: 8,
          group: "01"
        },
        {
          id: "01-21",
          name: "MARY AUMA",
          phone: "0714391814",
          balance: 478,
          group: "01"
        },
        {
          id: "01-22",
          name: "MERCY MWANGI",
          phone: "0721808979",
          balance: 749,
          group: "01"
        },
        {
          id: "01-23",
          name: "CHARLES KIEMA",
          phone: "0708932645",
          balance: 217,
          group: "01"
        },
        {
          id: "01-24",
          name: "STIVE MULEI",
          phone: "0724128075",
          balance: 88,
          group: "01"
        },
        {
          id: "01-25",
          name: "SAMUEL JUMA",
          phone: "0722527695",
          balance: 190,
          group: "01"
        },
        {
          id: "01-26",
          name: "MAGDALENE NJERI",
          phone: "0722375883",
          balance: 44,
          group: "01"
        },
        {
          id: "01-27",
          name: "JOSEPH KIHATO",
          phone: "0722722874",
          balance: 110,
          group: "01"
        },
        {
          id: "01-28",
          name: "ANTHONY NGONDI",
          phone: "0711375586",
          balance: 314,
          group: "01"
        },
        {
          id: "01-29",
          name: "CAREY MUGADI",
          phone: "0722277155",
          balance: 210,
          group: "01"
        },
        {
          id: "01-30",
          name: "BENARD KABERIA",
          phone: "0723552667",
          balance: 148,
          group: "01"
        },
        {
          id: "01-31",
          name: "PATRICK MUTURI",
          phone: "0725819631",
          balance: 307,
          group: "01"
        },
        {
          id: "01-32",
          name: "DALMUS M CHELIMO",
          phone: "0722103499",
          balance: 371,
          group: "01"
        },
        {
          id: "01-33",
          name: "ROSELINE KIMINGICHI",
          phone: "0727488391",
          balance: 603,
          group: "01"
        },
        {
          id: "01-34",
          name: "CHARLES LANGAT",
          phone: "0720266466",
          balance: 86,
          group: "01"
        },
        {
          id: "01-35",
          name: "CHARLES ACHOKO",
          phone: "0722910151",
          balance: 763,
          group: "01"
        },
        {
          id: "01-36",
          name: "PHILIP MAVUTI",
          phone: "0715389346",
          balance: 80,
          group: "01"
        },
        {
          id: "01-37",
          name: "ZACHAEURS NDETO",
          phone: "0723948152",
          balance: 218,
          group: "01"
        },
        {
          id: "01-38",
          name: "HELLEN MUTHUNGU",
          phone: "0722338409",
          balance: 338,
          group: "01"
        },
        {
          id: "01-39",
          name: "MERCY WAMBUI",
          phone: "0726985817",
          balance: 176,
          group: "01"
        },
        {
          id: "01-40",
          name: "KENNETH WARUI",
          phone: "0720921068",
          balance: 1201,
          group: "01"
        },
        {
          id: "01-41",
          name: "PETER MBURU",
          phone: "0721850698",
          balance: 259,
          group: "01"
        },
        {
          id: "01-42",
          name: "DOMINIC THINJI",
          phone: "0722468611",
          balance: 21,
          group: "01"
        },
        {
          id: "01-43",
          name: "SAMMY KIPKONGA",
          phone: "0722612619",
          balance: 253,
          group: "01"
        },
        {
          id: "01-44",
          name: "JOSEPH ASWETO",
          phone: "0725118023",
          balance: 96,
          group: "01"
        },
        {
          id: "01-45",
          name: "STEPHEN MALECHE",
          phone: "0728714470",
          balance: 201,
          group: "01"
        },
        {
          id: "02-01",
          name: "JOSEPH NJORORO",
          phone: "0720237617",
          balance: 48,
          group: "02"
        },
        {
          id: "02-02",
          name: "SAMUEL KIBURI",
          phone: "0722403285",
          balance: 706,
          group: "02"
        },
        {
          id: "02-03",
          name: "JOSHUA MUTUA",
          phone: "0721315088",
          balance: 206,
          group: "02"
        },
        {
          id: "02-04",
          name: "PETER MUSAU",
          phone: "0722265445",
          balance: 403,
          group: "02"
        },
        {
          id: "02-05",
          name: "AGNES OKEYO",
          phone: "0722887365",
          balance: 1159,
          group: "02"
        },
        {
          id: "02-06",
          name: "MONICAH WANJIRU",
          phone: "0722814815",
          balance: 18,
          group: "02"
        },
        {
          id: "02-07",
          name: "DANIEL MOKORO",
          phone: "0721584259",
          balance: 485,
          group: "02"
        },
        {
          id: "02-08",
          name: "PAUL WAWERU",
          phone: "0717281037",
          balance: 2405,
          group: "02"
        },
        {
          id: "02-09",
          name: "MARTIN MUREMI",
          phone: "0720725223",
          balance: 520,
          group: "02"
        },
        {
          id: "02-10",
          name: "ABRAHAM ONDARA",
          phone: "0711383743",
          balance: 379,
          group: "02"
        },
        {
          id: "02-11",
          name: "EVA ADEKE",
          phone: "0710271300",
          balance: 257,
          group: "02"
        },
        {
          id: "02-12",
          name: "SALOME MUTINDA",
          phone: "0724499523",
          balance: 2478,
          group: "02"
        },
        {
          id: "02-13",
          name: "LUCAS NYAMILA OWITI",
          phone: "0724235152",
          balance: 1351,
          group: "02"
        },
        {
          id: "02-14",
          name: "IMMACULATE OYOO",
          phone: "0722312711",
          balance: 951,
          group: "02"
        },
        {
          id: "02-15",
          name: "JOSEPH NJORORO 2",
          phone: "0720655339",
          balance: 191,
          group: "02"
        },
        {
          id: "02-16",
          name: "ELIJAH AKUNGA",
          phone: "0701114028",
          balance: 460,
          group: "02"
        },
        {
          id: "02-17",
          name: "EVANS OCHIENG",
          phone: "0723174460",
          balance: 497,
          group: "02"
        },
        {
          id: "02-18",
          name: "SHADRACK OMBATI",
          phone: "0790260981",
          balance: 219,
          group: "02"
        },
        {
          id: "03-01",
          name: "MESHACK KAWINZI",
          phone: "0721921695",
          balance: 896,
          group: "03"
        },
        {
          id: "03-02",
          name: "SHEM OYUGI",
          phone: "0725055871",
          balance: 212,
          group: "03"
        },
        {
          id: "03-03",
          name: "RODGERS MBURA",
          phone: "0722287279",
          balance: 2701,
          group: "03"
        },
        {
          id: "03-04",
          name: "BETH MAJAU",
          phone: "0721347637",
          balance: 1357,
          group: "03"
        },
        {
          id: "03-05",
          name: "JACQUELINE WACHIRA",
          phone: "0725631435",
          balance: 631,
          group: "03"
        },
        {
          id: "03-06",
          name: "GLADYS WANGUI",
          phone: "0718303374",
          balance: 393,
          group: "03"
        },
        {
          id: "03-07",
          name: "KENNEDY ONYANGO",
          phone: "0720724807",
          balance: 617,
          group: "03"
        },
        {
          id: "03-08",
          name: "HUNDSON OGECHI",
          phone: "0722806511",
          balance: 750,
          group: "03"
        },
        {
          id: "03-09",
          name: "EUNICE NYAMBURA1",
          phone: "0725070285",
          balance: 240,
          group: "03"
        },
        {
          id: "03-10",
          name: "DAVID MOCHAMA",
          phone: "0722329388",
          balance: 10,
          group: "03"
        },
        {
          id: "03-11",
          name: "GERALD MWANIKI",
          phone: "0723835083",
          balance: 313,
          group: "03"
        },
        {
          id: "03-12",
          name: "STEPHEN KAMAU",
          phone: "0728121842",
          balance: 458,
          group: "03"
        },
        {
          id: "03-13",
          name: "DANIEL KIJUKI",
          phone: "0722840470",
          balance: 608,
          group: "03"
        },
        {
          id: "03-14",
          name: "LUCAS JARENGA",
          phone: "0723736180",
          balance: 186,
          group: "03"
        },
        {
          id: "03-15",
          name: "CHRISTINE OCHINO",
          phone: "0722342605",
          balance: 14,
          group: "03"
        },
        {
          id: "03-16",
          name: "EUNICE NYAMBURA 2",
          phone: "0726919744",
          balance: 432,
          group: "03"
        },
        {
          id: "03-17",
          name: "MOSES KINYUA",
          phone: "0721954575",
          balance: 478,
          group: "03"
        },
        {
          id: "03-18",
          name: "MARGARET MASINDE",
          phone: "0722562721",
          balance: 141,
          group: "03"
        },
        {
          id: "03-19",
          name: "MARY WANJIRU",
          phone: "0727466743",
          balance: 179,
          group: "03"
        },
        {
          id: "03-20",
          name: "JAMES MWANGI",
          phone: "0723884571",
          balance: 136,
          group: "03"
        },
        {
          id: "03-21",
          name: "MOSES NGILA",
          phone: "0722627758",
          balance: 1283,
          group: "03"
        },
        {
          id: "03-22",
          name: "GODWIN WAWERU",
          phone: "0721340003",
          balance: 339,
          group: "03"
        },
        {
          id: "03-23",
          name: "JOHN GUCHU",
          phone: "0723812829",
          balance: 15,
          group: "03"
        },
        {
          id: "03-24",
          name: "SUSAN IKENGA",
          phone: "0720245806",
          balance: 1949,
          group: "03"
        },
        {
          id: "03-25",
          name: "STEPHEN MWANGI",
          phone: "0722573679",
          balance: 440,
          group: "03"
        },
        {
          id: "03-26",
          name: "WILSON MAINA",
          phone: "0700745212",
          balance: 197,
          group: "03"
        },
        {
          id: "03-27",
          name: "MERCY KABUCHU",
          phone: "0720563355",
          balance: 606,
          group: "03"
        },
        {
          id: "03-28",
          name: "TABITHA WANJIKU",
          phone: "0721795142",
          balance: 313,
          group: "03"
        },
        {
          id: "03-29",
          name: "ZIPPORAH MUTUKU",
          phone: "0723443688",
          balance: 1192,
          group: "03"
        },
        {
          id: "03-30",
          name: "NANCY KAGENDO",
          phone: "0721273803",
          balance: 313,
          group: "03"
        },
        {
          id: "03-31",
          name: "EDWARD MOGAKA",
          phone: "0723632844",
          balance: 821,
          group: "03"
        },
        {
          id: "03-32",
          name: "SAMUEL KAMAU",
          phone: "0720775289",
          balance: 40,
          group: "03"
        },
        {
          id: "03-33",
          name: "STEPHEN KIMANI",
          phone: "0719130024",
          balance: 328,
          group: "03"
        },
        {
          id: "03-34",
          name: "PAUL MUCHIRA",
          phone: "0720694416",
          balance: 103,
          group: "03"
        },
        {
          id: "03-35",
          name: "JOHN MWATU",
          phone: "0722375864",
          balance: 1403,
          group: "03"
        },
        {
          id: "03-36",
          name: "PATRICIA NYAGUTHII",
          phone: "0722358934",
          balance: 300,
          group: "03"
        },
        {
          id: "03-37",
          name: "JAMES OPIKO",
          phone: "0724111495",
          balance: 355,
          group: "03"
        },
        {
          id: "03-38",
          name: "ANNE LIKODIO",
          phone: "0710931712",
          balance: 537,
          group: "03"
        },
        {
          id: "03-39",
          name: "GLADGYS WANGUI 2",
          phone: "0718303374",
          balance: 220,
          group: "03"
        },
        {
          id: "03-40",
          name: "JOSEPH KAGIRI",
          phone: "0721857310",
          balance: 173,
          group: "03"
        },
        {
          id: "03-41",
          name: "JOHN OKELLO",
          phone: "0722223314",
          balance: 219,
          group: "03"
        },
        {
          id: "03-42",
          name: "GEORGE OSIRI",
          phone: "0728133470",
          balance: 33,
          group: "03"
        },
        {
          id: "03-43",
          name: "CATHERINE NYAGA",
          phone: "0722822557",
          balance: 513,
          group: "03"
        },
        {
          id: "03-44",
          name: "JANE MUCHIRI",
          phone: "0727851610",
          balance: 6,
          group: "03"
        },
        {
          id: "03-45",
          name: "JOSPHINE OUKO",
          phone: "0723155139",
          balance: 44,
          group: "03"
        },
        {
          id: "03-46",
          name: "CATHRINE",
          phone: "0702093091",
          balance: 21,
          group: "03"
        },
        {
          id: "04-01",
          name: "DANIEL WAIHENYA",
          phone: "0720618415",
          balance: 300,
          group: "04"
        },
        {
          id: "04-02",
          name: "PAUL NJUGUNA",
          phone: "0722925933",
          balance: 173,
          group: "04"
        },
        {
          id: "04-03",
          name: "GEOFFREY ITELA",
          phone: "0722657111",
          balance: 957,
          group: "04"
        },
        {
          id: "04-04",
          name: "PRISCILLA KAGENDO",
          phone: "0722698808",
          balance: 2287,
          group: "04"
        },
        {
          id: "04-05",
          name: "LEO EVANS",
          phone: "07259229077",
          balance: 143,
          group: "04"
        },
        {
          id: "04-06",
          name: "MARGARET CHOMBO",
          phone: "0710734614",
          balance: 182,
          group: "04"
        },
        {
          id: "04-07",
          name: "CLIFFORD ARITA",
          phone: "0728333058",
          balance: 456,
          group: "04"
        },
        {
          id: "04-08",
          name: "JACINTA MWIKALI",
          phone: "0721677931",
          balance: 320,
          group: "04"
        },
        {
          id: "04-09",
          name: "AMOS WANDETO",
          phone: "0722630643",
          balance: 472,
          group: "04"
        },
        {
          id: "04-10",
          name: "AYUB MOHAMMED",
          phone: "0722236452",
          balance: 1258,
          group: "04"
        },
        {
          id: "04-11",
          name: "HERMAN OCHIENG",
          phone: "0721841099",
          balance: 181,
          group: "04"
        },
        {
          id: "04-12",
          name: "VALARIE ACHIENG",
          phone: "0723587602",
          balance: 539,
          group: "04"
        },
        {
          id: "04-13",
          name: "JACINTA RUGURU",
          phone: "0720429424",
          balance: 220,
          group: "04"
        },
        {
          id: "04-14",
          name: "THOMAS OBIERO",
          phone: "0720343805",
          balance: 437,
          group: "04"
        },
        {
          id: "04-15",
          name: "PASTOR WALTER",
          phone: "0725006514",
          balance: 364,
          group: "04"
        },
        {
          id: "04-16",
          name: "TINA OJUKA",
          phone: "0722768864",
          balance: 218,
          group: "04"
        },
        {
          id: "04-17",
          name: "ROBERT MARITIM",
          phone: "0722299609",
          balance: 265,
          group: "04"
        },
        {
          id: "04-18",
          name: "LUCY MUTHONI",
          phone: "0724819554",
          balance: 1244,
          group: "04"
        },
        {
          id: "04-19",
          name: "ELIJAH OCHOKI",
          phone: "0722486906",
          balance: 785,
          group: "04"
        },
        {
          id: "04-20",
          name: "PETER ODIDI",
          phone: "0720845614",
          balance: 811,
          group: "04"
        },
        {
          id: "04-21",
          name: "JACOB ANUNDA",
          phone: "0700848046",
          balance: 26,
          group: "04"
        },
        {
          id: "04-22",
          name: "ROSE KAHARIRI",
          phone: "0721464249",
          balance: 474,
          group: "04"
        },
        {
          id: "04-23",
          name: "CHRISTINE NDUNGU",
          phone: "0722603780",
          balance: 769,
          group: "04"
        },
        {
          id: "04-24",
          name: "SAMUEL ONDATI",
          phone: "0723073816",
          balance: 649,
          group: "04"
        },
        {
          id: "04-25",
          name: "GERALD SEGERA",
          phone: "0724700059",
          balance: 68,
          group: "04"
        },
        {
          id: "04-26",
          name: "JANNIS KARIMI",
          phone: "0727015689",
          balance: 246,
          group: "04"
        },
        {
          id: "04-27",
          name: "EVANS NYACHIEO",
          phone: "0722760976",
          balance: 1275,
          group: "04"
        },
        {
          id: "04-28",
          name: "GEORGE MACHOOKA",
          phone: "0722653478",
          balance: 1270,
          group: "04"
        },
        {
          id: "04-29",
          name: "MERCY KARIMI",
          phone: "0722282978",
          balance: 1486,
          group: "04"
        },
        {
          id: "04-30",
          name: "KEPHA MAGONYA",
          phone: "0720731468",
          balance: 491,
          group: "04"
        },
        {
          id: "04-31",
          name: "EDNA KASUNI",
          phone: "0710924117",
          balance: 63,
          group: "04"
        },
        {
          id: "04-32",
          name: "ELIJAH KIAGO",
          phone: "0727922473",
          balance: 155,
          group: "04"
        },
        {
          id: "04-33",
          name: "JAMES KARURI",
          phone: "0720537516",
          balance: 188,
          group: "04"
        },
        {
          id: "04-35",
          name: "JULIUS MWITA",
          phone: "0748300226",
          balance: 163,
          group: "04"
        },
        {
          id: "04-36",
          name: "Joseph Kalyamoi Kibusia",
          phone: "0722987072",
          balance: 4124,
          group: "04"
        },
        {
          id: "04-37",
          name: "JOB OCHOKI",
          phone: "0711963130",
          balance: 331,
          group: "04"
        },
        {
          id: "04-38",
          name: "MOSES MBURU MWANGI",
          phone: "0722709173",
          balance: 377,
          group: "04"
        },
        {
          id: "04-39",
          name: "JUDY WANJIKU",
          phone: "0721805903",
          balance: 49,
          group: "04"
        },
        {
          id: "04-40",
          name: "FREDRICK OPONDO",
          phone: "0721477758",
          balance: 48,
          group: "04"
        },
        {
          id: "05-01",
          name: "ESTHER MOMANYI",
          phone: "0711346094",
          balance: 562,
          group: "05"
        },
        {
          id: "05-02",
          name: "ROSE NG'ENO",
          phone: "0723981231",
          balance: 197,
          group: "05"
        },
        {
          id: "05-03",
          name: "RICHARD OMBUI",
          phone: "0721280063",
          balance: 507,
          group: "05"
        },
        {
          id: "05-04",
          name: "EVANS ONYONKA",
          phone: "0724382422",
          balance: 37,
          group: "05"
        },
        {
          id: "05-05",
          name: "KENNEDY MOENGA",
          phone: "0725993482",
          balance: 59,
          group: "05"
        },
        {
          id: "05-06",
          name: "OSCAR MUNYASIA",
          phone: "0724162509",
          balance: 1656,
          group: "05"
        },
        {
          id: "05-07",
          name: "CHARITY KARIUKI",
          phone: "0704492844",
          balance: 278,
          group: "05"
        },
        {
          id: "06-01",
          name: "GRACE NYOKABI",
          phone: "0729257036",
          balance: 737,
          group: "06"
        },
        {
          id: "06-02",
          name: "CALEB MAINA",
          phone: "0729682508",
          balance: 2103,
          group: "06"
        },
        {
          id: "06-03",
          name: "EDWARD NDUATI",
          phone: "0722950254",
          balance: 888,
          group: "06"
        },
        {
          id: "06-04",
          name: "MOSES AGUNDA",
          phone: "0722334836",
          balance: 2412,
          group: "06"
        },
        {
          id: "06-05",
          name: "STEPHEN ONYANCHA",
          phone: "0722978486",
          balance: 779,
          group: "06"
        },
        {
          id: "06-06",
          name: "CHRISTOPHER OKOTH",
          phone: "0723423466",
          balance: 1440,
          group: "06"
        },
        {
          id: "06-07",
          name: "GABRIEL OWINO",
          phone: "0721578591",
          balance: 234,
          group: "06"
        },
        {
          id: "06-08",
          name: "SAMUEL OMBUNA",
          phone: "0721166291",
          balance: 806,
          group: "06"
        },
        {
          id: "06-09",
          name: "JAMES MUIRURI",
          phone: "0722565420",
          balance: 806,
          group: "06"
        },
        {
          id: "06-10",
          name: "JAMES MULINGE",
          phone: "0713505511",
          balance: 512,
          group: "06"
        },
        {
          id: "06-11",
          name: "RONALD MBAJI",
          phone: "0722518308",
          balance: 140,
          group: "06"
        },
        {
          id: "06-12",
          name: "SAMMY WANG'OMBE",
          phone: "0112293108",
          balance: 1404,
          group: "06"
        },
        {
          id: "06-13",
          name: "MELLEN OMBASU",
          phone: "0723902138",
          balance: 1203,
          group: "06"
        },
        {
          id: "06-14",
          name: "ORIOKI MURUKA",
          phone: "0722354775",
          balance: 703,
          group: "06"
        },
        {
          id: "06-15",
          name: "BEATRICE MANYARA",
          phone: "0721219225",
          balance: 891,
          group: "06"
        },
        {
          id: "06-16",
          name: "JOSEPH MWAZIZA",
          phone: "0726564008",
          balance: 557,
          group: "06"
        },
        {
          id: "06-17",
          name: "COSMUS MITAU",
          phone: "0729614604",
          balance: 644,
          group: "06"
        },
        {
          id: "06-18",
          name: "JOSEPH KABERIA",
          phone: "0703159274",
          balance: 576,
          group: "06"
        },
        {
          id: "06-19",
          name: "COLLEEN MBATGAH",
          phone: "0729215835",
          balance: 102,
          group: "06"
        },
        {
          id: "06-20",
          name: "JOYCE MORAA",
          phone: "0791022928",
          balance: 128,
          group: "06"
        },
        {
          id: "06-21",
          name: "STEPHEN ONYANCHA 2",
          phone: "0722978486",
          balance: 2943,
          group: "06"
        },
        {
          id: "07-01",
          name: "ZAINAB MUSA",
          phone: "0722846934",
          balance: 210,
          group: "07"
        },
        {
          id: "07-02",
          name: "JOSEPH MWENDA",
          phone: "0723994110",
          balance: 809,
          group: "07"
        },
        {
          id: "07-03",
          name: "JOSEPH ALUMASA",
          phone: "0722761908",
          balance: 1220,
          group: "07"
        },
        {
          id: "07-04",
          name: "DANIEL NDIVO",
          phone: "0723983713",
          balance: 115,
          group: "07"
        },
        {
          id: "07-05",
          name: "PHILLIP MAKAU",
          phone: "0726492977",
          balance: 32,
          group: "07"
        },
        {
          id: "07-06",
          name: "JAMES KARURI",
          phone: "0723044021",
          balance: 457,
          group: "07"
        },
        {
          id: "07-07",
          name: "MORRIS KEMBO",
          phone: "0722319160",
          balance: 111,
          group: "07"
        },
        {
          id: "07-08",
          name: "DENNIS MAGONYA",
          phone: "0721610401",
          balance: 769,
          group: "07"
        },
        {
          id: "07-09",
          name: "STANLEY MUGENDI",
          phone: "0723575537",
          balance: 1196,
          group: "07"
        },
        {
          id: "07-10",
          name: "JOSEPH MAYAKA",
          phone: "0112929548",
          balance: 613,
          group: "07"
        },
        {
          id: "07-11",
          name: "FESTUS MAGHANGA",
          phone: "0723781801",
          balance: 942,
          group: "07"
        },
        {
          id: "07-12",
          name: "JOSEPH KIMANGA",
          phone: "0720408648",
          balance: 560,
          group: "07"
        },
        {
          id: "07-13",
          name: "JACOB KOECH",
          phone: "0716597834",
          balance: 669,
          group: "07"
        },
        {
          id: "07-14",
          name: "PETER KIMEMIA",
          phone: "0721128799",
          balance: 278,
          group: "07"
        },
        {
          id: "07-15",
          name: "CHARLES MURIITHI",
          phone: "0721697261",
          balance: 721,
          group: "07"
        },
        {
          id: "07-16",
          name: "JENNIFER MUTITU",
          phone: "0714876716",
          balance: 217,
          group: "07"
        },
        {
          id: "07-17",
          name: "JANE NJAGI",
          phone: "0720345566",
          balance: 188,
          group: "07"
        },
        {
          id: "07-18",
          name: "PATRICK GACHOKI",
          phone: "0724408457",
          balance: 749,
          group: "07"
        },
        {
          id: "07-19",
          name: "ROBERT KAMAU",
          phone: "0721332759",
          balance: 263,
          group: "07"
        },
        {
          id: "07-20",
          name: "JEREMMY OGADA",
          phone: "0796377110",
          balance: 380,
          group: "07"
        },
        {
          id: "07-21",
          name: "ANDREW KIROCHI",
          phone: "0719152928",
          balance: 1433,
          group: "07"
        },
        {
          id: "07-22",
          name: "SAMUEL GITHINJI",
          phone: "0721709434",
          balance: 1508,
          group: "07"
        },
        {
          id: "08-01",
          name: "JARED MAINGI1",
          phone: "0721577783",
          balance: 9,
          group: "08"
        },
        {
          id: "08-02",
          name: "JARED MAINGI2",
          phone: "0721577783",
          balance: 829,
          group: "08"
        },
        {
          id: "08-03",
          name: "JUDY MUTHONI",
          phone: "0711225960",
          balance: 143,
          group: "08"
        },
        {
          id: "08-04",
          name: "KEPHA MAGONYA",
          phone: "0720731468",
          balance: 298,
          group: "08"
        },
        {
          id: "08-05",
          name: "PAUL KAMAU",
          phone: "0724558088",
          balance: 111,
          group: "08"
        },
        {
          id: "08-06",
          name: "EDWARD KIMOTHO",
          phone: "0720330703",
          balance: 863,
          group: "08"
        },
        {
          id: "08-07",
          name: "ISAAC WAHENYA",
          phone: "0723104821",
          balance: 179,
          group: "08"
        },
        {
          id: "08-08",
          name: "CORNELIUS ONGERA",
          phone: "0725904008",
          balance: 265,
          group: "08"
        },
        {
          id: "08-09",
          name: "RICHARD CHEPKWONY",
          phone: "0721795699",
          balance: 21,
          group: "08"
        },
        {
          id: "08-10",
          name: "SAMUEL ONDIEKI",
          phone: "0721173042",
          balance: 325,
          group: "08"
        },
        {
          id: "08-11",
          name: "BENARD MUCHIRI",
          phone: "0725107185",
          balance: 105,
          group: "08"
        },
        {
          id: "08-12",
          name: "REDMPTOR KABUURI",
          phone: "0722614258",
          balance: 985,
          group: "08"
        },
        {
          id: "08-13",
          name: "AGNES BARONGO",
          phone: "0724353233",
          balance: 72,
          group: "08"
        },
        {
          id: "08-14",
          name: "DAVID NYASANI",
          phone: "0710809058",
          balance: 459,
          group: "08"
        },
        {
          id: "08-15",
          name: "MICHAEL MUTHOKA",
          phone: "0725016184",
          balance: 58,
          group: "08"
        },
        {
          id: "08-16",
          name: "BILLY NYANGU",
          phone: "0705904162",
          balance: 383,
          group: "08"
        },
        {
          id: "08-17",
          name: "PETER NJOROGE",
          phone: "0721248035",
          balance: 393,
          group: "08"
        },
        {
          id: "08-18",
          name: "JOSEPH MUTAVA",
          phone: "0721249777",
          balance: 131,
          group: "08"
        },
        {
          id: "08-19",
          name: "ZACHAEURS KARIUKI",
          phone: "0722478839",
          balance: 402,
          group: "08"
        },
        {
          id: "08-20",
          name: "JONH K KIBE",
          phone: "0719266152",
          balance: 1826,
          group: "08"
        },
        {
          id: "08-21",
          name: "JULIUS MACHARIA",
          phone: "0720805443",
          balance: 329,
          group: "08"
        },
        {
          id: "08-22",
          name: "MARTINE WAMAHIU",
          phone: "0720230073",
          balance: 198,
          group: "08"
        },
        {
          id: "08-23",
          name: "MARBLE NYABERA",
          phone: "0712650669",
          balance: 164,
          group: "08"
        },
        {
          id: "08-24",
          name: "JOHN IRUNGU",
          phone: "0724644530",
          balance: 136,
          group: "08"
        },
        {
          id: "08-25",
          name: "ALEX CHOKERA",
          phone: "0722888107",
          balance: 752,
          group: "08"
        },
        {
          id: "08-27",
          name: "EVALINE AKINYI",
          phone: "0727432989",
          balance: 528,
          group: "08"
        },
        {
          id: "08-28",
          name: "DARREN MUOKI",
          phone: "0720665459",
          balance: 6,
          group: "08"
        },
        {
          id: "08-29",
          name: "MICHAEL NYAGA",
          phone: "0722257101",
          balance: 490,
          group: "08"
        },
        {
          id: "08-31",
          name: "HELLEN NGINA",
          phone: "0710107593",
          balance: 338,
          group: "08"
        },
        {
          id: "08-32",
          name: "LUCAS OYARO",
          phone: "0711795892",
          balance: 414,
          group: "08"
        },
        {
          id: "08-33",
          name: "VINCENT WAFULA",
          phone: "0721251291",
          balance: 134,
          group: "08"
        },
        {
          id: "08-34",
          name: "JANET WAMAITHA",
          phone: "0724754600",
          balance: 134,
          group: "08"
        },
        {
          id: "08-35",
          name: "GORRETI GATHIGA",
          phone: "0721386841",
          balance: 190,
          group: "08"
        },
        {
          id: "08-36",
          name: "MOHAMMED GICHOHI",
          phone: "0713976071",
          balance: 77,
          group: "08"
        },
        {
          id: "08-37",
          name: "DANIEL MULI",
          phone: "0728778523",
          balance: 718,
          group: "08"
        },
        {
          id: "08-38",
          name: "PERIS KURIA",
          phone: "0710294104",
          balance: 167,
          group: "08"
        },
        {
          id: "08-39",
          name: "ALBANUS NYANCHOKA",
          phone: "0722372252",
          balance: 458,
          group: "08"
        },
        {
          id: "08-40",
          name: "JAMES KANAMPIU",
          phone: "0726919738",
          balance: 671,
          group: "08"
        },
        {
          id: "08-41",
          name: "ALFRED OBINO",
          phone: "0720891643",
          balance: 48,
          group: "08"
        },
        {
          id: "08-42",
          name: "PATRICK MWANGANGI",
          phone: "0723543524",
          balance: 146,
          group: "08"
        },
        {
          id: "08-43",
          name: "BONIFACE KASANDUKU",
          phone: "0727238901",
          balance: 75,
          group: "08"
        },
        {
          id: "08-44",
          name: "ROSELINE OCHIENG'",
          phone: "0722839574",
          balance: 433,
          group: "08"
        },
        {
          id: "08-45",
          name: "SAMUEL MAINA",
          phone: "0726816631",
          balance: 316,
          group: "08"
        },
        {
          id: "08-46",
          name: "CATHRINE WACHIRA",
          phone: "0722460021",
          balance: 90,
          group: "08"
        },
        {
          id: "08-47",
          name: "MICHAEL CHEGE",
          phone: "0724676057",
          balance: 60,
          group: "08"
        },
        {
          id: "08-49",
          name: "MARY GACHARA",
          phone: "0720582217",
          balance: 3,
          group: "08"
        },
        {
          id: "08-50",
          name: "JANET ACHIENG",
          phone: "0724004666",
          balance: 489,
          group: "08"
        },
        {
          id: "08-51",
          name: "SAMUEL KIRUI",
          phone: "0705209154",
          balance: 935,
          group: "08"
        },
        {
          id: "08-52",
          name: "EMANNUEL MUSYOKI",
          phone: "0724718973",
          balance: 457,
          group: "08"
        },
        {
          id: "08-53",
          name: "PETER CHEGE",
          phone: "0725469961",
          balance: 16,
          group: "08"
        },
        {
          id: "08-54",
          name: "ROSEMARY BUURI",
          phone: "0724722210",
          balance: 282,
          group: "08"
        },
        {
          id: "08-55",
          name: "ANTHONY NDUNGU",
          phone: "0702717434",
          balance: 12,
          group: "08"
        },
        {
          id: "08-56",
          name: "RODGERS MBURA",
          phone: "0722287279",
          balance: 42,
          group: "08"
        },
        {
          id: "08-57",
          name: "SAMSON KISILU",
          phone: "0720474924",
          balance: 151,
          group: "08"
        },
        {
          id: "08-58",
          name: "JOSEPH MWANZIA",
          phone: "0720972300",
          balance: 85,
          group: "08"
        },
        {
          id: "08-59",
          name: "MILLICENT OGAMBA",
          phone: "0728029638",
          balance: 75,
          group: "08"
        },
        {
          id: "08-60",
          name: "FRANCIS NJENGA",
          phone: "0722894736",
          balance: 125,
          group: "08"
        },
        {
          id: "08-61",
          name: "ST PETERS CHURCH",
          phone: "0720856425",
          balance: 412,
          group: "08"
        },
        {
          id: "08-62",
          name: "JACKSON GITAU",
          phone: "0723572122",
          balance: 982,
          group: "08"
        },
        {
          id: "08-63",
          name: "WYCLIFE OKIERO OCHIENG",
          phone: "0707138435",
          balance: 156,
          group: "08"
        },
        {
          id: "08-64",
          name: "JAMES KIMANI",
          phone: "0726508545",
          balance: 211,
          group: "08"
        },
        {
          id: "08-65",
          name: "MATHIAS OUKO",
          phone: "0790925980",
          balance: 1278,
          group: "08"
        },
        {
          id: "08-66",
          name: "ISAIAH MACHUKI",
          phone: "0720329045",
          balance: 72,
          group: "08"
        },
        {
          id: "08-67",
          name: "GEORGE TOME",
          phone: "0724437471",
          balance: 72,
          group: "08"
        },
        {
          id: "08-68",
          name: "CHARLES OMONDI",
          phone: "0722980679",
          balance: 206,
          group: "08"
        },
        {
          id: "08-69",
          name: "VICTOR MUTISYA",
          phone: "0727635312",
          balance: 898,
          group: "08"
        },
        {
          id: "08-70",
          name: "DANCUN OTACHI",
          phone: "0707883274",
          balance: 71,
          group: "08"
        },
        {
          id: "08-71",
          name: "JAPHET MUCHEKE",
          phone: "0723959714",
          balance: 61,
          group: "08"
        },
        {
          id: "09-01",
          name: "MUNYASIA KIAMBA",
          phone: "0720757810",
          balance: 513,
          group: "09"
        },
        {
          id: "09-02",
          name: "FRED OGUTU",
          phone: "0702015311",
          balance: 1955,
          group: "09"
        },
        {
          id: "09-03",
          name: "JOHN DAWA",
          phone: "0722211581",
          balance: 10,
          group: "09"
        },
        {
          id: "09-04",
          name: "EVALINE OMASAJA",
          phone: "0700735743",
          balance: 1188,
          group: "09"
        },
        {
          id: "09-05",
          name: "CAROLINE ANYANG",
          phone: "0716688207",
          balance: 21,
          group: "09"
        },
        {
          id: "09-06",
          name: "FRED OGUTU",
          phone: "0702015311",
          balance: 1213,
          group: "09"
        },
        {
          id: "10-03",
          name: "JUDITH NYANGWARA",
          phone: "0727067953",
          balance: 141,
          group: "10"
        },
        {
          id: "10-04",
          name: "AMELLENCIA ONYANGO",
          phone: "0721528225",
          balance: 129,
          group: "10"
        },
        {
          id: "11-01",
          name: "JOSEPH THEURI",
          phone: "0746410114",
          balance: 492,
          group: "11"
        },
        {
          id: "11-02",
          name: "TOM OGETO",
          phone: "0723160086",
          balance: 145,
          group: "11"
        },
        {
          id: "11-03",
          name: "PATRICK KAHARIRI",
          phone: "0722254700",
          balance: 1725,
          group: "11"
        },
        {
          id: "11-04",
          name: "KINYUA MURIITHI",
          phone: "0722150447",
          balance: 735,
          group: "11"
        },
        {
          id: "11-05",
          name: "DANIEL AWUONDO",
          phone: "0728527286",
          balance: 919,
          group: "11"
        },
        {
          id: "11-06",
          name: "ALICE MUMBI",
          phone: "0724758102",
          balance: 37,
          group: "11"
        },
        {
          id: "11-07",
          name: "JACOB YEGO",
          phone: "0721835352",
          balance: 555,
          group: "11"
        },
        {
          id: "11-08",
          name: "WILLIAM NZIOKI",
          phone: "0723227241",
          balance: 33,
          group: "11"
        },
        {
          id: "11-09",
          name: "JOSEPH AKAMA",
          phone: "0725820976",
          balance: 126,
          group: "11"
        },
        {
          id: "12-01",
          name: "MARY NGECHU",
          phone: "0722990339",
          balance: 1529,
          group: "12"
        },
        {
          id: "13-01",
          name: "STEPHEN ABUGA",
          phone: "0791890403",
          balance: 458,
          group: "13"
        },
        {
          id: "13-02",
          name: "GEOFREY ORINA",
          phone: "0724424800",
          balance: 495,
          group: "13"
        },
        {
          id: "13-03",
          name: "JULIUS MBEYA",
          phone: "0722891918",
          balance: 105,
          group: "13"
        },
        {
          id: "13-04",
          name: "MARY MAINA",
          phone: "0720884468",
          balance: 91,
          group: "13"
        },
        {
          id: "13-05",
          name: "HENRY OGADA",
          phone: "0722354654",
          balance: 136,
          group: "13"
        },
        {
          id: "13-06",
          name: "ALLAN AKOMBO",
          phone: "0723908396",
          balance: 55,
          group: "13"
        },
        {
          id: "13-07",
          name: "BETTY AMUSUGUT",
          phone: "0722340583",
          balance: 288,
          group: "13"
        },
        {
          id: "13-08",
          name: "EVERLINE OLOO",
          phone: "0720430951",
          balance: 213,
          group: "13"
        },
        {
          id: "13-09",
          name: "JOSEPH KIVUVA MUSYOKI",
          phone: "0721475282",
          balance: 203,
          group: "13"
        },
        {
          id: "13-10",
          name: "CHRISTOPHER ONGECHI",
          phone: "0723761911",
          balance: 492,
          group: "13"
        },
        {
          id: "13-11",
          name: "NAHASHON MBAE",
          phone: "0722282978",
          balance: 865,
          group: "13"
        },
        {
          id: "13-12",
          name: "FRANCIS THUO KAMAU",
          phone: "0721286483",
          balance: 83,
          group: "13"
        },
        {
          id: "13-13",
          name: "JOSPHINE NTHOKI",
          phone: "0710724884",
          balance: 60,
          group: "13"
        },
        {
          id: "13-14",
          name: "BONIFACE ITOTIA",
          phone: "0721350320",
          balance: 195,
          group: "13"
        },
        {
          id: "14-01",
          name: "SERA NYAMBURA",
          phone: "0722901446",
          balance: 898,
          group: "14"
        },
        {
          id: "14-02",
          name: "TOM GIKUNDA",
          phone: "0720149555",
          balance: 64,
          group: "14"
        },
        {
          id: "15-01",
          name: "YUSUF ALI",
          phone: "0722884661",
          balance: 557,
          group: "15"
        },
        {
          id: "16-01",
          name: "MARION MULA",
          phone: "0720593953",
          balance: 988,
          group: "16"
        },
        {
          id: "16-02",
          name: "MICHAEL MWANGI",
          phone: "0720496861",
          balance: 505,
          group: "16"
        }
      ];
// Save to a file
if (!fs.existsSync('.data')) {
  fs.mkdirSync('.data');
}

fs.writeFileSync('.data/customers.json', JSON.stringify(customersData, null, 2));
console.log('Customers data converted and saved');