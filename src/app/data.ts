import { range } from 'lodash'
import { Layout } from 'plotly.js'

const NUM_POINTS = 1000

const COLOURS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ff00ff',
  '#ffff00',
  '#00ffff',
  '#000000',
  '#FF007F',
  '#7F00FF',
  '#007FFF',
  '#00FF7F',
  '#DFFF00',
  '#FFA500'
]

const baseLayout: Partial<Layout> = {
  autosize: true,
  dragmode: 'pan',
  showlegend: false
}

export const TimeData: Plotly.Data[] = [
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x ** 0.5),
    name: 'Temperature',
    mode: 'markers',
    marker: {color: COLOURS[0]},
    yaxis: 'y',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x + x * Math.cos(0.1 * x)),
    name: 'Pressure',
    mode: 'markers',
    marker: {color: COLOURS[1]},
    yaxis: 'y2',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => x ** 1.5),
    name: 'Wetness',
    mode: 'markers',
    marker: {color: COLOURS[2]},
    yaxis: 'y3',
    visible: true
  },
]

export const TimeLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'Multiple Y axes',
  xaxis: {
    title: 'Time'
  },
  ...Object.fromEntries(TimeData.map((x, i) => (
    [
      `yaxis${i > 0 ? i + 1 : ''}`,
      {visible: false, overlaying: i > 0 ? 'y' : undefined}
    ]
  )))
}

export const DepthData: Plotly.Data[] = [
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x ** 0.5),
    y: range(NUM_POINTS),
    name: 'Temperature',
    mode: 'markers',
    marker: {color: COLOURS[0]},
    xaxis: 'x',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x ** 1.5),
    y: range(NUM_POINTS),
    name: 'Wetness',
    mode: 'markers',
    marker: {color: COLOURS[1]},
    xaxis: 'x2',
    visible: true
  },
  {
    type: 'scattergl',
    x: range(NUM_POINTS).map(x => x + x * Math.cos(0.1 * x)),
    y: range(NUM_POINTS),
    name: 'Pressure',
    mode: 'markers',
    marker: {color: COLOURS[2]},
    xaxis: 'x3',
    visible: true
  },
]

export const DepthLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'Multiple X axes',
  ...Object.fromEntries(DepthData.map((x, i) => (
    [
      `xaxis${i > 0 ? i + 1 : ''}`,
      {visible: false, overlaying: i > 0 ? 'x' : undefined, side: 'top'}
    ]
  ))),
  yaxis: {
    title: 'Depth',
    autorange: 'reversed'
  },
}

export const ManyLinesData: Plotly.Data[] = range(1, 16).map(i => (
  {
    type: 'scattergl',
    x: range(NUM_POINTS),
    y: range(NUM_POINTS).map(x => (x - 50 * i) ** 2),
    name: `Param ${i}`,
    mode: 'markers',
    marker: {color: COLOURS[i % COLOURS.length]},
    yaxis: `y${i}`,
    visible: true
  }
))

export const ManyLinesLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'Many plots at once',
  ...Object.fromEntries(ManyLinesData.map((x, i) => (
    [`yaxis${i > 0 ? i + 1 : ''}`, {visible: false, overlaying: i > 0 ? 'y' : undefined}]
  )))
}

const data: any = {
  'ACYCAA01': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
  'AHSFZZ01': [98.751220703125, 45.912322998046875, 38.780845642089844, 98.75043487548828, 98.7490463256836, 65.55238342285156, 54.17164993286133, 98.64149475097656, 97.82566833496094, 82.53196716308594, 55.756065368652344, 98.30921936035156, 58.194175720214844, 19.4422550201416, 98.60367584228516, 97.53787994384766, 61.94007873535156, 91.43956756591797, 43.369293212890625, 98.12138366699219, 83.892333984375, 22.579633712768555, 51.32887268066406, 98.75142669677734, 92.4286117553711, 51.09916687011719, 93.28325653076172, 98.75122833251953, 98.755615234375, 98.75028991699219, 98.75084686279297, 98.75333404541016, 98.65904998779297, 98.25283813476562, 97.02255249023438, 94.6129150390625, 92.81400299072266, 69.08590698242188, 50.84294891357422, 85.922607421875, 84.0163345336914, 82.22041320800781, 65.443603515625, 31.08758544921875, 69.85076904296875, 72.70801544189453, 71.74781036376953, 58.833683013916016, 67.08971405029297, 64.80823516845703, 62.762550354003906, 61.20831298828125, 59.40987777709961, 57.23136520385742, 53.994956970214844, 26.036449432373047, 51.20640182495117, 49.32351303100586, 47.62147903442383, 45.64349365234375, 43.715660095214844, 42.007999420166016, 39.81111145019531, 37.91524887084961, 35.822025299072266, 33.746665954589844, 31.59978675842285, 29.51137924194336, 27.45389747619629, 24.60381507873535, 22.53556251525879, 21.126543045043945, 19.244091033935547, 17.18963623046875, 15.511053085327148, 13.538214683532715, 10.987482070922852, 9.014728546142578],
  'ATTNMR01': [0.20869484543800354, 0.2102004885673523, 0.21046359837055206, 0.20895303785800934, 0.2102220356464386, 0.20997051894664764, 0.20955821871757507, 0.2085627019405365, 0.20734469592571259, 0.20710203051567078, 0.20562036335468292, 0.20401784777641296, 0.20990201830863953, 0.2115834653377533, 0.2098875492811203, 0.2095874845981598, 0.20511695742607117, 0.20589056611061096, 0.20375709235668182, 0.20599980652332306, 0.204746276140213, 0.2012380212545395, 0.19976943731307983, 0.19837065041065216, 0.19572389125823975, 0.1899133324623108, 0.17835736274719238, 0.16722382605075836, 0.16395147144794464, 0.1428186446428299, 0.13358287513256073, 0.12065374106168747, 0.11839454621076584, 0.10961388796567917, 0.11310732364654541, 0.10105401277542114, 0.10204879939556122, 0.07696777582168579, 0.0784899890422821, 0.06309852749109268, 0.060905370861291885, 0.05919098109006882, 0.0568111427128315, 0.05769900605082512, 0.055217940360307693, 0.0543522834777832, 0.04853329807519913, 0.045179422944784164, 0.04312994331121445, 0.04020874202251434, 0.03921688720583916, 0.03803672268986702, 0.03724192455410957, 0.03557613492012024, 0.035110924392938614, 0.03514017164707184, 0.035557352006435394, 0.03546898812055588, 0.035945020616054535, 0.03522360324859619, 0.036438047885894775, 0.03646360710263252, 0.0374218188226223, 0.03734881430864334, 0.038583315908908844, 0.03782568499445915, 0.03828258812427521, 0.037485893815755844, 0.037575844675302505, 0.03694592043757439, 0.03709684684872627, 0.03793628513813019, 0.03840768337249756, 0.0381830669939518, 0.03926558047533035, 0.03807523474097252, 0.03806352615356445, 0.0378999337553978],
  'BB117R01': [0.00020144756126683205, 0.00020320994372013956, 0.00021164631471037865, 0.00018861486751120538, 0.00020122333080507815, 0.00017882094834931195, 0.0002011816541198641, 0.00018508009088691324, 0.00022029652609489858, 0.00022419403831008822, 0.0001948140125023201, 0.00018972544057760388, 0.00023998883261810988, 0.00020033068722113967, 0.0002574886893853545, 0.00019952075672335923, 0.0002018314553424716, 0.000214121158933267, 0.00030311959562823176, 0.0002050004550255835, 0.00022626247664447874, 0.00021503634343389422, 0.0002445695863571018, 0.0001986234710784629, 0.0002053670323221013, 0.00019962646183557808, 0.0002068621397484094, 0.00023342894564848393, 0.00021747910068370402, 0.0001989624579437077, 0.00024631794076412916, 0.00019624500419013202, 0.00018119116430170834, 0.00018562839250080287, 0.00017028098227456212, 0.0001872618740890175, 0.00015840800188016146, 0.00015519704902544618, 0.00014751958951819688, 0.00013190152822062373, 0.0001384998031426221, 0.00013889312685932964, 0.00011108453327324241, 0.00011009551963070408, 0.00016480768681503832, 0.0001760199957061559, 0.00011111575440736488, 0.00016237510135397315, 0.0001437565078958869, 0.00010633060446707532, 0.00013331507216207683, 0.00011734853615052998, 0.00011331048153806478, 0.00012184754450572655, 0.00012010078353341669, 0.00012591728591360152, 0.0001296599948545918, 0.00014956823724787682, 0.00017722260963637382, 0.00017353771545458585, 0.0001652672654017806, 0.00016146132838912308, 0.0001724917092360556, 0.00019485138182062656, 0.0001867690443759784, 0.00019336031982675195, 0.00021717212803196162, 0.00019781322043854743, 0.00020018991199322045, 0.0002083160070469603, 0.00019977727788500488, 0.00018732406897470355, 0.0001951471931533888, 0.0001881789939943701, 0.00019347657507751137, 0.00020116865925956517, 0.00019971792062278837, 0.0001803208579076454],
  'CNCLCCI1': [3.475438117980957, 3.475552797317505, 3.475717067718506, 3.4757168292999268, 3.475879669189453, 3.476017951965332, 3.4762659072875977, 3.476299285888672, 3.475628137588501, 3.4735612869262695, 3.471844434738159, 3.470005989074707, 3.4670231342315674, 3.465794563293457, 3.465308904647827, 3.4652163982391357, 3.465057134628296, 3.4650421142578125, 3.464883804321289, 3.4647469520568848, 3.4645097255706787, 3.461850643157959, 3.460630178451538, 3.4599673748016357, 3.459012985229492, 3.4541993141174316, 3.4476912021636963, 3.4393603801727295, 3.433997631072998, 3.4279706478118896, 3.423380136489868, 3.4189155101776123, 3.418198347091675, 3.415400266647339, 3.41461443901062, 3.4103972911834717, 3.4090278148651123, 3.3906147480010986, 3.391097068786621, 3.386347532272339, 3.382605791091919, 3.380979299545288, 3.3799002170562744, 3.3806447982788086, 3.3774356842041016, 3.3795535564422607, 3.374372720718384, 3.368889808654785, 3.364677667617798, 3.3607163429260254, 3.355308771133423, 3.3499655723571777, 3.3457915782928467, 3.34002423286438, 3.338999032974243, 3.3375086784362793, 3.3344569206237793, 3.3331966400146484, 3.3317620754241943, 3.3315675258636475, 3.331359386444092, 3.3310136795043945, 3.3303627967834473, 3.3304531574249268, 3.3304712772369385, 3.330474376678467, 3.3305063247680664, 3.3306005001068115, 3.330681562423706, 3.3308563232421875, 3.3308517932891846, 3.330956220626831, 3.3310792446136475, 3.3311760425567627, 3.33122181892395, 3.331336736679077, 3.3315398693084717, 3.331609010696411],
  'CPHLPR01': [0.4609902501106262, 0.46043869853019714, 0.4538092315196991, 0.45606720447540283, 0.45453014969825745, 0.4614245891571045, 0.4610944986343384, 0.46389123797416687, 0.4598279893398285, 0.4519825875759125, 0.4561770558357239, 0.46276888251304626, 0.48133009672164917, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997076988220215, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.4997999966144562, 0.49897679686546326, 0.4835253059864044, 0.46685925126075745, 0.4358336925506592, 0.42760124802589417, 0.41622745990753174, 0.38924896717071533, 0.37714889645576477, 0.32647955417633057, 0.3152565658092499, 0.2805413007736206, 0.2653861343860626, 0.26160624623298645, 0.24814000725746155, 0.2574482858181, 0.2561323046684265, 0.24158965051174164, 0.21178904175758362, 0.19242192804813385, 0.1733190417289734, 0.14742720127105713, 0.13707047700881958, 0.12741798162460327, 0.11990481615066528, 0.10202272981405258, 0.10726434737443924, 0.09251215308904648, 0.08395999670028687, 0.0837351381778717, 0.07000681757926941, 0.08484819531440735, 0.08125282824039459, 0.07088444381952286, 0.07058461755514145, 0.08109749853610992, 0.07070952653884888, 0.06328064203262329, 0.08051063865423203, 0.08103333413600922, 0.06513728946447372, 0.07874473929405212, 0.06861390918493271, 0.07419382780790329, 0.06626591086387634, 0.07365363836288452, 0.07512763142585754, 0.07122589647769928, 0.06767913699150085, 0.07352868467569351],
  'DEPHPR01': [4.955019474029541, 6.936993598937988, 8.91894817352295, 10.900884628295898, 12.882801055908203, 14.864697456359863, 16.846574783325195, 18.828433990478516, 20.810274124145508, 22.79209327697754, 24.773895263671875, 26.75567626953125, 28.737438201904297, 30.71918296813965, 32.700904846191406, 34.68260955810547, 36.6642951965332, 38.64596176147461, 40.62760925292969, 42.60923767089844, 44.59084701538086, 46.57243728637695, 48.55400466918945, 50.53555679321289, 52.51708984375, 54.498600006103516, 56.48009490966797, 58.461570739746094, 60.443023681640625, 62.42445755004883, 64.40587615966797, 66.38727569580078, 68.36865234375, 70.35001373291016, 72.33135223388672, 74.31266784667969, 76.2939682006836, 78.27525329589844, 80.25651550292969, 82.23776245117188, 84.21898651123047, 86.20018768310547, 88.1813735961914, 90.16254425048828, 92.14369201660156, 94.12481689453125, 96.10592651367188, 98.0870132446289, 100.06808471679688, 102.04914093017578, 104.0301742553711, 106.01118469238281, 107.99217987060547, 109.97315216064453, 111.95410919189453, 113.93504333496094, 115.91596221923828, 117.89685821533203, 119.87773895263672, 121.85859680175781, 123.83943939208984, 125.82025909423828, 127.80106353759766, 129.78184509277344, 131.76260375976562, 133.7433624267578, 135.7240753173828, 137.7047882080078, 139.6854705810547, 141.6661376953125, 143.64678955078125, 145.62742614746094, 147.6080322265625, 149.588623046875, 151.56919860839844, 153.54974365234375, 155.53028869628906, 157.51080322265625],
  'DOXYSC01': [310.3183898925781, 310.1859436035156, 309.8201599121094, 310.0908508300781, 310.0703430175781, 310.0989685058594, 310.0171813964844, 309.766357421875, 309.9180908203125, 310.052734375, 309.7454833984375, 310.226806640625, 310.017578125, 310.0287780761719, 309.4588928222656, 309.66851806640625, 309.52935791015625, 309.11669921875, 309.58306884765625, 309.4716491699219, 309.078857421875, 309.0177307128906, 308.6672668457031, 309.2402038574219, 307.99151611328125, 307.9910583496094, 307.41009521484375, 307.3099060058594, 307.2186584472656, 306.17987060546875, 306.35809326171875, 306.5434875488281, 306.2138366699219, 305.85198974609375, 305.8815002441406, 305.5887756347656, 303.9112548828125, 304.2791442871094, 304.64501953125, 303.8248596191406, 303.5014343261719, 304.3458557128906, 303.4797058105469, 304.0167541503906, 303.7218933105469, 303.3825378417969, 303.00762939453125, 302.3313293457031, 302.5726318359375, 302.10443115234375, 301.5271301269531, 301.6633605957031, 300.7649230957031, 300.6942138671875, 300.4025573730469, 299.4926452636719, 300.1872863769531, 299.7197570800781, 299.39825439453125, 299.2716979980469, 299.2260437011719, 298.6809387207031, 299.1264953613281, 298.9256286621094, 298.7379150390625, 299.0696716308594, 299.1551208496094, 299.2152099609375, 299.1781005859375, 299.1158447265625, 298.7827453613281, 299.1993408203125, 299.1896667480469, 298.7420349121094, 298.8734436035156, 298.72552490234375, 298.66302490234375, 299.0869140625],
  'FACYCAA01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FAHSFZZ01': ['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', ' ', ' ', ' ', ' ', ' ', ' ', 'M', 'M', ' ', ' ', ' ', 'M', 'M', 'M', ' ', ' ', 'M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FATTNMR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FBB117R01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FCNCLCCI1': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FCPHLPR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FDEPHPR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FDOXYSC01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FIRRDUV01': ['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'],
  'FIRRUUV01': ['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'],
  'FOXYSZZ01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FPOPTDR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FPOTMCV01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FPRESPR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FPSALCC01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FSIGTPR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FTEMPCC01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FTEMPPRES': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'FTOKGPR01': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  'IRRDUV01': [9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13],
  'IRRUUV01': [9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13, 9.999999960041972e-13],
  'OXYSZZ01': [103.19268035888672, 103.14987182617188, 103.03062438964844, 103.11795043945312, 103.11296844482422, 103.12421417236328, 103.10115814208984, 103.01587677001953, 103.04708862304688, 103.03575897216797, 102.88717651367188, 102.99783325195312, 102.84797668457031, 102.81752014160156, 102.612548828125, 102.67798614501953, 102.62500762939453, 102.48536682128906, 102.63359069824219, 102.59050750732422, 102.45223999023438, 102.3592758178711, 102.20935821533203, 102.3799819946289, 101.93891906738281, 101.8135757446289, 101.44841003417969, 101.19696807861328, 101.02223205566406, 100.52020263671875, 100.45563507080078, 100.3973159790039, 100.2674331665039, 100.07164001464844, 100.06005859375, 99.8492660522461, 99.26905822753906, 98.90234375, 99.02470397949219, 98.63654327392578, 98.42627716064453, 98.65568542480469, 98.34114074707031, 98.53303527832031, 98.34964752197266, 98.29347229003906, 98.03426361083984, 97.66874694824219, 97.63435363769531, 97.37946319580078, 97.05021667480469, 96.95365905761719, 96.55549621582031, 96.37966918945312, 96.25604248046875, 95.9237289428711, 96.06713104248047, 95.88219451904297, 95.73961639404297, 95.69251251220703, 95.67005157470703, 95.4850845336914, 95.60846710205078, 95.54437255859375, 95.48265075683594, 95.58663940429688, 95.61204528808594, 95.63179016113281, 95.61969757080078, 95.60157775878906, 95.49313354492188, 95.62682342529297, 95.6244888305664, 95.4815902709961, 95.5228042602539, 95.4759521484375, 95.45845794677734, 95.59432220458984],
  'POPTDR01': [94.91639709472656, 94.88067626953125, 94.87443542480469, 94.91027069091797, 94.88016510009766, 94.8861312866211, 94.89591217041016, 94.9195327758789, 94.94844055175781, 94.9542007446289, 94.9893798828125, 95.0274429321289, 94.88775634765625, 94.8478775024414, 94.88809967041016, 94.89521789550781, 95.00133514404297, 94.98296356201172, 95.03363800048828, 94.9803695678711, 95.01013946533203, 95.093505859375, 95.12842559814453, 95.16169738769531, 95.22468566894531, 95.36311340332031, 95.6390151977539, 95.90558624267578, 95.98407745361328, 96.49252319335938, 96.715576171875, 97.02869415283203, 97.08351135253906, 97.29685974121094, 97.21192169189453, 97.50529479980469, 97.48104858398438, 98.09420013427734, 98.05687713623047, 98.4349136352539, 98.48889923095703, 98.53112030029297, 98.58975982666016, 98.56787872314453, 98.62903594970703, 98.65038299560547, 98.79399871826172, 98.87686920166016, 98.92754364013672, 98.99981689453125, 99.02436828613281, 99.0535888671875, 99.07327270507812, 99.11454010009766, 99.12606811523438, 99.1253433227539, 99.11500549316406, 99.11719512939453, 99.10540008544922, 99.12327575683594, 99.09318542480469, 99.0925521850586, 99.06881713867188, 99.07062530517578, 99.04005432128906, 99.0588150024414, 99.04750061035156, 99.06723022460938, 99.06500244140625, 99.08060455322266, 99.07686614990234, 99.05607604980469, 99.04440307617188, 99.04996490478516, 99.02316284179688, 99.0526351928711, 99.05292510986328, 99.05697631835938],
  'POTMCV01': [7.393250465393066, 7.393568515777588, 7.3944573402404785, 7.393073081970215, 7.3936920166015625, 7.394240856170654, 7.395786285400391, 7.394806861877441, 7.386501789093018, 7.362451553344727, 7.342546463012695, 7.3215155601501465, 7.287027835845947, 7.2722859382629395, 7.265206336975098, 7.263299942016602, 7.2601776123046875, 7.258780002593994, 7.255845069885254, 7.25300931930542, 7.24938440322876, 7.2179179191589355, 7.203354835510254, 7.1950225830078125, 7.1828389167785645, 7.129281044006348, 7.054187297821045, 6.959929943084717, 6.896759986877441, 6.826801300048828, 6.772980690002441, 6.721123695373535, 6.711201190948486, 6.677196025848389, 6.667934894561768, 6.6172709465026855, 6.603944778442383, 6.389564037322998, 6.389666557312012, 6.3369059562683105, 6.289487838745117, 6.269839286804199, 6.254284381866455, 6.2620415687561035, 6.223005771636963, 6.246633052825928, 6.185544013977051, 6.120116710662842, 6.070282936096191, 6.02435827255249, 5.960571765899658, 5.898192882537842, 5.849423408508301, 5.780847072601318, 5.766994953155518, 5.748605251312256, 5.713495254516602, 5.697418689727783, 5.679471969604492, 5.676390647888184, 5.672646999359131, 5.6678290367126465, 5.659112930297852, 5.6590399742126465, 5.658090591430664, 5.657033920288086, 5.655999183654785, 5.656100749969482, 5.655823707580566, 5.656449794769287, 5.65545129776001, 5.6555256843566895, 5.655706405639648, 5.655613422393799, 5.655111789703369, 5.655120849609375, 5.656049728393555, 5.656068801879883],
  'PRESPR01': [5.0, 7.0, 9.0, 11.0, 13.0, 15.0, 17.0, 19.0, 21.0, 23.0, 25.0, 27.0, 29.0, 31.0, 33.0, 35.0, 37.0, 39.0, 41.0, 43.0, 45.0, 47.0, 49.0, 51.0, 53.0, 55.0, 57.0, 59.0, 61.0, 63.0, 65.0, 67.0, 69.0, 71.0, 73.0, 75.0, 77.0, 79.0, 81.0, 83.0, 85.0, 87.0, 89.0, 91.0, 93.0, 95.0, 97.0, 99.0, 101.0, 103.0, 105.0, 107.0, 109.0, 111.0, 113.0, 115.0, 117.0, 119.0, 121.0, 123.0, 125.0, 127.0, 129.0, 131.0, 133.0, 135.0, 137.0, 139.0, 141.0, 143.0, 145.0, 147.0, 149.0, 151.0, 153.0, 155.0, 157.0, 159.0],
  'PSALCC01': [34.02254104614258, 34.02260208129883, 34.02240753173828, 34.022579193115234, 34.02248764038086, 34.02248001098633, 34.0225830078125, 34.02257537841797, 34.02229690551758, 34.022239685058594, 34.02193069458008, 34.02157211303711, 34.021812438964844, 34.021812438964844, 34.02207946777344, 34.02202606201172, 34.022098541259766, 34.022117614746094, 34.022186279296875, 34.02227783203125, 34.02227020263672, 34.02301025390625, 34.02267837524414, 34.02265167236328, 34.02313232421875, 34.02202606201172, 34.023799896240234, 34.02434158325195, 34.02686309814453, 34.02851867675781, 34.030250549316406, 34.031166076660156, 34.03211975097656, 34.03342819213867, 34.033050537109375, 34.03534698486328, 34.032440185546875, 34.04032897949219, 34.044612884521484, 34.04304122924805, 34.047489166259766, 34.04789352416992, 34.05009078979492, 34.049598693847656, 34.05143356323242, 34.050296783447266, 34.05251693725586, 34.05562210083008, 34.0570182800293, 34.05752944946289, 34.059600830078125, 34.0610237121582, 34.062015533447266, 34.06465530395508, 34.065895080566406, 34.06639099121094, 34.06613540649414, 34.0670051574707, 34.06751251220703, 34.06739807128906, 34.06770706176758, 34.06733703613281, 34.067623138427734, 34.06747055053711, 34.067527770996094, 34.06747055053711, 34.06755065917969, 34.06745529174805, 34.06748580932617, 34.06747817993164, 34.06730651855469, 34.067317962646484, 34.06727981567383, 34.06728744506836, 34.06724166870117, 34.06729507446289, 34.06732940673828, 34.0672721862793],
  'SIGTPR01': [26.594005584716797, 26.59400749206543, 26.59372901916504, 26.594058990478516, 26.593900680541992, 26.59381675720215, 26.593679428100586, 26.59381103515625, 26.59476661682129, 26.598119735717773, 26.60068130493164, 26.603361129760742, 26.608394622802734, 26.61046028137207, 26.611661911010742, 26.611886978149414, 26.612380981445312, 26.612592697143555, 26.613056182861328, 26.613525390625, 26.61402702331543, 26.61900520324707, 26.620773315429688, 26.62191390991211, 26.62398910522461, 26.630552291870117, 26.64232063293457, 26.655677795410156, 26.666275024414062, 26.67706298828125, 26.685688018798828, 26.69337272644043, 26.695453643798828, 26.701032638549805, 26.70197105407715, 26.710525512695312, 26.710002899169922, 26.744415283203125, 26.747783660888672, 26.753400802612305, 26.763050079345703, 26.765905380249023, 26.769643783569336, 26.76825714111328, 26.77472686767578, 26.77079200744629, 26.780385971069336, 26.791189193725586, 26.798620223999023, 26.804832458496094, 26.81449317932129, 26.823423385620117, 26.830276489257812, 26.84085464477539, 26.843542098999023, 26.84619903564453, 26.850309371948242, 26.852968215942383, 26.855566024780273, 26.855852127075195, 26.85655403137207, 26.856849670410156, 26.858139038085938, 26.858028411865234, 26.85818862915039, 26.858272552490234, 26.858461380004883, 26.858373641967773, 26.85843276977539, 26.858348846435547, 26.858335494995117, 26.858335494995117, 26.85828399658203, 26.858301162719727, 26.858325958251953, 26.858367919921875, 26.858280181884766, 26.858232498168945],
  'TEMPCC01': [7.393719673156738, 7.394225597381592, 7.3953022956848145, 7.394105911254883, 7.3949127197265625, 7.3956499099731445, 7.397383689880371, 7.396592140197754, 7.388473987579346, 7.364607810974121, 7.344886779785156, 7.324038982391357, 7.289731025695801, 7.275172710418701, 7.268278121948242, 7.266557693481445, 7.2636213302612305, 7.2624101638793945, 7.259660720825195, 7.2570109367370605, 7.253571510314941, 7.222280502319336, 7.2078986167907715, 7.199748992919922, 7.187746524810791, 7.134352207183838, 7.05941104888916, 6.96529483795166, 6.902278423309326, 6.832468032836914, 6.778801441192627, 6.727097988128662, 6.717349529266357, 6.683505058288574, 6.674417495727539, 6.623903274536133, 6.61074686050415, 6.396413803100586, 6.396691799163818, 6.344071865081787, 6.296796798706055, 6.277308464050293, 6.261916160583496, 6.2698516845703125, 6.230961322784424, 6.2547783851623535, 6.193816661834717, 6.128511428833008, 6.07880973815918, 6.033019065856934, 5.969350337982178, 5.907088756561279, 5.858445644378662, 5.78997802734375, 5.776279926300049, 5.758039951324463, 5.723063945770264, 5.7071380615234375, 5.689339637756348, 5.686420440673828, 5.682837963104248, 5.67818021774292, 5.669620513916016, 5.669712543487549, 5.668927192687988, 5.668034553527832, 5.667163848876953, 5.667430877685547, 5.667318820953369, 5.6681108474731445, 5.667276382446289, 5.667516231536865, 5.667862892150879, 5.667935371398926, 5.667598724365234, 5.667773246765137, 5.6688690185546875, 5.66905403137207],
  'TEMPPRES': [9.729999542236328, 9.729881286621094, 9.730307579040527, 9.731147766113281, 9.731666564941406, 9.73373031616211, 9.735494613647461, 9.737544059753418, 9.738866806030273, 9.74168586730957, 9.743278503417969, 9.744333267211914, 9.745631217956543, 9.747549057006836, 9.747641563415527, 9.74848461151123, 9.749154090881348, 9.748985290527344, 9.749494552612305, 9.7496919631958, 9.749924659729004, 9.7498779296875, 9.75, 9.75, 9.75, 9.75, 9.75, 9.75, 9.750225067138672, 9.75, 9.750722885131836, 9.750370025634766, 9.750421524047852, 9.750741004943848, 9.750391960144043, 9.752708435058594, 9.753999710083008, 9.754091262817383, 9.755901336669922, 9.758695602416992, 9.758316993713379, 9.760833740234375, 9.759333610534668, 9.765172004699707, 9.764461517333984, 9.768362045288086, 9.767807960510254, 9.769035339355469, 9.770952224731445, 9.782353401184082, 9.799798965454102, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863, 9.800000190734863],
  'TOKGPR01': [0.9740949273109436, 0.9740949273109436, 0.9740951657295227, 0.9740948677062988, 0.9740949869155884, 0.9740951061248779, 0.9740952253341675, 0.9740951061248779, 0.9740942120552063, 0.9740909934043884, 0.9740886092185974, 0.9740860462188721, 0.97408127784729, 0.9740793108940125, 0.9740781784057617, 0.9740779399871826, 0.9740774631500244, 0.9740772843360901, 0.9740768671035767, 0.9740763902664185, 0.9740759134292603, 0.974071204662323, 0.9740695357322693, 0.9740684628486633, 0.974066436290741, 0.9740602374076843, 0.9740490913391113, 0.9740363955497742, 0.9740263223648071, 0.9740161299705505, 0.9740079045295715, 0.9740006327629089, 0.9739986658096313, 0.9739933609962463, 0.9739924669265747, 0.9739843606948853, 0.9739848375320435, 0.9739522337913513, 0.9739490151405334, 0.9739437103271484, 0.973934531211853, 0.9739318490028381, 0.9739282727241516, 0.9739295840263367, 0.9739234447479248, 0.9739271998405457, 0.973918080329895, 0.9739078283309937, 0.9739007949829102, 0.9738948941230774, 0.9738857746124268, 0.9738772511482239, 0.9738707542419434, 0.9738607406616211, 0.9738581776618958, 0.9738556742668152, 0.9738517999649048, 0.9738492369651794, 0.9738467931747437, 0.9738464951515198, 0.9738458395004272, 0.9738456010818481, 0.9738443493843079, 0.9738444685935974, 0.9738442897796631, 0.9738442301750183, 0.973844051361084, 0.9738441109657288, 0.973844051361084, 0.9738441705703735, 0.9738441705703735, 0.9738441705703735, 0.9738442301750183, 0.9738441705703735, 0.9738441705703735, 0.9738441109657288, 0.9738442301750183, 0.9738442897796631]
}

export const RealData: Plotly.Data[] = Object.keys(data).map((key, i) => (
  {
    type: 'scattergl',
    x: range(data[key].length),
    y: data[key],
    name: key,
    mode: 'markers',
    marker: {color: COLOURS[i % COLOURS.length]},
    yaxis: (i > 0 ? `y${i}` : 'y'),
    visible: true
  }
))

export const RealDataLayout: Partial<Layout> = {
  ...baseLayout,
  title: 'QXF Data',
  ...Object.fromEntries(RealData.map((x, i) => (
    [`yaxis${i > 0 ? i + 1 : ''}`, {visible: false, overlaying: i > 0 ? 'y' : undefined}]
  )))
}
