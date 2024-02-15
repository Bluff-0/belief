const VALENCE_SET= [['happy', 'elated', 'excited', 'alert'], 
                    ['tensed', 'nervous', 'stressed', 'upset'], 
                    ['sad', 'depressed', 'lethergic', 'fatigued'], 
                    ['calm', 'relaxed', 'serene', 'contented']]

export const moodFn = (valence, arousal) => {
    let y= normalize(arousal);
    let x= normalize(valence);
    let tan= Math.atan(y/x);
    let quad= (x > 0) ? ((y > 0) ? 1 : 4) : ((y > 0) ? 2 : 3);
    let shortset= VALENCE_SET[quad];
    let index= Math.ceil(tan/2.5);
    //DEBUG: console.log(`X= ${x} \nY= ${y}\nQuad= ${quad}\nIndex= ${index}`)
    return shortset[index - 1];
}

const normalize = (val) => Math.round((val - 5) * 100) / 100;