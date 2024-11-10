export const chromaticScale = [
    ['B#',  'C',  'Dbb'],
    ['B##', 'C#', 'Db'],
    ['C##', 'D',  'Ebb'],
    ['D#',  'Eb', 'Fbb'],
    ['D##', 'E',  'Fb'],
    ['E#',  'F',  'Gbb'],
    ['E##', 'F#', 'Gb'],
    ['F##', 'G',  'Abb'],
    ['G#',  'Ab'],
    ['G##', 'A',  'Bbb'],
    ['A#',  'Bb', 'Cbb'],
    ['A##', 'B',  'Cb'],
];

export const naturalScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const modes = {
    'ionian':     [0,  2,  4,  5,  7,  9,  11],
    'dorian':     [0,  2,  3,  5,  7,  9,  10],
    'phrygian':   [0,  1,  3,  5,  7,  8,  10],
    'lydian':     [0,  2,  4,  6,  7,  9,  11],
    'mixolydian': [0,  2,  4,  5,  7,  9,  10],
    'aeolian':    [0,  2,  3,  5,  7,  8,  10],
    'locrian':    [0,  1,  3,  5,  6,  8,  10],
};

modes['major'] = modes['ionian'];
modes['minor'] = modes['aeolian'];

export function makeScale(root, mode) {
    const rootChromaticIndex = chromaticScale.findIndex(notes => notes.includes(root));
    const rootNaturalIndex = naturalScale.indexOf(root[0]);

    return modes[mode].map((interval, index) => {
        const chromaticIndex = (rootChromaticIndex + interval) % 12;
        const naturalIndex = (rootNaturalIndex + index) % 7;
        return chromaticScale[chromaticIndex].find(note => note.startsWith(naturalScale[naturalIndex]));
    });
}

export const chords = {
    '5':      {1: 0, 5: 7},
    '7sus2':  {1: 0, 2: 2, 5: 7, 7: 10},
    '7sus4':  {1: 0, 4: 5, 5: 7, 7: 10},
    '9sus4':  {1: 0, 4: 5, 5: 7, 7: 10, 9: 14},
    'add2':   {1: 0, 2: 2, 3: 4, 5: 7},
    'add4':   {1: 0, 3: 4, 4: 5, 5: 7},
    'aug':    {1: 0, 3: 4, 5: 8},
    'aug7':   {1: 0, 3: 4, 5: 8, 7: 10},
    'aug9':   {1: 0, 3: 4, 5: 8, 7: 10, 9: 14},
    'aug11':  {1: 0, 3: 4, 5: 8, 7: 10, 9: 14, 11: 17},
    'aug13':  {1: 0, 3: 4, 5: 8, 7: 10, 9: 14, 11: 17, 13: 21},
    'dim':    {1: 0, 3: 3, 5: 6},
    'dim7':   {1: 0, 3: 3, 5: 6, 7: 9},
    'dim9':   {1: 0, 3: 3, 5: 6, 7: 9, 9: 14},
    'dim11':  {1: 0, 3: 3, 5: 6, 7: 9, 9: 14, 11: 17},
    'dom7':   {1: 0, 3: 4, 5: 7, 7: 10},
    'dom9':   {1: 0, 3: 4, 5: 7, 7: 10, 9: 14},
    'dom11':  {1: 0, 3: 4, 5: 7, 7: 10, 9: 14, 11: 17},
    'dom13':  {1: 0, 3: 4, 5: 7, 7: 10, 9: 14, 11: 17, 13: 21},
    'maj':    {1: 0, 3: 4, 5: 7},
    'maj6':   {1: 0, 3: 4, 5: 7, 6: 9},
    'maj7':   {1: 0, 3: 4, 5: 7, 7: 11},
    'maj9':   {1: 0, 3: 4, 5: 7, 7: 11, 9: 14},
    'maj11':  {1: 0, 3: 4, 5: 7, 7: 11, 9: 14, 11: 17},
    'maj13':  {1: 0, 3: 4, 5: 7, 7: 11, 9: 14, 11: 17, 13: 21},
    'min':    {1: 0, 3: 3, 5: 7},
    'min6':   {1: 0, 3: 3, 5: 7, 6: 9},
    'min7':   {1: 0, 3: 3, 5: 7, 7: 10},
    'min7b5': {1: 0, 3: 3, 5: 6, 7: 10},
    'min9':   {1: 0, 3: 3, 5: 7, 7: 10, 9: 14},
    'min11':  {1: 0, 3: 3, 5: 7, 7: 10, 9: 14, 11: 17},
    'min13':  {1: 0, 3: 3, 5: 7, 7: 10, 9: 14, 11: 17, 13: 21},
    'sus2':   {1: 0, 2: 2, 5: 7},
    'sus4':   {1: 0, 4: 5, 5: 7},
};

chords['half-dim'] = chords['min7b5'];

export function makeChord(root, chord) {
    const rootChromaticIndex = chromaticScale.findIndex(notes => notes.includes(root));
    const rootNaturalIndex = naturalScale.indexOf(root[0]);

    return Object.entries(chords[chord]).map(([index, interval], _) => {
        const chromaticIndex = (rootChromaticIndex + interval) % 12;
        const naturalIndex = (rootNaturalIndex + parseInt(index) - 1) % 7;
        return chromaticScale[chromaticIndex].find(note => note.startsWith(naturalScale[naturalIndex]));
    });
}
